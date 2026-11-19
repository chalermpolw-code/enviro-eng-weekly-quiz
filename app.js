(function () {
  "use strict";

  const CONFIG = window.SITE_CONFIG || {};
  const QUESTION_BANK = (window.ENV_ENG_QUESTIONS && Array.isArray(window.ENV_ENG_QUESTIONS.sets))
    ? window.ENV_ENG_QUESTIONS.sets
    : [];

  const STORAGE_ANSWERS_KEY = "env_eng_quiz_answers_v1";
  const STORAGE_LOCAL_FORUM_KEY = "env_eng_local_forum_v1";
  const STORAGE_VOTED_POSTS_KEY = "env_eng_forum_voted_v1";
  const CHOICE_LETTERS = ["A", "B", "C", "D"];

  // Seed sample discussions for local preview mode so Week 1 demonstrates how peer explanations look
  const SEED_FORUM_POSTS = {
    "2026-11-15-easy": [
      {
        id: "seed-e1",
        questionNumber: 1,
        author: "M. Alvarez",
        role: "Environmental Engineering Student",
        text: "A helpful way to distinguish BOD₅ from COD: BOD₅ relies on aerobic microorganisms over 5 days at 20 °C, so it only captures biodegradable organics, whereas COD uses a strong chemical oxidant (potassium dichromate) and oxidizes nearly all organic matter.",
        createdAt: "2026-11-15T14:20:00.000Z",
        helpful: 4
      },
      {
        id: "seed-e5",
        questionNumber: 5,
        author: "K. Tanaka",
        role: "Water Quality Analyst",
        text: "Since pH = -log10[H+], pH 8 corresponds to [H+] = 10^-8 M and pH 6 corresponds to [H+] = 10^-6 M. Dividing 10^-6 by 10^-8 gives 10^2 = 100 times higher hydrogen ion concentration.",
        createdAt: "2026-11-16T09:05:00.000Z",
        helpful: 3
      }
    ],
    "2026-11-15-intermediate": [
      {
        id: "seed-i1",
        questionNumber: 1,
        author: "R. Patel",
        role: "Wastewater Process Engineer",
        text: "Watch the unit conversion shortcut: 1 mg/L = 1 g/m³ = 0.001 kg/m³. So 3,000 mg/L = 3 kg/m³ and 10,000 mg/L = 10 kg/m³. Total reactor solids = 2,000 × 3 = 6,000 kg; wasted solids = 40 × 10 = 400 kg/d. SRT = 6,000 / 400 = 15 days.",
        createdAt: "2026-11-15T16:45:00.000Z",
        helpful: 6
      }
    ],
    "2026-11-15-hard": [
      {
        id: "seed-h1",
        questionNumber: 1,
        author: "S. Lindqvist",
        role: "Graduate Researcher",
        text: "In an MLE system, internal recycle brings nitrate back to the anoxic zone. If DO in the aerobic zone is set too high, dissolved oxygen gets recycled into the anoxic zone too, and heterotrophs preferentially use O₂ instead of NO₃⁻ as the electron acceptor.",
        createdAt: "2026-11-16T11:30:00.000Z",
        helpful: 5
      }
    ]
  };

  // Application state
  const state = {
    activeCategory: "easy",
    activeSetId: null,
    forumFilterQuestion: "all", // "all" or 1..5
    focusedQuestionIndex: null,
    answersBySet: loadJsonStorage(STORAGE_ANSWERS_KEY, {}),
    votedPosts: loadJsonStorage(STORAGE_VOTED_POSTS_KEY, {}),
    forumPosts: [],
    firebaseDb: null,
    firebaseMod: null,
    isFirebaseReady: false
  };

  // DOM References
  const els = {
    siteTitle: document.getElementById("site-title"),
    siteSubtitle: document.getElementById("site-subtitle"),
    scheduleNote: document.getElementById("schedule-note"),
    footerText: document.getElementById("footer-text"),
    categoryTabs: document.querySelectorAll(".category-tab"),
    weekSelect: document.getElementById("week-select"),
    activeSetHeading: document.getElementById("active-set-heading"),
    activeCategoryDesc: document.getElementById("active-category-desc"),
    activeSetSubtitle: document.getElementById("active-set-subtitle"),
    metricAnswered: document.getElementById("metric-answered"),
    metricScore: document.getElementById("metric-score"),
    resetQuizBtn: document.getElementById("reset-quiz-btn"),
    questionsContainer: document.getElementById("questions-container"),
    quizSummaryContainer: document.getElementById("quiz-summary-container"),
    forumModeBadge: document.getElementById("forum-mode-badge"),
    forumScopeSubtitle: document.getElementById("forum-scope-subtitle"),
    forumGiscusContainer: document.getElementById("forum-giscus-container"),
    forumStandardUi: document.getElementById("forum-standard-ui"),
    forumFilterBar: document.getElementById("forum-filter-bar"),
    forumLocalNotice: document.getElementById("forum-local-notice"),
    forumForm: document.getElementById("forum-form"),
    forumQuestionSelect: document.getElementById("forum-question-select"),
    forumAuthorInput: document.getElementById("forum-author-input"),
    forumRoleInput: document.getElementById("forum-role-input"),
    forumTextInput: document.getElementById("forum-text-input"),
    forumFormStatus: document.getElementById("forum-form-status"),
    forumSubmitBtn: document.getElementById("forum-submit-btn"),
    forumPostsList: document.getElementById("forum-posts-list")
  };

  /* -------------------- Initialization -------------------- */
  async function init() {
    applySiteBranding();
    seedLocalForumIfNeeded();
    bindEvents();
    await initForumBackend();
    selectCategory("easy");
  }

  function applySiteBranding() {
    if (CONFIG.siteTitle) {
      document.title = CONFIG.siteTitle;
      els.siteTitle.textContent = CONFIG.siteTitle;
    }
    if (CONFIG.siteSubtitle) els.siteSubtitle.textContent = CONFIG.siteSubtitle;
    if (CONFIG.scheduleNote) els.scheduleNote.textContent = CONFIG.scheduleNote;
    if (CONFIG.footerText) els.footerText.textContent = CONFIG.footerText;
  }

  function bindEvents() {
    els.categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const cat = tab.getAttribute("data-category");
        selectCategory(cat);
      });
    });

    els.weekSelect.addEventListener("change", () => {
      state.activeSetId = els.weekSelect.value;
      state.forumFilterQuestion = "all";
      state.focusedQuestionIndex = null;
      renderActiveSet();
      loadAndRenderForum();
    });

    els.resetQuizBtn.addEventListener("click", () => {
      const activeSet = getActiveSet();
      if (!activeSet) return;
      delete state.answersBySet[activeSet.id];
      saveJsonStorage(STORAGE_ANSWERS_KEY, state.answersBySet);
      renderQuestions(activeSet);
    });

    els.forumForm.addEventListener("submit", handleForumSubmit);
  }

  /* -------------------- Set & Category Selection -------------------- */
  function getSetsForCategory(category) {
    return QUESTION_BANK
      .filter((s) => s.category === category)
      .sort((a, b) => (b.weekDate || "").localeCompare(a.weekDate || ""));
  }

  function getActiveSet() {
    const sets = getSetsForCategory(state.activeCategory);
    return sets.find((s) => s.id === state.activeSetId) || sets[0] || null;
  }

  function selectCategory(category) {
    state.activeCategory = category;
    state.forumFilterQuestion = "all";
    state.focusedQuestionIndex = null;

    els.categoryTabs.forEach((tab) => {
      const isSelected = tab.getAttribute("data-category") === category;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    const sets = getSetsForCategory(category);
    els.weekSelect.innerHTML = "";

    if (sets.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No sets published yet";
      els.weekSelect.appendChild(opt);
      state.activeSetId = null;
    } else {
      sets.forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = `${s.weekLabel} — ${formatSundayDate(s.weekDate)}`;
        els.weekSelect.appendChild(opt);
      });
      state.activeSetId = sets[0].id;
    }

    renderActiveSet();
    loadAndRenderForum();
  }

  function renderActiveSet() {
    const catMeta = (CONFIG.categories && CONFIG.categories[state.activeCategory]) || {
      label: state.activeCategory,
      description: ""
    };
    const activeSet = getActiveSet();

    els.activeCategoryDesc.textContent = catMeta.description || "";

    if (!activeSet) {
      els.activeSetHeading.textContent = `${catMeta.label} — No Question Set Available`;
      els.activeSetSubtitle.textContent = "";
      els.questionsContainer.innerHTML =
        `<div class="empty-state">No question set has been uploaded for this category yet. Check back on Sunday.</div>`;
      els.quizSummaryContainer.innerHTML = "";
      els.metricAnswered.textContent = "0 / 0";
      els.metricScore.textContent = "0 / 0";
      els.resetQuizBtn.disabled = true;
      return;
    }

    els.activeSetHeading.textContent = `${catMeta.label} • ${activeSet.weekLabel} (${formatSundayDate(activeSet.weekDate)})`;
    els.activeSetSubtitle.textContent = activeSet.title || "";
    renderQuestions(activeSet);
  }

  /* -------------------- Quiz Rendering & Answer Reveal -------------------- */
  function renderQuestions(activeSet) {
    const setAnswers = state.answersBySet[activeSet.id] || {};
    const questions = activeSet.questions || [];
    const total = questions.length;

    let answeredCount = 0;
    let correctCount = 0;

    els.questionsContainer.innerHTML = "";

    questions.forEach((q, qIdx) => {
      const qNum = qIdx + 1;
      const chosenIdx = Object.prototype.hasOwnProperty.call(setAnswers, q.id)
        ? setAnswers[q.id]
        : null;
      const isAnswered = chosenIdx !== null && chosenIdx !== undefined;
      const isCorrect = isAnswered && chosenIdx === q.correctIndex;

      if (isAnswered) {
        answeredCount++;
        if (isCorrect) correctCount++;
      }

      const card = document.createElement("article");
      card.className = "question-card";
      if (state.focusedQuestionIndex === qNum) {
        card.classList.add("forum-focused");
      }
      card.id = `question-card-${qNum}`;

      // Header
      const header = document.createElement("div");
      header.className = "question-header";

      const meta = document.createElement("div");
      meta.className = "question-meta";

      const numSpan = document.createElement("span");
      numSpan.className = "question-number";
      numSpan.textContent = `Question ${qNum}`;
      meta.appendChild(numSpan);

      if (q.topic) {
        const topicSpan = document.createElement("span");
        topicSpan.className = "question-topic";
        topicSpan.textContent = q.topic;
        meta.appendChild(topicSpan);
      }

      const discussBtn = document.createElement("button");
      discussBtn.type = "button";
      discussBtn.className = "btn-link-subtle";
      discussBtn.textContent = "Discuss in Side Forum";
      discussBtn.addEventListener("click", () => focusForumOnQuestion(qNum));

      header.appendChild(meta);
      header.appendChild(discussBtn);
      card.appendChild(header);

      // Prompt
      const promptEl = document.createElement("p");
      promptEl.className = "question-prompt";
      promptEl.textContent = q.prompt;
      card.appendChild(promptEl);

      // Choices
      const choicesList = document.createElement("div");
      choicesList.className = "choices-list";

      (q.choices || []).forEach((choiceText, cIdx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.disabled = isAnswered;

        const letter = CHOICE_LETTERS[cIdx] || String(cIdx + 1);

        if (isAnswered) {
          if (cIdx === q.correctIndex) {
            btn.classList.add("is-correct");
          } else if (cIdx === chosenIdx) {
            btn.classList.add("is-incorrect");
          } else {
            btn.classList.add("is-dimmed");
          }
        }

        const letterSpan = document.createElement("span");
        letterSpan.className = "choice-letter";
        letterSpan.textContent = letter;

        const textSpan = document.createElement("span");
        textSpan.className = "choice-text";
        textSpan.textContent = choiceText;

        btn.appendChild(letterSpan);
        btn.appendChild(textSpan);

        if (isAnswered) {
          if (cIdx === q.correctIndex && cIdx === chosenIdx) {
            btn.appendChild(createBadge("✓ Your Answer — Correct"));
          } else if (cIdx === q.correctIndex) {
            btn.appendChild(createBadge("✓ Correct Answer"));
          } else if (cIdx === chosenIdx) {
            btn.appendChild(createBadge("✕ Your Answer"));
          }
        }

        btn.addEventListener("click", () => handleSelectChoice(activeSet, q.id, cIdx));
        choicesList.appendChild(btn);
      });

      card.appendChild(choicesList);

      // Immediate Answer Feedback
      if (isAnswered) {
        const fb = document.createElement("div");
        fb.className = `answer-feedback ${isCorrect ? "correct-feedback" : "incorrect-feedback"}`;

        const fbHeader = document.createElement("div");
        fbHeader.className = "answer-feedback-header";

        const correctLetter = CHOICE_LETTERS[q.correctIndex] || String(q.correctIndex + 1);
        const statusText = document.createElement("span");
        statusText.textContent = isCorrect
          ? `Correct! The answer is ${correctLetter}.`
          : `Incorrect. The correct answer is ${correctLetter}.`;

        fbHeader.appendChild(statusText);
        fb.appendChild(fbHeader);

        if (q.instructorNote) {
          const note = document.createElement("p");
          note.className = "answer-note";
          note.textContent = q.instructorNote;
          fb.appendChild(note);
        }

        const forumLink = document.createElement("button");
        forumLink.type = "button";
        forumLink.className = "btn-link-subtle";
        forumLink.style.paddingLeft = "0";
        forumLink.textContent = `View or share an explanation for Question ${qNum} →`;
        forumLink.addEventListener("click", () => focusForumOnQuestion(qNum));
        fb.appendChild(forumLink);

        card.appendChild(fb);
      }

      els.questionsContainer.appendChild(card);
    });

    // Update Status Bar & Summary
    els.metricAnswered.textContent = `${answeredCount} / ${total}`;
    els.metricScore.textContent = `${correctCount} / ${total}`;
    els.resetQuizBtn.disabled = answeredCount === 0;

    if (total > 0 && answeredCount === total) {
      const pct = Math.round((correctCount / total) * 100);
      els.quizSummaryContainer.innerHTML = `
        <div class="quiz-summary-card">
          <h3>Set Completed — Score: ${correctCount} / ${total} (${pct}%)</h3>
          <p>
            Review any missed concepts above, or contribute your step-by-step explanation in the
            <strong>Peer Explanation Forum</strong> on the right to help fellow learners.
          </p>
        </div>
      `;
    } else {
      els.quizSummaryContainer.innerHTML = "";
    }
  }

  function createBadge(text) {
    const span = document.createElement("span");
    span.className = "choice-badge";
    span.textContent = text;
    return span;
  }

  function handleSelectChoice(activeSet, questionId, choiceIndex) {
    if (!state.answersBySet[activeSet.id]) {
      state.answersBySet[activeSet.id] = {};
    }
    // Lock after first selection (until user explicitly resets)
    if (Object.prototype.hasOwnProperty.call(state.answersBySet[activeSet.id], questionId)) {
      return;
    }
    state.answersBySet[activeSet.id][questionId] = choiceIndex;
    saveJsonStorage(STORAGE_ANSWERS_KEY, state.answersBySet);
    renderQuestions(activeSet);
  }

  function focusForumOnQuestion(qNum) {
    state.focusedQuestionIndex = qNum;
    state.forumFilterQuestion = qNum;
    els.forumQuestionSelect.value = String(qNum);

    const activeSet = getActiveSet();
    if (activeSet) {
      renderQuestions(activeSet);
    }
    renderForumFilterBar();
    renderForumPosts();

    if (window.innerWidth <= 960) {
      document.querySelector(".forum-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* -------------------- Side Forum Backends -------------------- */
  async function initForumBackend() {
    const mode = CONFIG.forumMode || "local";

    if (mode === "giscus" && CONFIG.giscus && CONFIG.giscus.repo && CONFIG.giscus.repoId) {
      els.forumModeBadge.textContent = "GitHub Discussions";
      els.forumModeBadge.classList.add("live");
      els.forumStandardUi.style.display = "none";
      els.forumGiscusContainer.style.display = "block";
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

        els.forumModeBadge.textContent = "Live Community Forum";
        els.forumModeBadge.classList.add("live");
        els.forumLocalNotice.style.display = "none";
        return;
      } catch (err) {
        console.warn("Firebase initialization failed, falling back to local mode:", err);
      }
    }

    // Default: Local Preview Mode
    els.forumModeBadge.textContent = "Local Preview";
    els.forumModeBadge.classList.remove("live");
    els.forumLocalNotice.style.display = "block";
  }

  async function loadAndRenderForum() {
    const activeSet = getActiveSet();
    if (!activeSet) {
      els.forumScopeSubtitle.textContent = "Select a weekly question set to view or post explanations.";
      els.forumPostsList.innerHTML = "";
      return;
    }

    const catLabel = (CONFIG.categories && CONFIG.categories[activeSet.category] && CONFIG.categories[activeSet.category].label) || activeSet.category;
    els.forumScopeSubtitle.textContent = `Topic Thread: ${catLabel} • ${activeSet.weekLabel} (${formatSundayDate(activeSet.weekDate)})`;

    if (CONFIG.forumMode === "giscus" && els.forumGiscusContainer.style.display === "block") {
      renderGiscusThread(activeSet.id);
      return;
    }

    if (state.isFirebaseReady) {
      await loadFirebasePosts(activeSet.id);
    } else {
      loadLocalPosts(activeSet.id);
    }

    renderForumFilterBar();
    renderForumPosts();
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
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;
    els.forumGiscusContainer.appendChild(script);
  }

  function seedLocalForumIfNeeded() {
    const existing = localStorage.getItem(STORAGE_LOCAL_FORUM_KEY);
    if (!existing) {
      saveJsonStorage(STORAGE_LOCAL_FORUM_KEY, SEED_FORUM_POSTS);
    }
  }

  function loadLocalPosts(setId) {
    const all = loadJsonStorage(STORAGE_LOCAL_FORUM_KEY, {});
    const posts = Array.isArray(all[setId]) ? all[setId] : [];
    state.forumPosts = [...posts].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  }

  async function loadFirebasePosts(setId) {
    try {
      const { collection, query, where, getDocs } = state.firebaseMod;
      const colName = (CONFIG.firebase && CONFIG.firebase.collectionName) || "env_eng_explanations";
      const q = query(collection(state.firebaseDb, colName), where("setId", "==", setId));
      const snap = await getDocs(q);
      const posts = [];
      snap.forEach((docSnap) => {
        posts.push({ id: docSnap.id, ...docSnap.data() });
      });
      state.forumPosts = posts.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    } catch (err) {
      console.error("Failed to fetch Firebase forum posts:", err);
      state.forumPosts = [];
    }
  }

  function renderForumFilterBar() {
    const counts = { all: state.forumPosts.length, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    state.forumPosts.forEach((p) => {
      const qn = Number(p.questionNumber);
      if (counts[qn] !== undefined) counts[qn]++;
    });

    els.forumFilterBar.innerHTML = "";
    const filters = [
      { key: "all", label: `All (${counts.all})` },
      { key: 1, label: `Q1 (${counts[1]})` },
      { key: 2, label: `Q2 (${counts[2]})` },
      { key: 3, label: `Q3 (${counts[3]})` },
      { key: 4, label: `Q4 (${counts[4]})` },
      { key: 5, label: `Q5 (${counts[5]})` }
    ];

    filters.forEach((f) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-chip";
      if (state.forumFilterQuestion === f.key) btn.classList.add("active");
      btn.textContent = f.label;
      btn.addEventListener("click", () => {
        state.forumFilterQuestion = f.key;
        if (f.key !== "all") {
          els.forumQuestionSelect.value = String(f.key);
          state.focusedQuestionIndex = f.key;
        } else {
          state.focusedQuestionIndex = null;
        }
        const activeSet = getActiveSet();
        if (activeSet) renderQuestions(activeSet);
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
      const msg = state.forumFilterQuestion === "all"
        ? "No explanations posted for this weekly set yet. Be the first to contribute!"
        : `No explanations for Question ${state.forumFilterQuestion} yet.`;
      els.forumPostsList.innerHTML = `<div class="empty-state">${escapeHtml(msg)}</div>`;
      return;
    }

    filtered.forEach((post) => {
      const card = document.createElement("div");
      card.className = "forum-post";

      const header = document.createElement("div");
      header.className = "forum-post-header";

      const authorWrap = document.createElement("div");
      const authorSpan = document.createElement("span");
      authorSpan.className = "forum-post-author";
      authorSpan.textContent = post.author || "Visitor";
      authorWrap.appendChild(authorSpan);

      if (post.role) {
        const roleSpan = document.createElement("span");
        roleSpan.className = "forum-post-role";
        roleSpan.textContent = `• ${post.role}`;
        authorWrap.appendChild(roleSpan);
      }

      const qBadge = document.createElement("span");
      qBadge.className = "forum-post-qbadge";
      qBadge.textContent = `Question ${post.questionNumber}`;

      header.appendChild(authorWrap);
      header.appendChild(qBadge);
      card.appendChild(header);

      const body = document.createElement("p");
      body.className = "forum-post-text";
      body.textContent = post.text || "";
      card.appendChild(body);

      const footer = document.createElement("div");
      footer.className = "forum-post-footer";

      const dateSpan = document.createElement("span");
      dateSpan.textContent = formatTimestamp(post.createdAt);

      const helpfulBtn = document.createElement("button");
      helpfulBtn.type = "button";
      helpfulBtn.className = "helpful-btn";
      const hasVoted = Boolean(state.votedPosts[post.id]);
      if (hasVoted) {
        helpfulBtn.classList.add("voted");
        helpfulBtn.disabled = true;
      }
      helpfulBtn.textContent = `Helpful (${post.helpful || 0})`;
      helpfulBtn.addEventListener("click", () => handleHelpfulVote(post));

      footer.appendChild(dateSpan);
      footer.appendChild(helpfulBtn);
      card.appendChild(footer);

      els.forumPostsList.appendChild(card);
    });
  }

  async function handleForumSubmit(e) {
    e.preventDefault();
    const activeSet = getActiveSet();
    if (!activeSet) return;

    const questionNumber = Number(els.forumQuestionSelect.value);
    const author = els.forumAuthorInput.value.trim();
    const role = els.forumRoleInput.value.trim();
    const text = els.forumTextInput.value.trim();

    if (!author || !text) {
      els.forumFormStatus.textContent = "Please provide your name and explanation.";
      return;
    }

    els.forumSubmitBtn.disabled = true;
    els.forumFormStatus.textContent = "Posting...";

    const newPost = {
      setId: activeSet.id,
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
        const colName = (CONFIG.firebase && CONFIG.firebase.collectionName) || "env_eng_explanations";
        await addDoc(collection(state.firebaseDb, colName), newPost);
        await loadFirebasePosts(activeSet.id);
      } else {
        const all = loadJsonStorage(STORAGE_LOCAL_FORUM_KEY, {});
        if (!Array.isArray(all[activeSet.id])) all[activeSet.id] = [];
        all[activeSet.id].unshift({
          id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          ...newPost
        });
        saveJsonStorage(STORAGE_LOCAL_FORUM_KEY, all);
        loadLocalPosts(activeSet.id);
      }

      els.forumTextInput.value = "";
      els.forumFormStatus.textContent = "Explanation posted.";
      state.forumFilterQuestion = questionNumber;
      renderForumFilterBar();
      renderForumPosts();

      setTimeout(() => {
        els.forumFormStatus.textContent = "";
      }, 3000);
    } catch (err) {
      console.error("Error posting explanation:", err);
      els.forumFormStatus.textContent = "Could not post right now. Please try again.";
    } finally {
      els.forumSubmitBtn.disabled = false;
    }
  }

  async function handleHelpfulVote(post) {
    if (state.votedPosts[post.id]) return;
    const activeSet = getActiveSet();
    if (!activeSet) return;

    state.votedPosts[post.id] = true;
    saveJsonStorage(STORAGE_VOTED_POSTS_KEY, state.votedPosts);

    if (state.isFirebaseReady) {
      try {
        const { doc, updateDoc, increment } = state.firebaseMod;
        const colName = (CONFIG.firebase && CONFIG.firebase.collectionName) || "env_eng_explanations";
        await updateDoc(doc(state.firebaseDb, colName, post.id), {
          helpful: increment(1)
        });
        post.helpful = (post.helpful || 0) + 1;
      } catch (err) {
        console.error("Failed to update helpful count:", err);
      }
    } else {
      const all = loadJsonStorage(STORAGE_LOCAL_FORUM_KEY, {});
      const list = all[activeSet.id] || [];
      const target = list.find((item) => item.id === post.id);
      if (target) {
        target.helpful = (target.helpful || 0) + 1;
        saveJsonStorage(STORAGE_LOCAL_FORUM_KEY, all);
        post.helpful = target.helpful;
      }
    }

    renderForumPosts();
  }

  /* -------------------- Utilities -------------------- */
  function formatSundayDate(isoDate) {
    if (!isoDate) return "";
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (Number.isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function formatTimestamp(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
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
      // Ignore storage quota errors cleanly
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
