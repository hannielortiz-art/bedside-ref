# Bedside Ref

*Orientation to CCRN: An ICU Nurse's Bedside Reference*, General edition, as an app you can install. It opens from a home-screen or desktop icon and works offline.

- **Contents menu:** the ☰ button, or tap the title bar. It lists Parts, sections and subsections.
- **Links:** every section number in the text, tables and Index is a link. After following one, a **Back to…** button returns you to where you were.
- **Search:** the magnifier searches the whole book, section titles, and your own highlights and notes.
- **Highlights and notes:** select text, then tap a color. Tap **Note** to write a note. Tap any highlight to change its color, edit the note, or delete it. The bookmark button lists them all.
- **Reading settings (Aa):** text size, line spacing, paragraph spacing, margins, and theme (auto, light, sepia, dark).
- **Resumes** where you left off.

Your highlights, notes and settings stay in this device's storage. Nothing is sent anywhere. To move them to another device or keep a copy, use **Notes → Back up**, then **Restore from backup** on the other device. Never put patient-identifying information in a note.

## Put it online (GitHub Pages, free)

These steps are easiest on a computer.

1. Sign in at github.com, or create a free account.
2. Top right: **+** → **New repository**. Name it `bedside-ref`, set it to **Public**, and click **Create repository**.
   - Public means anyone with the address can open the book. It holds no personal data; your notes stay on your devices.
3. On the next page, click **uploading an existing file**. Drag in **everything inside this folder**, including the `fonts` and `img` folders, but not the folder itself. Click **Commit changes**.
   - If the `fonts` or `img` folders don't upload by dragging, open each one and drag in its files. GitHub keeps the folder name when you drag the folder itself.
4. Go to **Settings** → **Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main**, and the folder to **/ (root)**. Click **Save**.
5. Wait 1–2 minutes. The address appears at the top of the Pages screen: `https://YOUR-USERNAME.github.io/bedside-ref/`

## Install it

- **iPhone or iPad:** open the address in **Safari** and let it load fully once; that's when it saves itself for offline use. Then tap **Share** → **Add to Home Screen** → **Add**.
- **Android:** open the address in Chrome, then tap **⋮** → **Install app** (or **Add to Home screen**).
- **Mac or PC:** open it in Chrome or Edge, then click the install icon at the right end of the address bar. On a Mac with Safari, use **File** → **Add to Dock**.

## Updating it

Upload the new files to the same repository; they replace the old ones. Each build changes `VERSION` at the top of `sw.js`, and that tells installed copies to fetch the new book. Open the app once while online. When it shows **A new version of the book is ready**, tap **Update**. Highlights carry over. If a highlighted passage was reworded in an update, the app finds it again by its text; if it can't, the highlight stays listed on the Notes page with its text.

## Files

- `index.html`: the app and the whole book
- `sw.js`: offline support
- `manifest.webmanifest` and the `*.png` icons: the app name and icon
- `img/`: the book's photographs and illustrations
- `fonts/`: Nunito, Fredoka and Caveat, under the SIL Open Font License (see the `OFL-*.txt` files)
