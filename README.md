# 🚀 Career Finder AI

> Find your perfect career in seconds — PWA ready for Android APK

---

## 📁 File Structure

```
career-finder-ai/
├── index.html      ← Main app (all CSS & JS inline)
├── manifest.json   ← PWA manifest (install + APK metadata)
├── sw.js           ← Service worker (offline support)
├── icon-192.png    ← App icon 192×192 (add your own)
├── icon-512.png    ← App icon 512×512 (add your own)
└── README.md       ← This file
```

---

## ⚙️ Setup in 2 Minutes

### 1. Add your OpenAI API key (for AI Mode)
Open `index.html`, find this line near the top of `<script>`:
```js
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";
```
Replace with your real key from https://platform.openai.com/api-keys
```js
const OPENAI_API_KEY = "sk-abc123yourkeyhere";
```
> ⚠️ AI Mode is OPTIONAL. The app works fully without a key using Smart Mode.

### 2. Add App Icons (for APK)
Create two PNG icons and place them in the folder:
- `icon-192.png` — 192×192 px (purple background + 🚀 emoji)
- `icon-512.png` — 512×512 px (same design)

Free icon generator: https://realfavicongenerator.net

---

## 🌐 Host It Online

The app needs to be hosted on HTTPS for PWA features to work.

### Option A — GitHub Pages (FREE)
```bash
git init
git add .
git commit -m "Career Finder AI v1.0"
git remote add origin https://github.com/YOUR_USERNAME/career-finder-ai.git
git push -u origin main
# Enable Pages in repo Settings → Pages → Deploy from main branch
```

### Option B — Netlify (FREE, drag & drop)
1. Go to https://netlify.com
2. Drag the `career-finder-ai/` folder into the deploy zone
3. Done! You get a live HTTPS URL instantly.

### Option C — Vercel (FREE)
```bash
npx vercel --prod
```

---

## 📦 Convert to Android APK

### Method 1 — PWABuilder (Recommended, FREE)
1. Host your app on HTTPS (GitHub Pages / Netlify)
2. Go to https://pwabuilder.com
3. Enter your hosted URL → click **Start**
4. Click **Android** → **Generate Package**
5. Download the `.apk` or `.aab` file
6. Sign it and upload to Google Play Console

### Method 2 — Bubblewrap (Google's official tool)
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://your-app-url.com/manifest.json
bubblewrap build
```

### Method 3 — Capacitor (Advanced)
```bash
npm install -g @capacitor/cli
npx cap init "Career Finder AI" "com.yourname.careerfinder"
npx cap add android
npx cap sync
npx cap open android
# Build APK from Android Studio
```

---

## 🏪 Google Play Store Upload

1. Create a Google Play Console account ($25 one-time fee)
2. Create a new app → select "Android" → "Free"
3. Upload your signed `.aab` file
4. Fill in:
   - App title: **Career Finder AI**
   - Short desc: *Find your perfect career in seconds 🚀*
   - Category: **Education**
   - Content rating: **Everyone**
5. Add screenshots (use Chrome DevTools → Mobile view → screenshot)
6. Submit for review (usually 1–3 days)

---

## 🎨 Customisation

| What | Where |
|------|-------|
| App name | `manifest.json` → `name` |
| Colors | `index.html` → `:root { --primary: ... }` |
| Career database | `index.html` → `const careerDB = {...}` |
| Loading facts | `index.html` → `const loadingFacts = [...]` |
| Splash logo | `index.html` → `.splash-logo` emoji |
| Share text | `index.html` → `buildShareText()` function |

---

## ✅ Feature Checklist

- [x] Splash screen with animation
- [x] Home screen with stats
- [x] 4-input quiz (name, marks, interest, budget)
- [x] FREE mode with smart JS logic (6 interests × 3 tiers × 5 careers)
- [x] AI mode with OpenAI API + fallback
- [x] Animated result cards with tags
- [x] Confetti celebration 🎉
- [x] WhatsApp share
- [x] Copy to clipboard
- [x] 5-star rating widget
- [x] Dark / Light mode toggle
- [x] Offline detection + fallback message
- [x] PWA manifest (installable)
- [x] Service worker (offline caching)
- [x] Progress bar
- [x] Back navigation (Android hardware back)
- [x] Toast notifications
- [x] Mobile-first (max-width 430px)
- [x] Poppins font
- [x] Glassmorphism UI
- [x] Zero dependencies (pure HTML/CSS/JS)

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, glassmorphism, animations
- **Vanilla JS** — Zero frameworks, maximum performance
- **PWA** — Service worker + manifest for APK conversion
- **OpenAI API** — Optional AI mode (gpt-3.5-turbo)

---

Made with ❤️ by Zynk Studio
