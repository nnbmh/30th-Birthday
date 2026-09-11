const computerToast = document.getElementById("computerToast");
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");
const taskbarDate = document.getElementById("taskbarDate");

let computerToastTimer = null;

/* ============================= */
/* BASIC COMPUTER HELPERS */
/* ============================= */

function computerClick() {
  if (typeof playClick === "function") playClick();
}

function showComputerToast(message) {
  if (!computerToast) return;
  clearTimeout(computerToastTimer);
  computerToast.textContent = message;
  computerToast.classList.add("show");
  computerToastTimer = setTimeout(() => {
    computerToast.classList.remove("show");
  }, 2200);
}

function explorerItem(icon, name, app = "") {
  if (app) {
    return `
      <button class="explorer-item" data-explorer-app="${app}">
        <div class="explorer-item-icon">${icon}</div>
        <span>${name}</span>
      </button>
    `;
  }
  return `
    <div class="explorer-item">
      <div class="explorer-item-icon">${icon}</div>
      <span>${name}</span>
    </div>
  `;
}

function explorerLayout(path, items) {
  return `
    <div class="explorer-window">
      <div class="explorer-toolbar">
        <span class="explorer-nav">‹ &nbsp; › &nbsp; ↑</span>
        <div class="explorer-path">This PC &nbsp;›&nbsp; ${path}</div>
      </div>
      <h3 class="explorer-heading">${path}</h3>
      <div class="explorer-grid">${items.join("")}</div>
    </div>
  `;
}

/* ============================= */
/* COMPUTER CONTENT */
/* ============================= */

const computerAppData = {
  thispc: {
    title: "This PC",
    content: `
      <div class="explorer-window">
        <div class="explorer-toolbar">
          <span class="explorer-nav">‹ &nbsp; › &nbsp; ↑</span>
          <div class="explorer-path">This PC</div>
        </div>
        <h3 class="explorer-heading">Folders</h3>
        <div class="explorer-grid">
          ${explorerItem("📄", "Documents", "documents")}
          ${explorerItem("⬇️", "Downloads", "downloads")}
          ${explorerItem("🖼️", "Pictures")}
          ${explorerItem("🎵", "Music")}
        </div>
        <div class="drive-section">
          <h3 class="explorer-heading">Devices and drives</h3>
          <div class="drive-item">
            <div class="drive-icon">💽</div>
            <div class="drive-info">
              <div class="drive-name">Local Disk (C:)</div>
              <div class="drive-bar"><span></span></div>
              <div class="drive-space">214 GB free of 476 GB</div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  documents: {
    title: "Documents",
    content: explorerLayout("Documents", [
      explorerItem("📁", "Forge Protocol"),
      explorerItem("📄", "Master CV.docx"),
      explorerItem("📁", "Personal"),
      explorerItem("📁", "Work")
    ])
  },

  downloads: {
    title: "Downloads",
    content: explorerLayout("Downloads", [
      explorerItem("📕", "CV - BA.pdf"),
      explorerItem("📕", "Cover Letter - BA.pdf"),
      explorerItem("📕", "Faris Osmanbhoy Recommendation.pdf"),
      explorerItem("🖼️", "Canva Design.png"),
      explorerItem("🖼️", "Canva Design (1).png"),
      explorerItem("🖼️", "image_3847.jpg"),
      explorerItem("🖼️", "IMG_20260903.png")
    ])
  },

  recycle: {
    title: "Recycle Bin",
    content: `
      <div class="explorer-window">
        <div class="explorer-toolbar">
          <span class="explorer-nav">‹ &nbsp; › &nbsp; ↑</span>
          <div class="explorer-path">Recycle Bin</div>
        </div>
        <div class="recycle-empty">
          <div class="recycle-empty-icon">🗑️</div>
          <p>This folder is empty.</p>
        </div>
      </div>
    `
  },

  chrome: {
    title: "Google Chrome",
    content: `
      <div class="fake-app">
        <div class="fake-app-logo">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" fill="#fff"/>
            <path d="M32 32L9 32A27 27 0 0 1 50 13z" fill="#ea4335"/>
            <path d="M32 32l12 21A27 27 0 0 1 9 32z" fill="#34a853"/>
            <path d="M32 32l18-19A27 27 0 0 1 44 53z" fill="#fbbc05"/>
            <circle cx="32" cy="32" r="11" fill="#4285f4"/>
          </svg>
        </div>
        <h2>Google Chrome</h2>
        <p>Internet access unavailable during birthday maintenance.</p>
      </div>
    `
  },

  discord: {
    title: "Discord",
    content: `
      <div class="fake-app">
        <div class="fake-app-logo">
          <svg viewBox="0 0 64 64">
            <rect x="6" y="6" width="52" height="52" rx="13" fill="#5865f2"/>
            <path d="M22 22c7-5 13-5 20 0 4 6 6 12 7 19-5 4-9 6-13 7l-2-4c3-1 5-2 7-4-7 4-12 4-19 0 2 2 4 3 7 4l-2 4c-4-1-8-3-13-7 1-7 3-13 8-19z" fill="white"/>
          </svg>
        </div>
        <h2>Discord</h2>
        <p>already enough hours logged here.</p>
      </div>
    `
  },

  spotify: {
    title: "Spotify",
    content: `
      <div class="fake-app">
        <div class="fake-app-logo">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" fill="#1ed760"/>
            <path d="M18 25c11-3 24-2 34 3M20 34c9-2 20-1 29 3M22 42c8-1 16 0 23 3" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </div>
        <h2>Spotify</h2>
        <p>Playback unavailable.</p>
      </div>
    `
  },

  steam: {
    title: "Steam",
    content: `
      <div class="fake-app">
        <div class="fake-app-logo">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" fill="#15344c"/>
            <circle cx="42" cy="22" r="9" fill="none" stroke="white" stroke-width="4"/>
            <circle cx="20" cy="42" r="7" fill="none" stroke="white" stroke-width="4"/>
            <path d="M26 39l10-11 8 3" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
        <h2>Steam</h2>
        <p>connection unavailable.</p>
      </div>
    `
  },

  /* ============================= */
  /* BIRTHDAY FILES */
  /* ============================= */

  birthday: {
    title: "things i like about you.txt",
    content: `
      <div class="birthday-pc-file">
        <p class="eyebrow">THINGS I LIKE ABOUT YOU</p>
        <h2>okay dont let this get to your head...</h2>

        <p>your laugh when something actually gets you</p>

        <p>the way your whole face changes when youre genuinely excited abt something</p>

        <p>when you randomly start dancing out of nowhere and i cant help but laugh at you</p>

        <p>when you do something completely ridiculous just because you know its gonna get a reaction out of me</p>

        <p>all the random faces you make without even realising youre doing it</p>

        <p>hearing your voice when we get on discord after a long day</p>

        <p>your sleepy voice when youre barely awake but still talking to me</p>

        <p>the way you always ask if ive eaten</p>

        <p>your aggressive commitment to making me drink water</p>

        <p>how you somehow know almost every random song that plays</p>

        <p>your cuddles</p>

        <p>the way you pull me closer when we're lying together</p>

        <p>how comfortable it feels just lying next to you</p>

        <p>the way you make me feel when we're having sex... how turned on i get, how good everything feels and how much i just want more of you</p>

        <p>the way i can spend hours and hours with you and somehow still miss you when youre gone</p>

        <p>...</p>

        <p>okay this is getting dangerously nice.</p>

        <p>im stopping here before your ego gets too big.</p>
      </div>
    `
  },

  message: {
    title: "message.txt",
    content: `
      <div class="birthday-pc-file">
        <p class="eyebrow">MESSAGE FROM SAYANG</p>
        <h2>hi bb.</h2>
        <p>surprised theres no insult here?</p>
        <p>i can be nice to you sometimes okay...</p>
        <p>i just wanted to leave you a little reminder that youre very very loved.</p>
        <p>not because its your birthday and i have to say it... but because you are.</p>
        <p>im really glad youre here, sayang.</p>
        <p>happy 30th birthday bb ♡</p>
      </div>
    `
  },

  photos: {
    title: "photos",
    content: `
      <div class="birthday-pc-file">
        <p class="eyebrow">PHOTO ARCHIVE</p>
        <h2>selected evidence from the Faris collection.</h2>
        <p>compiled by Sayang for completely normal reasons.</p>
        <div style="margin-top:28px;padding:24px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.025);text-align:center;">
          <p style="margin:0 0 8px;font-family:monospace;font-size:10px;letter-spacing:.14em;">PHOTO FILES</p>
          <p style="margin:0;font-size:10px;opacity:.45;">archive awaiting final images</p>
        </div>
        <p style="margin-top:26px;">more evidence expected to be collected.</p>
        <p>storage reserved for future memories ♡</p>
      </div>
    `
  },

  classified: {
    title: "CLASSIFIED",
    content: `
      <div class="birthday-pc-file">
        <p class="eyebrow">RESTRICTED FILE</p>
        <h2>ACCESS DENIED</h2>
        <p>clearance level insufficient.</p>
        <p>nice try, Faris.</p>
        <p>maybe theres something else in the room you havent found yet.</p>
      </div>
    `
  }
};

/* ============================= */
/* OPEN COMPUTER WINDOWS */
/* ============================= */

function openComputerApp(appName) {
  const data = computerAppData[appName];
  if (!data) return;
  computerClick();
  if (startMenu) startMenu.classList.remove("open");
  appTitle.textContent = data.title;
  appContent.innerHTML = data.content;
  appWindow.classList.add("open");
}

/* Normal computer apps */
document.querySelectorAll("[data-computer-app]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openComputerApp(button.dataset.computerApp);
  });
});

/* Birthday files */
document.querySelectorAll("[data-app]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const appName = button.dataset.app;
    if (!computerAppData[appName]) return;
    event.stopPropagation();
    appTitle.textContent = computerAppData[appName].title;
    appContent.innerHTML = computerAppData[appName].content;
    appWindow.classList.add("open");
  });
});

/* Click folders from inside This PC */
appContent.addEventListener("click", (event) => {
  const explorerButton = event.target.closest("[data-explorer-app]");
  if (!explorerButton) return;
  openComputerApp(explorerButton.dataset.explorerApp);
});

/* ============================= */
/* START MENU */
/* ============================= */

if (startButton && startMenu) {
  startButton.addEventListener("click", (event) => {
    event.stopPropagation();
    computerClick();
    startMenu.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!startMenu.contains(event.target) && event.target !== startButton) {
      startMenu.classList.remove("open");
    }
  });
}

/* ============================= */
/* SEARCH */
/* ============================= */

const searchButton = document.querySelector(".taskbar-search");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    computerClick();
    showComputerToast("Search indexing is taking longer than expected.");
  });
}

/* ============================= */
/* DATE */
/* ============================= */

function updateComputerDate() {
  if (!taskbarDate) return;
  const now = new Date();
  taskbarDate.textContent = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

updateComputerDate();
setInterval(updateComputerDate, 60000);
