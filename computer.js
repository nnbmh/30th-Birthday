const computerToast = document.getElementById("computerToast");
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");
const taskbarDate = document.getElementById("taskbarDate");

let computerToastTimer = null;
let currentPhotoCollection = [];
let currentPhotoIndex = 0;
let currentPhotoFolder = "photos";

function computerClick() {
  if (typeof playClick === "function") playClick();
}

function showComputerToast(message) {
  if (!computerToast) return;
  clearTimeout(computerToastTimer);
  computerToast.textContent = message;
  computerToast.classList.add("show");
  computerToastTimer = setTimeout(() => computerToast.classList.remove("show"), 2200);
}

function setComputerWindowMode(appName) {
  const explorerApps = ["thispc", "documents", "downloads", "photos", "recycle"];
  appWindow.classList.toggle("explorer-mode", explorerApps.includes(appName));
}

function folderIcon() {
  return `<span class="win-folder-glyph"><span></span></span>`;
}

function fileIcon(type = "file") {
  if (type === "pdf") return `<span class="win-file-glyph win-pdf">PDF</span>`;
  if (type === "image") return `<span class="win-file-glyph win-image-glyph">▧</span>`;
  if (type === "doc") return `<span class="win-file-glyph win-doc">W</span>`;
  return `<span class="win-file-glyph">▤</span>`;
}

function sidebar() {
  return `<aside class="win-sidebar">
    <div class="win-sidebar-group">
      <div class="win-sidebar-title">Quick access</div>
      <button class="win-nav-item" data-explorer-app="thispc"><span>▣</span>This PC</button>
      <button class="win-nav-item" data-explorer-app="documents"><span>▤</span>Documents</button>
      <button class="win-nav-item" data-explorer-app="downloads"><span>↓</span>Downloads</button>
      <button class="win-nav-item" data-explorer-app="photos"><span>▧</span>Pictures</button>
    </div>
    <div class="win-sidebar-group">
      <div class="win-sidebar-title">This PC</div>
      <div class="win-nav-static"><span>♫</span>Music</div>
      <div class="win-nav-static"><span>▰</span>Local Disk (C:)</div>
    </div>
  </aside>`;
}

function explorerChrome(path, content, searchLabel = "Search") {
  return `<div class="windows-explorer">
    <div class="win-ribbon">
      <span class="win-file-tab">File</span>
      <span>Home</span>
      <span>Share</span>
      <span>View</span>
    </div>
    <div class="win-address-row">
      <div class="win-history">
        <button type="button" class="win-history-button" data-explorer-back aria-label="Back">‹</button>
        <span>›</span>
        <span>↑</span>
      </div>
      <div class="win-address-bar">${path}</div>
      <div class="win-search-box">⌕&nbsp;&nbsp;${searchLabel}</div>
    </div>
    <div class="win-explorer-body">
      ${sidebar()}
      <main class="win-file-pane">${content}</main>
    </div>
    <div class="win-status-bar"></div>
  </div>`;
}

function explorerFolderItem(name, app = "") {
  const attribute = app ? `data-explorer-app="${app}"` : "";
  return `<button class="win-large-item win-folder-item" ${attribute}>
    ${folderIcon()}
    <span>${name}</span>
  </button>`;
}

function explorerFileItem(name, type = "file") {
  return `<div class="win-large-item win-standard-file">
    ${fileIcon(type)}
    <span>${name}</span>
  </div>`;
}

function photoFolderItem(name, folder) {
  return `<button class="win-large-item win-folder-item" data-photo-folder="${folder}">
    ${folderIcon()}
    <span>${name}</span>
  </button>`;
}

function photoFileItem(path, name, collection, index) {
  return `<button class="win-large-item win-photo-item" data-photo-path="${path}" data-photo-name="${name}" data-photo-collection="${collection}" data-photo-index="${index}">
    <span class="win-photo-thumb"><img src="${path}" alt="${name}" loading="lazy"></span>
    <span>${name}</span>
  </button>`;
}

const standalonePhotos = [
  "IMG_1475.jpeg",
  "IMG_5852.jpeg",
  "IMG_6971.jpeg",
  "IMG_7167.jpeg",
  "IMG_7489.jpeg",
  "IMG_7546.jpeg"
];

const candidPhotos = [
  "IMG_0146.jpeg",
  "IMG_0157.jpeg",
  "IMG_0172.jpeg",
  "IMG_0214.jpeg",
  "IMG_0216.jpeg",
  "IMG_0235.jpeg",
  "IMG_0259.jpeg",
  "IMG_0260.jpeg",
  "IMG_0281.jpeg",
  "IMG_0282.jpeg",
  "IMG_0526.jpeg",
  "IMG_0537.jpeg",
  "IMG_0538.jpeg",
  "IMG_0544.jpeg",
  "IMG_0545.jpeg",
  "IMG_0563.png",
  "IMG_1450.jpeg",
  "IMG_1451.jpeg",
  "IMG_5888.jpeg",
  "IMG_5895.jpeg"
];

const usPhotos = [
  "D7586191-5BF9-43E6-9046-56A1801E9EFC.jpeg",
  "IMG_0332.png",
  "IMG_0337.jpeg",
  "IMG_0354.jpeg",
  "IMG_1491.jpeg",
  "IMG_1514.jpeg",
  "IMG_1845.jpeg",
  "IMG_1846.jpeg",
  "IMG_5900.jpeg",
  "IMG_7123.jpeg",
  "IMG_7233.jpeg",
  "IMG_7272.jpeg",
  "IMG_9208.jpeg",
  "IMG_9220.jpeg"
];

function renderPhotosHome() {
  const items = [
    photoFolderItem("candid pics i like", "candid"),
    photoFolderItem("us", "us"),
    ...standalonePhotos.map((name, index) => photoFileItem(`assets/photos/${name}`, name, "standalone", index))
  ].join("");

  return explorerChrome(
    `This PC <span>›</span> Pictures`,
    `<div class="win-pane-heading">
      <span>Pictures</span>
      <small>8 items</small>
    </div>
    <div class="win-large-grid">${items}</div>`,
    "Search Pictures"
  );
}

function renderPhotoFolder(folder) {
  const isCandid = folder === "candid";
  const names = isCandid ? candidPhotos : usPhotos;
  const label = isCandid ? "candid pics i like" : "us";
  const base = isCandid ? "assets/photos/candid/" : "assets/photos/us/";

  const items = names.map((name, index) => {
    return photoFileItem(`${base}${name}`, name, folder, index);
  }).join("");

  return explorerChrome(
    `This PC <span>›</span> Pictures <span>›</span> ${label}`,
    `<div class="win-pane-heading">
      <span>${label}</span>
      <small>${names.length} items</small>
    </div>
    <div class="win-large-grid win-photo-folder-grid">${items}</div>`,
    `Search ${label}`
  );
}

function renderThisPC() {
  return explorerChrome(
    "This PC",
    `<div class="win-section-label"><span>Folders</span><i></i></div>
    <div class="win-large-grid win-pc-folder-grid">
      ${explorerFolderItem("Documents", "documents")}
      ${explorerFolderItem("Downloads", "downloads")}
      ${explorerFolderItem("Pictures", "photos")}
      ${explorerFolderItem("Music")}
    </div>
    <div class="win-section-label win-drive-label"><span>Devices and drives</span><i></i></div>
    <div class="win-drive-row">
      <div class="win-drive-icon">▰</div>
      <div class="win-drive-details">
        <div>Local Disk (C:)</div>
        <div class="win-drive-meter"><span></span></div>
        <small>214 GB free of 476 GB</small>
      </div>
    </div>`,
    "Search This PC"
  );
}

function renderDocuments() {
  return explorerChrome(
    `This PC <span>›</span> Documents`,
    `<div class="win-pane-heading"><span>Documents</span><small>4 items</small></div>
    <div class="win-large-grid">
      ${explorerFolderItem("Forge Protocol")}
      ${explorerFileItem("Master CV.docx", "doc")}
      ${explorerFolderItem("Personal")}
      ${explorerFolderItem("Work")}
    </div>`,
    "Search Documents"
  );
}

function renderDownloads() {
  return explorerChrome(
    `This PC <span>›</span> Downloads`,
    `<div class="win-pane-heading"><span>Downloads</span><small>7 items</small></div>
    <div class="win-large-grid">
      ${explorerFileItem("CV - BA.pdf", "pdf")}
      ${explorerFileItem("Cover Letter - BA.pdf", "pdf")}
      ${explorerFileItem("Faris Osmanbhoy Recommendation.pdf", "pdf")}
      ${explorerFileItem("Canva Design.png", "image")}
      ${explorerFileItem("Canva Design (1).png", "image")}
      ${explorerFileItem("image_3847.jpg", "image")}
      ${explorerFileItem("IMG_20260903.png", "image")}
    </div>`,
    "Search Downloads"
  );
}

function renderRecycleBin() {
  return explorerChrome(
    "Recycle Bin",
    `<div class="win-empty-folder">
      <div>🗑</div>
      <p>This folder is empty.</p>
    </div>`,
    "Search Recycle Bin"
  );
}

function getPhotoCollection(collection) {
  if (collection === "candid") {
    return candidPhotos.map((name) => ({
      name,
      path: `assets/photos/candid/${name}`
    }));
  }

  if (collection === "us") {
    return usPhotos.map((name) => ({
      name,
      path: `assets/photos/us/${name}`
    }));
  }

  return standalonePhotos.map((name) => ({
    name,
    path: `assets/photos/${name}`
  }));
}

function renderPhotoViewer() {
  const photo = currentPhotoCollection[currentPhotoIndex];
  if (!photo) return;

  appContent.innerHTML = `<div class="windows-photo-viewer">
    <div class="win-photo-viewer-top">
      <button type="button" data-photo-viewer-back aria-label="Back">←</button>
      <span>${photo.name}</span>
      <small>${currentPhotoIndex + 1} of ${currentPhotoCollection.length}</small>
    </div>
    <div class="win-photo-viewer-stage">
      <button type="button" class="win-viewer-arrow win-viewer-left" data-photo-prev aria-label="Previous">‹</button>
      <img src="${photo.path}" alt="${photo.name}">
      <button type="button" class="win-viewer-arrow win-viewer-right" data-photo-next aria-label="Next">›</button>
    </div>
    <div class="win-photo-viewer-bottom">
      <span>－</span>
      <span>＋</span>
      <span>↻</span>
      <span>♡</span>
      <span>⋯</span>
    </div>
  </div>`;
}

function openPhoto(collection, index) {
  currentPhotoCollection = getPhotoCollection(collection);
  currentPhotoIndex = Number(index);
  currentPhotoFolder = collection;
  appTitle.textContent = currentPhotoCollection[currentPhotoIndex].name;
  renderPhotoViewer();
  computerClick();
}

function showPreviousPhoto() {
  if (!currentPhotoCollection.length) return;
  currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotoCollection.length) % currentPhotoCollection.length;
  appTitle.textContent = currentPhotoCollection[currentPhotoIndex].name;
  renderPhotoViewer();
  computerClick();
}

function showNextPhoto() {
  if (!currentPhotoCollection.length) return;
  currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotoCollection.length;
  appTitle.textContent = currentPhotoCollection[currentPhotoIndex].name;
  renderPhotoViewer();
  computerClick();
}

const computerAppData = {
  thispc: {
    title: "This PC",
    render: renderThisPC
  },

  documents: {
    title: "Documents",
    render: renderDocuments
  },

  downloads: {
    title: "Downloads",
    render: renderDownloads
  },

  recycle: {
    title: "Recycle Bin",
    render: renderRecycleBin
  },

  photos: {
    title: "Pictures",
    render: renderPhotosHome
  },

  chrome: {
    title: "Google Chrome",
    content: `<div class="fake-app">
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
    </div>`
  },

  discord: {
    title: "Discord",
    content: `<div class="fake-app">
      <div class="fake-app-logo">
        <svg viewBox="0 0 64 64">
          <rect x="6" y="6" width="52" height="52" rx="13" fill="#5865f2"/>
          <path d="M22 22c7-5 13-5 20 0 4 6 6 12 7 19-5 4-9 6-13 7l-2-4c3-1 5-2 7-4-7 4-12 4-19 0 2 2 4 3 7 4l-2 4c-4-1-8-3-13-7 1-7 3-13 8-19z" fill="white"/>
        </svg>
      </div>
      <h2>Discord</h2>
      <p>already enough hours logged here.</p>
    </div>`
  },

  spotify: {
    title: "Spotify",
    content: `<div class="fake-app">
      <div class="fake-app-logo">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="27" fill="#1ed760"/>
          <path d="M18 25c11-3 24-2 34 3M20 34c9-2 20-1 29 3M22 42c8-1 16 0 23 3" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </div>
      <h2>Spotify</h2>
      <p>Playback unavailable.</p>
    </div>`
  },

  steam: {
    title: "Steam",
    content: `<div class="fake-app">
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
    </div>`
  },

  birthday: {
    title: "things i like about you.txt",
    content: `<div class="birthday-pc-file">
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
    </div>`
  },

  message: {
    title: "DO NOT OPEN.txt",
    content: `<div class="birthday-pc-file">
      <p class="eyebrow">DO NOT OPEN</p>
      <h2>faris...</h2>
      <p>the file literally said do not open.</p>
      <p>but since youre here now...</p>
      <p>i miss you alot uh bb.</p>
      <p>i miss being able to just reach over and touch you whenever i want... your cuddles, having you next to me and not having a stupid screen between us.</p>
      <p>okay enough. close this now.</p>
    </div>`
  },

  classified: {
    title: "CLASSIFIED",
    content: `<div class="birthday-pc-file">
      <p class="eyebrow">RESTRICTED FILE</p>
      <h2>ACCESS DENIED</h2>
      <p>clearance level insufficient.</p>
      <p>nice try, Faris.</p>
      <p>maybe theres something else in the room you havent found yet.</p>
    </div>`
  }
};

function openComputerApp(appName) {
  const data = computerAppData[appName];
  if (!data) return;

  computerClick();
  if (startMenu) startMenu.classList.remove("open");

  setComputerWindowMode(appName);
  appTitle.textContent = data.title;
  appContent.innerHTML = data.render ? data.render() : data.content;
  appWindow.classList.add("open");
}

document.querySelectorAll("[data-computer-app]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openComputerApp(button.dataset.computerApp);
  });
});

document.querySelectorAll("[data-app]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const appName = button.dataset.app;
    if (!computerAppData[appName]) return;

    event.stopPropagation();
    setComputerWindowMode(appName);
    appTitle.textContent = computerAppData[appName].title;
    appContent.innerHTML = computerAppData[appName].render
      ? computerAppData[appName].render()
      : computerAppData[appName].content;
    appWindow.classList.add("open");
  });
});

appContent.addEventListener("click", (event) => {
  const explorerButton = event.target.closest("[data-explorer-app]");
  if (explorerButton) {
    openComputerApp(explorerButton.dataset.explorerApp);
    return;
  }

  const photoFolder = event.target.closest("[data-photo-folder]");
  if (photoFolder) {
    const folder = photoFolder.dataset.photoFolder;
    currentPhotoFolder = folder;
    appTitle.textContent = folder === "candid" ? "candid pics i like" : "us";
    appContent.innerHTML = renderPhotoFolder(folder);
    computerClick();
    return;
  }

  const photoButton = event.target.closest("[data-photo-path]");
  if (photoButton) {
    openPhoto(photoButton.dataset.photoCollection, photoButton.dataset.photoIndex);
    return;
  }

  if (event.target.closest("[data-photo-viewer-back]")) {
    if (currentPhotoFolder === "candid" || currentPhotoFolder === "us") {
      appTitle.textContent = currentPhotoFolder === "candid" ? "candid pics i like" : "us";
      appContent.innerHTML = renderPhotoFolder(currentPhotoFolder);
    } else {
      appTitle.textContent = "Pictures";
      appContent.innerHTML = renderPhotosHome();
    }

    computerClick();
    return;
  }

  if (event.target.closest("[data-photo-prev]")) {
    showPreviousPhoto();
    return;
  }

  if (event.target.closest("[data-photo-next]")) {
    showNextPhoto();
    return;
  }

  if (event.target.closest("[data-explorer-back]")) {
    if (currentPhotoFolder === "candid" || currentPhotoFolder === "us") {
      currentPhotoFolder = "photos";
      appTitle.textContent = "Pictures";
      appContent.innerHTML = renderPhotosHome();
      computerClick();
    }
  }
});

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

const searchButton = document.querySelector(".taskbar-search");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    computerClick();
    showComputerToast("Search indexing is taking longer than expected.");
  });
}

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
