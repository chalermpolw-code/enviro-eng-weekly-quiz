(function () {
  "use strict";

  const CONFIG = window.SITE_CONFIG || {};
  const QUESTION_BANK = (window.ENV_ENG_QUESTIONS && Array.isArray(window.ENV_ENG_QUESTIONS.sets))
    ? window.ENV_ENG_QUESTIONS.sets
    : [];

  const STORAGE_ANSWERS_KEY = "env_eng_quiz_answers_v1";
  const STORAGE_LOCAL_FORUM_KEY = "env_eng_local_forum_v1";
  const STORAGE_VOTED_POSTS_KEY = "env_eng_forum_voted_v1";
  const STORAGE_LEVEL_KEY = "env_eng_last_level_v1";
  const CHOICE_LETTERS = ["A", "B", "C", "D"];
  const FORUM_COLLECTION = (CONFIG.firebase && CONFIG.firebase.collectionName) || "env_eng_explanations";

  const state = {
    activeCategory: loadJsonStorage(STORAGE_LEVEL_KEY, "easy"),
    activeSetId: null,
    currentIndex: 0, // 0..n-1 = question, n = summary
    forumFilterQuestion: "all",
    answersBySet: loadJsonStorage(STORAGE_ANSWERS_KEY, {}),
    votedPosts: loadJsonStorage(STORAGE_VOTED_POSTS_KEY, {}),
    forumPosts: [],
    firebaseDb: null,
    firebaseMod: null,
    isFirebaseReady: false,
    isGiscus: false,
    lastRenderKey: ""
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    eyebrow: $("site-eyebrow"),
    footerText: $("footer-text"),
    levelBtns: document.querySelectorAll(".level-btn"),
    taglines: document.querySelectorAll("[data-tagline]"),
    categoryTabs: document.querySelectorAll(".category-tab"),
    weekSelect: $("week-select"),
    score: $("score-display"),
    dots: $("progress-dots"),
    stage: $("question-stage"),
    quiz: $("quiz"),
    drawer: $("forum-drawer"),
    backdrop: $("forum-backdrop"),
    forumClose: $("forum-close"),
    forumModeBadge: $("forum-mode-badge"),
    forumGiscusContainer: $("forum-giscus-container"),
    forumStandardUi: $("forum-standard-ui"),
    forumFilterBar: $("forum-filter-bar"),
    forumLocalNotice: $("forum-local-notice"),
    forumForm: $("forum-form"),
    forumQuestionSelect: $("forum-question-select"),
    forumAuthorInput: $("forum-author-input"),
    forumRoleInput: $("forum-role-input"),
    forumTextInput: $("forum-text-input"),
    forumFormStatus: $("forum-form-status"),
    forumSubmitBtn: $("forum-submit-btn"),
    forumPostsList: $("forum-posts-list")
  };

  /* -------------------- Init -------------------- */
  async function init() {
    applyBranding();
    bindEvents();
    await initForumBackend();
    if (!CONFIG.categories || !CONFIG.categories[state.activeCategory]) state.activeCategory = "easy";
    selectCategory(state.activeCategory);
  }

  function applyBranding() {
    if (CONFIG.siteTitle) document.title = CONFIG.siteTitle;
    if (CONFIG.eyebrow) els.eyebrow.textContent = CONFIG.eyebrow;
    if (CONFIG.footerText) els.footerText.textContent = CONFIG.footerText;
    els.taglines.forEach((el) => {
      const cat = CONFIG.categories && CONFIG.categories[el.dataset.tagline];
      el.textContent = (cat && cat.tagline) || "";
    });
  }

  function bindEvents() {
    els.levelBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        selectCategory(btn.dataset.category);
        els.quiz.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    els.categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => selectCategory(tab.dataset.category));
    });

    els.weekSelect.addEventListener("change", () => {
      state.activeSetId = els.weekSelect.value;
      openSetAtFirstUnanswered();
      loadAndRenderForum();
    });

    document.getElementById("home-btn").addEventListener("click", goHome);
    els.forumClose.addEventListener("click", closeDrawer);
    els.backdrop.addEventListener("click", closeDrawer);
    els.forumForm.addEventListener("submit", handleForumSubmit);

    document.addEventListener("keydown", handleKeys);
  }

  function handleKeys(e) {
    if (e.key === "Escape" && els.drawer.classList.contains("open")) {
      closeDrawer();
      return;
    }
    const tag = (e.target && e.target.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (els.drawer.classList.contains("open")) return;

    const set = getActiveSet();
    if (!set) return;
    const total = set.questions.length;

    if (e.key === "ArrowRight") { goTo(Math.min(state.currentIndex + 1, total)); return; }
    if (e.key === "ArrowLeft") { goTo(Math.max(state.currentIndex - 1, 0)); return; }

    if (state.currentIndex < total) {
      const k = e.key.toUpperCase();
      let idx = CHOICE_LETTERS.indexOf(k);
      if (idx === -1 && /^[1-4]$/.test(k)) idx = Number(k) - 1;
      if (idx >= 0) {
        const q = set.questions[state.currentIndex];
        if (q && idx < q.choices.length) answer(set, q, idx);
      }
    }
  }

  /* -------------------- Sets -------------------- */
  function getSetsForCategory(category) {
    return QUESTION_BANK
      .filter((s) => s.category === category)
      .sort((a, b) => (b.weekDate || "").localeCompare(a.weekDate || ""));
  }

  function getActiveSet() {
    const sets = getSetsForCategory(state.activeCategory);
    return sets.find((s) => s.id === state.activeSetId) || sets[0] || null;
  }

  function getAnswers(set) {
    return state.answersBySet[set.id] || {};
  }

  function selectCategory(category) {
    state.activeCategory = category;
    saveJsonStorage(STORAGE_LEVEL_KEY, category);

    els.categoryTabs.forEach((tab) => {
      const on = tab.dataset.category === category;
      tab.classList.toggle("active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });

    const sets = getSetsForCategory(category);
    els.weekSelect.innerHTML = "";

    if (sets.length === 0) {
      const opt = document.createElement("option");
      opt.textContent = "No sets yet";
      els.weekSelect.appendChild(opt);
      els.weekSelect.disabled = true;
      state.activeSetId = null;
    } else {
      els.weekSelect.disabled = sets.length < 2;
      sets.forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = `${s.weekLabel} · ${formatShortDate(s.weekDate)}`;
        els.weekSelect.appendChild(opt);
      });
      state.activeSetId = sets[0].id;
    }

    openSetAtFirstUnanswered();
    loadAndRenderForum();
  }

  function openSetAtFirstUnanswered() {
    const set = getActiveSet();
    if (!set) {
      state.currentIndex = 0;
      render();
      return;
    }
    const answers = getAnswers(set);
    const first = set.questions.findIndex((q) => !Object.prototype.hasOwnProperty.call(answers, q.id));
    state.currentIndex = first === -1 ? set.questions.length : first;
    render();
  }

  function goHome() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goTo(index) {
    if (index === state.currentIndex) return;
    state.currentIndex = index;
    render();
  }

  /* -------------------- Rendering -------------------- */
  function render() {
    const set = getActiveSet();
    els.stage.innerHTML = "";
    els.dots.innerHTML = "";

    if (!set) {
      els.score.textContent = "–";
      const empty = el("div", "card empty", "No questions yet. Check back Sunday.");
      els.stage.appendChild(empty);
      return;
    }

    const answers = getAnswers(set);
    const total = set.questions.length;
    let correct = 0;
    set.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    els.score.textContent = `${correct}/${total}`;

    renderDots(set, answers);

    // Only replay the entrance animation when moving to a different card
    const key = `${set.id}:${state.currentIndex}`;
    const animate = key !== state.lastRenderKey;
    state.lastRenderKey = key;

    if (state.currentIndex >= total) {
      renderSummary(set, correct, total);
    } else {
      renderQuestion(set, state.currentIndex, answers);
    }
    if (!animate && els.stage.firstElementChild) els.stage.firstElementChild.style.animation = "none";
  }

  function renderDots(set, answers) {
    set.questions.forEach((q, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Question ${i + 1}`);
      if (Object.prototype.hasOwnProperty.call(answers, q.id)) {
        dot.classList.add(answers[q.id] === q.correctIndex ? "is-good" : "is-bad");
      }
      if (i === state.currentIndex) {
        dot.classList.add("is-current");
        dot.setAttribute("aria-current", "step");
      }
      dot.addEventListener("click", () => goTo(i));
      els.dots.appendChild(dot);
    });
  }

  function renderQuestion(set, index, answers) {
    const q = set.questions[index];
    const total = set.questions.length;
    const qNum = index + 1;
    const chosen = Object.prototype.hasOwnProperty.call(answers, q.id) ? answers[q.id] : null;
    const answered = chosen !== null && chosen !== undefined;
    const isCorrect = answered && chosen === q.correctIndex;

    const card = el("article", "card");

    const meta = el("div", "q-meta");
    meta.appendChild(el("span", "q-num", `${pad(qNum)} / ${pad(total)}`));
    if (q.topic) meta.appendChild(el("span", "q-topic", q.topic));
    card.appendChild(meta);

    card.appendChild(el("h2", "q-prompt", q.prompt));

    const list = el("div", "choices");
    q.choices.forEach((text, cIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.disabled = answered;
      if (answered) {
        if (cIdx === q.correctIndex) btn.classList.add("is-correct");
        else if (cIdx === chosen) btn.classList.add("is-wrong");
        else btn.classList.add("is-dim");
      }
      btn.appendChild(el("span", "choice-key", CHOICE_LETTERS[cIdx] || String(cIdx + 1)));
      btn.appendChild(el("span", "choice-text", text));
      btn.addEventListener("click", () => answer(set, q, cIdx));
      list.appendChild(btn);
    });
    card.appendChild(list);

    if (answered) {
      const fb = el("div", "feedback");
      const letter = CHOICE_LETTERS[q.correctIndex] || String(q.correctIndex + 1);
      fb.appendChild(el("p", `verdict ${isCorrect ? "good" : "bad"}`, isCorrect ? "Correct." : `Not quite — it's ${letter}.`));
      if (q.instructorNote) fb.appendChild(el("p", "note", q.instructorNote));
      card.appendChild(fb);
    }

    const actions = el("div", "q-actions");

    const discuss = el("button", "btn btn-ghost", "Discuss");
    discuss.type = "button";
    const n = countPosts(qNum);
    if (n > 0) discuss.appendChild(el("span", "count", String(n)));
    discuss.addEventListener("click", () => openDrawer(qNum));
    actions.appendChild(discuss);

    actions.appendChild(el("span", "spacer"));

    const prev = el("button", "btn btn-ghost", "←");
    prev.type = "button";
    prev.setAttribute("aria-label", "Previous question");
    prev.disabled = index === 0;
    prev.addEventListener("click", () => goTo(index - 1));
    actions.appendChild(prev);

    const isLast = index === total - 1;
    const next = el("button", "btn btn-primary", isLast ? "Finish" : "Next →");
    next.type = "button";
    next.disabled = !answered;
    next.addEventListener("click", () => goTo(index + 1));
    actions.appendChild(next);

    card.appendChild(actions);
    els.stage.appendChild(card);

    if (answered && document.activeElement === document.body) next.focus({ preventScroll: true });
  }

  function renderSummary(set, correct, total) {
    const answers = getAnswers(set);
    const answeredCount = set.questions.filter((q) => Object.prototype.hasOwnProperty.call(answers, q.id)).length;
    const card = el("article", "card summary");

    const pct = total ? correct / total : 0;
    const R = 62;
    const C = 2 * Math.PI * R;
    card.insertAdjacentHTML("beforeend", `
      <svg class="ring" viewBox="0 0 150 150" role="img" aria-label="Score ${correct} of ${total}">
        <circle class="ring-track" cx="75" cy="75" r="${R}" fill="none" stroke-width="6" />
        <circle class="ring-fill" cx="75" cy="75" r="${R}" fill="none" stroke-width="6" stroke-linecap="round"
          stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${C.toFixed(2)}" transform="rotate(-90 75 75)" />
        <text class="ring-label" x="75" y="85" text-anchor="middle">${correct}/${total}</text>
      </svg>`);

    const heading = answeredCount < total
      ? "Not finished yet"
      : pct === 1 ? "Perfect set." : pct >= 0.6 ? "Nice work." : "Keep going.";
    card.appendChild(el("h2", "", heading));
    card.appendChild(el("p", "", answeredCount < total
      ? `${total - answeredCount} question${total - answeredCount > 1 ? "s" : ""} left.`
      : "Explain one in the discussion to lock it in."));

    const actions = el("div", "q-actions");

    const home = el("button", "btn btn-ghost", "↑ Home");
    home.type = "button";
    home.addEventListener("click", goHome);
    actions.appendChild(home);

    const review = el("button", "btn btn-ghost", "Review");
    review.type = "button";
    review.addEventListener("click", () => goTo(0));
    actions.appendChild(review);

    const discuss = el("button", "btn btn-ghost", "Discuss");
    discuss.type = "button";
    if (state.forumPosts.length) discuss.appendChild(el("span", "count", String(state.forumPosts.length)));
    discuss.addEventListener("click", () => openDrawer("all"));
    actions.appendChild(discuss);

    const order = ["easy", "intermediate", "hard"];
    const nextCat = order[order.indexOf(set.category) + 1];
    const hasNext = nextCat && getSetsForCategory(nextCat).length > 0;

    const reset = el("button", hasNext ? "btn btn-ghost" : "btn btn-primary", "Try again");
    reset.type = "button";
    reset.addEventListener("click", () => {
      delete state.answersBySet[set.id];
      saveJsonStorage(STORAGE_ANSWERS_KEY, state.answersBySet);
      state.currentIndex = 0;
      render();
    });
    actions.appendChild(reset);

    if (hasNext) {
      const label = (CONFIG.categories && CONFIG.categories[nextCat] && CONFIG.categories[nextCat].label) || nextCat;
      const next = el("button", "btn btn-primary", `${label} →`);
      next.type = "button";
      next.addEventListener("click", () => {
        selectCategory(nextCat);
        els.quiz.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      actions.appendChild(next);
    }

    card.appendChild(actions);
    els.stage.appendChild(card);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const fill = card.querySelector(".ring-fill");
        if (fill) fill.setAttribute("stroke-dashoffset", (C * (1 - pct)).toFixed(2));
      });
    });
  }

  function answer(set, q, choiceIndex) {
    if (!state.answersBySet[set.id]) state.answersBySet[set.id] = {};
    if (Object.prototype.hasOwnProperty.call(state.answersBySet[set.id], q.id)) return;
    state.answersBySet[set.id][q.id] = choiceIndex;
    saveJsonStorage(STORAGE_ANSWERS_KEY, state.answersBySet);
    window.dispatchEvent(new CustomEvent("quiz:answer", { detail: { correct: choiceIndex === q.correctIndex } }));
    render();
  }

  /* -------------------- Drawer -------------------- */
  function openDrawer(qNum) {
    state.forumFilterQuestion = qNum;
    if (qNum !== "all") els.forumQuestionSelect.value = String(qNum);
    renderForumFilterBar();
    renderForumPosts();

    els.backdrop.hidden = false;
    document.body.classList.add("drawer-open");
    els.drawer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      els.backdrop.classList.add("show");
      els.drawer.classList.add("open");
    });
    setTimeout(() => els.forumClose.focus({ preventScroll: true }), 50);
  }

  function closeDrawer() {
    els.drawer.classList.remove("open");
    els.backdrop.classList.remove("show");
    els.drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
    setTimeout(() => { els.backdrop.hidden = true; }, 250);
  }

  /* -------------------- Forum backends -------------------- */
  async function initForumBackend() {
    const mode = CONFIG.forumMode || "local";

    if (mode === "giscus" && CONFIG.giscus && CONFIG.giscus.repo && CONFIG.giscus.repoId) {
      state.isGiscus = true;
      els.forumModeBadge.textContent = "GitHub Discussions";
      els.forumModeBadge.classList.add("live");
      els.forumStandardUi.hidden = true;
      els.forumStandardUi.style.display = "none";
      els.forumGiscusContainer.hidden = false;
      return;
    }

    if (mode === "firebase" && CONFIG.firebase && CONFIG.firebase.apiKey && CONFIG.firebase.projectId) {
      try {
        const appMod = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
        const fsMod = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
        const fbApp = appMod.initializeApp(CONFIG.firebase);
        state.firebaseDb = fsMod.getFirestore(fbApp);
        state.firebaseMod = fsMod;
        state.isFirebaseReady = true;
        els.forumModeBadge.textContent = "Live";
        els.forumModeBadge.classList.add("live");
        els.forumLocalNotice.hidden = true;
        return;
      } catch (err) {
        console.warn("Firebase initialization failed, falling back to local mode:", err);
      }
    }

    els.forumModeBadge.textContent = "Local";
    els.forumModeBadge.classList.remove("live");
    els.forumLocalNotice.hidden = false;
  }

  async function loadAndRenderForum() {
    const set = getActiveSet();
    if (!set) {
      state.forumPosts = [];
      renderForumFilterBar();
      renderForumPosts();
      return;
    }

    if (state.isGiscus) {
      renderGiscusThread(set.id);
      return;
    }

    if (state.isFirebaseReady) {
      await loadFirebasePosts(set.id);
    } else {
      loadLocalPosts(set.id);
    }

    renderForumFilterBar();
    renderForumPosts();
    render(); // refresh discussion counts on the card
  }

  function renderGiscusThread(setId) {
    els.forumGiscusContainer.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", CONFIG.giscus.repo);
    script.setAttribute("data-repo-id", CONFIG.giscus.repoId);
    script.setAttribute("data-category", CONFIG.giscus.category || "General");
    script.setAttribute("data-category-id", CONFIG.giscus.categoryId);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", `enviro-eng-set-${setId}`);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;
    els.forumGiscusContainer.appendChild(script);
  }

  function loadLocalPosts(setId) {
    const all = loadJsonStorage(STORAGE_LOCAL_FORUM_KEY, {});
    const posts = Array.isArray(all[setId]) ? all[setId].filter((p) => !String(p.id).startsWith("seed-")) : [];
    state.forumPosts = posts.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  }

  async function loadFirebasePosts(setId) {
    try {
      const { collection, query, where, getDocs } = state.firebaseMod;
      const q = query(collection(state.firebaseDb, FORUM_COLLECTION), where("setId", "==", setId));
      const snap = await getDocs(q);
      const posts = [];
      snap.forEach((docSnap) => posts.push({ id: docSnap.id, ...docSnap.data() }));
      state.forumPosts = posts.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    } catch (err) {
      console.error("Failed to fetch forum posts:", err);
      state.forumPosts = [];
    }
  }

  function countPosts(qNum) {
    return state.forumPosts.filter((p) => Number(p.questionNumber) === qNum).length;
  }

  function renderForumFilterBar() {
    els.forumFilterBar.innerHTML = "";
    const filters = [{ key: "all", label: `All ${state.forumPosts.length}` }];
    for (let i = 1; i <= 5; i++) filters.push({ key: i, label: `Q${i} ${countPosts(i)}` });

    filters.forEach((f) => {
      const btn = el("button", "chip", f.label);
      btn.type = "button";
      if (state.forumFilterQuestion === f.key) btn.classList.add("active");
      btn.addEventListener("click", () => {
        state.forumFilterQuestion = f.key;
        if (f.key !== "all") els.forumQuestionSelect.value = String(f.key);
        renderForumFilterBar();
        renderForumPosts();
      });
      els.forumFilterBar.appendChild(btn);
    });
  }

  function renderForumPosts() {
    const filtered = state.forumFilterQuestion === "all"
      ? state.forumPosts
      : state.forumPosts.filter((p) => Number(p.questionNumber) === Number(state.forumFilterQuestion));

    els.forumPostsList.innerHTML = "";

    if (filtered.length === 0) {
      els.forumPostsList.appendChild(el("div", "empty", "No explanations yet. Be the first."));
      return;
    }

    filtered.forEach((post) => {
      const card = el("div", "post");

      const head = el("div", "post-head");
      const who = el("div");
      who.appendChild(el("span", "post-author", post.author || "Visitor"));
      if (post.role) who.appendChild(el("span", "post-role", post.role));
      head.appendChild(who);
      head.appendChild(el("span", "post-q", `Q${post.questionNumber}`));
      card.appendChild(head);

      card.appendChild(el("p", "post-text", post.text || ""));

      const foot = el("div", "post-foot");
      foot.appendChild(el("span", "", formatShortDate(post.createdAt)));
      const voted = Boolean(state.votedPosts[post.id]);
      const helpful = el("button", "helpful", `${voted ? "▲" : "△"} ${post.helpful || 0}`);
      helpful.type = "button";
      helpful.title = "Helpful";
      helpful.disabled = voted;
      helpful.addEventListener("click", () => handleHelpfulVote(post));
      foot.appendChild(helpful);
      card.appendChild(foot);

      els.forumPostsList.appendChild(card);
    });
  }

  async function handleForumSubmit(e) {
    e.preventDefault();
    const set = getActiveSet();
    if (!set) return;

    const questionNumber = Number(els.forumQuestionSelect.value);
    const author = els.forumAuthorInput.value.trim();
    const role = els.forumRoleInput.value.trim();
    const text = els.forumTextInput.value.trim();

    if (!author || !text) {
      els.forumFormStatus.textContent = "Name and explanation, please.";
      return;
    }

    els.forumSubmitBtn.disabled = true;
    els.forumFormStatus.textContent = "Posting…";

    const newPost = {
      setId: set.id,
      questionNumber,
      author,
      role,
      text,
      createdAt: new Date().toISOString(),
      helpful: 0
    };

    try {
      if (state.isFirebaseReady) {
        const { collection, addDoc } = state.firebaseMod;
        await addDoc(collection(state.firebaseDb, FORUM_COLLECTION), newPost);
        await loadFirebasePosts(set.id);
      } else {
        const all = loadJsonStorage(STORAGE_LOCAL_FORUM_KEY, {});
        if (!Array.isArray(all[set.id])) all[set.id] = [];
        all[set.id].unshift({ id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...newPost });
        saveJsonStorage(STORAGE_LOCAL_FORUM_KEY, all);
        loadLocalPosts(set.id);
      }

      els.forumTextInput.value = "";
      els.forumFormStatus.textContent = "Posted.";
      state.forumFilterQuestion = questionNumber;
      renderForumFilterBar();
      renderForumPosts();
      render();
      setTimeout(() => { els.forumFormStatus.textContent = ""; }, 2500);
    } catch (err) {
      console.error("Error posting explanation:", err);
      els.forumFormStatus.textContent = "Couldn't post. Try again.";
    } finally {
      els.forumSubmitBtn.disabled = false;
    }
  }

  async function handleHelpfulVote(post) {
    if (state.votedPosts[post.id]) return;
    const set = getActiveSet();
    if (!set) return;

    state.votedPosts[post.id] = true;
    saveJsonStorage(STORAGE_VOTED_POSTS_KEY, state.votedPosts);

    if (state.isFirebaseReady) {
      try {
        const { doc, updateDoc, increment } = state.firebaseMod;
        await updateDoc(doc(state.firebaseDb, FORUM_COLLECTION, post.id), { helpful: increment(1) });
        post.helpful = (post.helpful || 0) + 1;
      } catch (err) {
        console.error("Failed to update helpful count:", err);
      }
    } else {
      const all = loadJsonStorage(STORAGE_LOCAL_FORUM_KEY, {});
      const target = (all[set.id] || []).find((item) => item.id === post.id);
      if (target) {
        target.helpful = (target.helpful || 0) + 1;
        saveJsonStorage(STORAGE_LOCAL_FORUM_KEY, all);
        post.helpful = target.helpful;
      }
    }

    renderForumPosts();
  }

  /* -------------------- Utilities -------------------- */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatShortDate(value) {
    if (!value) return "";
    let d;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function loadJsonStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJsonStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable (private mode etc.) — app still works for this visit
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
