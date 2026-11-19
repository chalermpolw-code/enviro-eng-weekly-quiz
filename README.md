# Environmental Engineering Weekly Review

A plain, formal, open-access educational website for weekly **Environmental Engineering** multiple-choice practice questions, organized into three categories (**Easy**, **Intermediate**, and **Hard / Thought-Provoking**), with immediate answer feedback and a **Peer Explanation Side Forum**.

Everything runs as a lightweight static website with **zero hosting fees** and **zero build tools required**.

---

## Project Structure

- `index.html` — Main public website (category tabs, weekly releases, 5 multiple-choice questions per set, immediate answer reveal, and side forum).
- `author.html` — Built-in **Instructor Weekly Question Builder** to prepare and download updated question sets every Sunday without editing code.
- `config.js` — Site title, descriptions, and optional free public forum settings (Local Preview, Firebase Firestore, or Giscus).
- `data/questions.js` — All weekly question sets (pre-populated with 15 sample environmental engineering questions across Easy, Intermediate, and Hard).
- `styles.css` — Clean, formal academic stylesheet.
- `app.js` / `author.js` — Website and question-builder logic.

---

## 1. Preview Locally on Your Computer

You can open `index.html` directly in any web browser (Chrome, Safari, Edge, Firefox) by double-clicking it — no server or terminal commands required.

---

## 2. Publish Online for Free (GitHub Pages)

**GitHub Pages** hosts static websites completely free (`$0/month`, no ads, HTTPS included):

1. Create a free account at [github.com](https://github.com) and create a new **public** repository (for example, `enviro-eng-weekly`).
2. Upload all files from this folder (`index.html`, `author.html`, `styles.css`, `config.js`, `app.js`, `author.js`, and the `data/` folder) using **Add file → Upload files** in your browser.
3. In the repository, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, select **main** and **/ (root)**, then click **Save**.
5. Within 1–2 minutes, your free website will be live at:
   `https://<your-username>.github.io/<repository-name>/`

*(Alternative free hosts: drag-and-drop this folder into [Netlify Drop](https://app.netlify.com/drop) or [Cloudflare Pages](https://pages.cloudflare.com/).)*

---

## 3. How to Upload New Questions Every Sunday

1. Open `author.html` (either locally on your computer or via the **Instructor Upload Tool** link in the footer).
2. Choose the **Category** (`Easy`, `Intermediate`, or `Hard / Thought-Provoking`), **Sunday Release Date**, and **Week Label** (e.g., `Week 2`).
3. Enter your **5 multiple-choice questions**, mark each correct answer, and optionally add a short official note.
4. Click **Add Set & Download updated `questions.js`** (or **Copy to Clipboard**).
5. Replace `data/questions.js` in your GitHub repository (open `data/questions.js` on GitHub → click the pencil **Edit** icon → paste → **Commit changes**).
   All previous weeks remain preserved automatically as an archive.

---

## 4. Enable the Free Public Side Forum

Out of the box, the side forum runs in **Local Preview Mode** (posts are stored in the visitor's own browser so you can test the layout immediately).

To let **all web visitors** read and share explanations with one another for free, choose one of the two free options below:

### Option A: Firebase Firestore (Recommended — Visitors Do Not Need an Account)

Firebase's **Spark Plan** is `$0/month` (free tier includes 50,000 reads/day and 20,000 writes/day — plenty for a course or public study site) and lets visitors post explanations by simply typing their name.

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and click **Create a project** (use the free Spark plan; Google Analytics is optional).
2. In the left menu, click **Build → Firestore Database → Create database** (start in **Production mode**).
3. Under the **Rules** tab in Firestore, paste these rules and click **Publish**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /env_eng_explanations/{docId} {
         allow read: if true;
         allow create: if request.resource.data.keys().hasAll(['setId', 'questionNumber', 'author', 'text', 'createdAt', 'helpful'])
           && request.resource.data.author is string
           && request.resource.data.author.size() > 0
           && request.resource.data.author.size() <= 80
           && request.resource.data.text is string
           && request.resource.data.text.size() > 0
           && request.resource.data.text.size() <= 2000
           && request.resource.data.helpful == 0;
         allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['helpful'])
           && request.resource.data.helpful == resource.data.helpful + 1;
       }
     }
   }
   ```
4. In Firebase **Project Settings → Your apps**, click the Web icon (`</>`) to register a web app and copy the `firebaseConfig` object.
5. Open `config.js`, change `forumMode: "local"` to `forumMode: "firebase"`, and paste your `firebase` keys.

### Option B: Giscus (100% Free via GitHub Discussions)

If your visitors already have GitHub accounts:

1. Enable **Discussions** in your GitHub repository **Settings**.
2. Visit [giscus.app](https://giscus.app), enter your repository name, and copy your `repoId` and `categoryId`.
3. Open `config.js`, set `forumMode: "giscus"`, and fill in the `giscus` fields.
