(function () {
  "use strict";

  const QUESTIONS_PER_SET = 5;
  const CHOICE_LETTERS = ["A", "B", "C", "D"];

  let sets = (window.ENV_ENG_QUESTIONS && Array.isArray(window.ENV_ENG_QUESTIONS.sets))
    ? JSON.parse(JSON.stringify(window.ENV_ENG_QUESTIONS.sets))
    : [];

  const els = {
    loadedSetsSummary: document.getElementById("loaded-sets-summary"),
    authorForm: document.getElementById("author-form"),
    metaCategory: document.getElementById("meta-category"),
    metaWeekDate: document.getElementById("meta-week-date"),
    metaWeekLabel: document.getElementById("meta-week-label"),
    metaTitle: document.getElementById("meta-title"),
    questionsList: document.getElementById("author-questions-list"),
    copyJsBtn: document.getElementById("copy-js-btn"),
    clearFormBtn: document.getElementById("clear-form-btn"),
    feedback: document.getElementById("author-feedback"),
    publishedCount: document.getElementById("published-count"),
    publishedSetsList: document.getElementById("published-sets-list")
  };

  function init() {
    renderQuestionBlocks();
    setDefaultReleaseMeta();
    renderPublishedSets();

    els.metaCategory.addEventListener("change", suggestNextWeekLabel);
    els.metaWeekDate.addEventListener("change", suggestNextWeekLabel);
    els.authorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSave("download");
    });
    els.copyJsBtn.addEventListener("click", () => handleSave("copy"));
    els.clearFormBtn.addEventListener("click", resetEditor);
  }

  function renderQuestionBlocks() {
    els.questionsList.innerHTML = "";

    for (let i = 1; i <= QUESTIONS_PER_SET; i++) {
      const block = document.createElement("div");
      block.className = "author-q-block";

      let choicesHtml = "";
      CHOICE_LETTERS.forEach((letter, cIdx) => {
        choicesHtml += `
          <div class="author-choice-row">
            <label class="radio-label">
              <input type="radio" name="q${i}-correct" value="${cIdx}" ${cIdx === 0 ? "checked" : ""} />
              Correct (${letter})
            </label>
            <input type="text" id="q${i}-choice-${cIdx}" class="form-input" placeholder="Choice ${letter} text" required />
          </div>
        `;
      });

      block.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.65rem;">
          <strong style="color: var(--brand-primary);">Question ${i} of ${QUESTIONS_PER_SET}</strong>
          <input type="text" id="q${i}-topic" class="form-input" style="min-width: 240px;" placeholder="Topic tag (e.g., Water Chemistry • Alkalinity)" />
        </div>

        <div class="form-field" style="margin-bottom: 0.7rem;">
          <label for="q${i}-prompt">Question Prompt *</label>
          <textarea id="q${i}-prompt" class="form-textarea" placeholder="Enter question ${i}..." required></textarea>
        </div>

        <div style="margin-bottom: 0.7rem;">
          <div style="font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.35rem;">
            Choices (select the radio button next to the correct answer) *
          </div>
          ${choicesHtml}
        </div>

        <div class="form-field">
          <label for="q${i}-note">Official Answer Note (optional — shown after visitor clicks a choice)</label>
          <input type="text" id="q${i}-note" class="form-input" placeholder="Brief formula, rule of thumb, or textbook reference..." />
        </div>
      `;

      els.questionsList.appendChild(block);
    }
  }

  function setDefaultReleaseMeta() {
    els.metaWeekDate.value = getNextSundayIso();
    suggestNextWeekLabel();
  }

  // Week number follows the release date: SITE_CONFIG.week1Date is Week 1, each later Sunday +1.
  function suggestNextWeekLabel() {
    const week1 = (window.SITE_CONFIG && window.SITE_CONFIG.week1Date) || "";
    const a = /^(\d{4})-(\d{2})-(\d{2})$/.exec(week1);
    const b = /^(\d{4})-(\d{2})-(\d{2})$/.exec(els.metaWeekDate.value || "");
    if (a && b) {
      const start = new Date(+a[1], +a[2] - 1, +a[3]);
      const d = new Date(+b[1], +b[2] - 1, +b[3]);
      const n = Math.floor(Math.round((d - start) / 86400000) / 7) + 1;
      if (n >= 1) {
        els.metaWeekLabel.value = `Week ${String(n).padStart(2, "0")}`;
        return;
      }
    }
    const cat = els.metaCategory.value;
    const countInCat = sets.filter((s) => s.category === cat).length;
    els.metaWeekLabel.value = `Week ${String(countInCat + 1).padStart(2, "0")}`;
  }

  function getNextSundayIso() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const daysUntilSunday = day === 0 ? 0 : 7 - day;
    const nextSun = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSunday);
    const yyyy = nextSun.getFullYear();
    const mm = String(nextSun.getMonth() + 1).padStart(2, "0");
    const dd = String(nextSun.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function buildSetFromForm() {
    const category = els.metaCategory.value;
    const weekDate = els.metaWeekDate.value.trim();
    const weekLabel = els.metaWeekLabel.value.trim();
    const title = els.metaTitle.value.trim();

    if (!weekDate || !weekLabel) {
      throw new Error("Please enter both a Sunday release date and a week label.");
    }

    const questions = [];
    for (let i = 1; i <= QUESTIONS_PER_SET; i++) {
      const topic = document.getElementById(`q${i}-topic`).value.trim();
      const prompt = document.getElementById(`q${i}-prompt`).value.trim();
      const note = document.getElementById(`q${i}-note`).value.trim();
      const choices = CHOICE_LETTERS.map((_, cIdx) =>
        document.getElementById(`q${i}-choice-${cIdx}`).value.trim()
      );
      const checkedRadio = document.querySelector(`input[name="q${i}-correct"]:checked`);
      const correctIndex = checkedRadio ? Number(checkedRadio.value) : 0;

      if (!prompt) {
        throw new Error(`Question ${i} is missing its prompt.`);
      }
      if (choices.some((c) => !c)) {
        throw new Error(`Question ${i} must have all 4 choices filled in.`);
      }

      questions.push({
        id: `q${i}`,
        topic,
        prompt,
        choices,
        correctIndex,
        instructorNote: note
      });
    }

    return {
      id: `${weekDate}-${category}`,
      weekLabel,
      weekDate,
      category,
      title,
      questions
    };
  }

  function generateQuestionsJsContent(updatedSets) {
    const headerComment = [
      "/**",
      " * Weekly Environmental Engineering Question Bank",
      " * ----------------------------------------------",
      " * Generated via author.html (Instructor Weekly Question Builder).",
      " */",
      ""
    ].join("\n");

    const payload = JSON.stringify({ sets: updatedSets }, null, 2);
    return `${headerComment}window.ENV_ENG_QUESTIONS = ${payload};\n`;
  }

  async function handleSave(mode) {
    els.feedback.innerHTML = "";
    try {
      const newSet = buildSetFromForm();

      // Replace existing set with same ID if editing, otherwise prepend
      const existingIdx = sets.findIndex((s) => s.id === newSet.id);
      if (existingIdx >= 0) {
        sets[existingIdx] = newSet;
      } else {
        sets.unshift(newSet);
      }

      const fileContent = generateQuestionsJsContent(sets);
      renderPublishedSets();

      if (mode === "download") {
        downloadFile("questions.js", fileContent);
        showFeedback(
          `Saved "${newSet.weekLabel} (${newSet.category})" and downloaded updated questions.js. Replace data/questions.js in your website folder.`,
          "success"
        );
      } else if (mode === "copy") {
        await navigator.clipboard.writeText(fileContent);
        showFeedback(
          `Saved "${newSet.weekLabel} (${newSet.category})" and copied the full questions.js code to your clipboard. Paste it into data/questions.js.`,
          "success"
        );
      }
    } catch (err) {
      showFeedback(err.message || "Please check all fields before saving.", "error");
    }
  }

  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "application/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function renderPublishedSets() {
    els.publishedCount.textContent = String(sets.length);
    els.loadedSetsSummary.textContent = `Currently loaded from data/questions.js: ${sets.length} weekly set(s).`;
    els.publishedSetsList.innerHTML = "";

    if (sets.length === 0) {
      els.publishedSetsList.innerHTML = `<div class="empty-state">No question sets found.</div>`;
      return;
    }

    const sorted = [...sets].sort((a, b) => (b.weekDate || "").localeCompare(a.weekDate || ""));
    sorted.forEach((s) => {
      const row = document.createElement("div");
      row.className = "forum-post";
      row.style.marginBottom = "0.6rem";
      row.style.display = "flex";
      row.style.flexWrap = "wrap";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.gap = "0.5rem";

      const info = document.createElement("div");
      const strong = document.createElement("strong");
      strong.textContent = `${s.weekLabel} (${s.weekDate}) — ${s.category.toUpperCase()}`;
      info.appendChild(strong);

      if (s.title) {
        const sub = document.createElement("div");
        sub.style.fontSize = "0.84rem";
        sub.style.color = "var(--text-secondary)";
        sub.textContent = `${s.title} • ${(s.questions || []).length} questions`;
        info.appendChild(sub);
      }

      const loadBtn = document.createElement("button");
      loadBtn.type = "button";
      loadBtn.className = "btn btn-secondary";
      loadBtn.textContent = "Load into Editor";
      loadBtn.addEventListener("click", () => loadSetIntoEditor(s));

      row.appendChild(info);
      row.appendChild(loadBtn);
      els.publishedSetsList.appendChild(row);
    });
  }

  function loadSetIntoEditor(setObj) {
    els.metaCategory.value = setObj.category || "easy";
    els.metaWeekDate.value = setObj.weekDate || getNextSundayIso();
    els.metaWeekLabel.value = setObj.weekLabel || "";
    els.metaTitle.value = setObj.title || "";

    for (let i = 1; i <= QUESTIONS_PER_SET; i++) {
      const q = (setObj.questions || [])[i - 1] || {};
      document.getElementById(`q${i}-topic`).value = q.topic || "";
      document.getElementById(`q${i}-prompt`).value = q.prompt || "";
      document.getElementById(`q${i}-note`).value = q.instructorNote || "";

      CHOICE_LETTERS.forEach((_, cIdx) => {
        document.getElementById(`q${i}-choice-${cIdx}`).value = (q.choices && q.choices[cIdx]) || "";
      });

      const correctIdx = typeof q.correctIndex === "number" ? q.correctIndex : 0;
      const radio = document.querySelector(`input[name="q${i}-correct"][value="${correctIdx}"]`);
      if (radio) radio.checked = true;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    showFeedback(`Loaded "${setObj.weekLabel} (${setObj.category})" into the editor.`, "success");
  }

  function resetEditor() {
    els.authorForm.reset();
    setDefaultReleaseMeta();
    els.feedback.innerHTML = "";
  }

  function showFeedback(message, type) {
    els.feedback.innerHTML = "";
    const box = document.createElement("div");
    box.className = `alert-box ${type === "error" ? "alert-error" : "alert-success"}`;
    box.textContent = message;
    els.feedback.appendChild(box);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
