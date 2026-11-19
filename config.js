/**
 * Site & Forum Configuration
 * --------------------------
 * Everything here can be customized without touching application logic.
 */
window.SITE_CONFIG = {
  // Site branding
  siteTitle: "Environmental Engineering Weekly Review",
  siteSubtitle: "Open-Access Practice Questions & Peer Explanation Forum",
  scheduleNote: "New 5-question sets published every Sunday",
  footerText: "Environmental Engineering Weekly Review • Free Educational Resource",

  // Category display metadata
  categories: {
    easy: {
      label: "Easy",
      description: "Core definitions, fundamental principles, and foundational environmental engineering concepts."
    },
    intermediate: {
      label: "Intermediate",
      description: "Applied calculations, unit conversions, treatment process design, and standard engineering models."
    },
    hard: {
      label: "Hard / Thought-Provoking",
      description: "Multi-factor systems thinking, operational troubleshooting, and engineering design trade-offs."
    }
  },

  /**
   * Side Forum Backend Mode:
   * ------------------------
   * Option 1: "local" (Default out-of-the-box)
   *   - Works immediately with zero setup for previewing and classroom demos.
   *   - Saves posts in the visitor's own browser (localStorage).
   *
   * Option 2: "firebase" (100% Free Spark Plan — Recommended for live public website)
   *   - Lets ALL web visitors read and post explanations with just a display name (no login required).
   *   - Paste your Firebase web app config below and change forumMode to "firebase".
   *   - See README.md for 5-minute free setup instructions.
   *
   * Option 3: "giscus" (100% Free via GitHub Discussions)
   *   - Visitors sign in with a free GitHub account to post; everyone can read.
   *   - Fill in giscus settings below and change forumMode to "giscus".
   */
  forumMode: "local",

  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    collectionName: "env_eng_explanations"
  },

  giscus: {
    repo: "",          // e.g. "username/enviro-eng-weekly"
    repoId: "",        // From https://giscus.app
    category: "General",
    categoryId: ""     // From https://giscus.app
  }
};
