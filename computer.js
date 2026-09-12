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

function explorerItem(icon, name, app = "") {
  if (app) return `<button class="explorer-item" data-explorer-app="${app}"><div class="explorer-item-icon">${icon}</div><span>${name}</span></button>`;
  return `<div class="explorer-item"><div class="explorer-item-icon">${icon}</div><span>${name}</span></div>`;
}

function explorerLayout(path, items) {
  return `<div class="explorer-window">
    <div class="explorer-toolbar">
      <span class="explorer-nav">‹ &nbsp; › &nbsp; ↑</span>
      <div class="explorer-path">This PC &nbsp;›&nbsp; ${path}</div>
    </div>
    <h3 class="explorer-heading">${path}</h3>
    <div class="explorer-grid">${items.join("")}</div>
  </div>`;
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

function photoFile(path, name, collection, index) {
  return `<button class="photo-file" data-photo-path="${path}" data-photo-name="${name}" data-photo-collection="${collection}" data-photo-index="${index}">
    <div class="photo-thumbnail"><img src="${path}" alt="${name}" loading="lazy"></div>
    <span>${name}</span>
  </button>`;
}

function photoFolder(name, folder, previewPaths) {
  const previews = previewPaths.slice(0, 4).map((path) => `<img src="${path}" alt="" loading="lazy">`).join("");
  return `<button class="photo-folder" data-photo-folder="${folder}">
    <div class="photo-folder-icon"><div class="photo-folder-preview">${previews}</div></div>
    <span>${name}</span>
  </button>`;
}

function renderPhotosHome() {
  const standalone = standalonePhotos.map((name, index) => photoFile(`assets/photos/${name}`, name, "standalone", index)).join("");
  const candidPreview = candidPhotos.slice(0, 4).map((name) => `assets/photos/candid/${name}`);
  const usPreview = usPhotos.slice(0, 4).map((name) => `assets/photos/us/${name}`);

  return `<div class="explorer-window photo-explorer">
    <div class="explorer-toolbar">
      <span class="explorer-nav">‹ &nbsp; › &nbsp; ↑</span>
      <div class="explorer-path">This PC &nbsp;›&nbsp; Pictures</div>
    </div>
    <div class="photo-section">
      <h3 class="explorer-heading">Folders</h3>
      <div class="photo-folder-grid">
        ${photoFolder("candid pics i like", "candid", candidPreview)}
        ${photoFolder("us", "us", usPreview)}
      </div>
    </div>
    <div class="photo-section">
      <h3 class="explorer-heading">Photos</h3>
      <div class="photo-grid">${standalone}</div>
    </div>
  </div>`;
}

function renderPhotoFolder(folder) {
  const isCandid = folder === "candid";
  const names = isCandid ? candidPhotos : usPhotos;
  const label = isCandid ? "candid pics i like" : "us";
  const base = isCandid ? "assets/photos/candid/" : "assets/photos/us/";
  const photos = names.map((name, index) => photoFile(`${base}${name}`, name, folder, index)).join("");

  return `<div class="explorer-window photo-explorer">
    <div class="explorer-toolbar">
      <button class="photo-back" data-photo-back="home" aria-label="Back to Pictures">‹</button>
      <span class="explorer-nav">› &nbsp; ↑</span>
      <div class="explorer-path">This PC &nbsp;›&nbsp; Pictures &nbsp;›&nbsp; ${label}</div>
    </div>
    <div class="photo-folder-heading">
      <h3>${label}</h3>
      <span>${names.length} items</span>
    </div>
    <div class="photo-grid photo-grid-folder">${photos}</div>
  </div>`;
}

function getPhotoCollection(collection) {
  if (collection === "candid") return candidPhotos.map((name) => ({ name, path: `assets/photos/candid/${name}` }));
  if (collection === "us") return usPhotos.map((name) => ({ name, path: `assets/photos/us/${name}` }));
  return standalonePhotos.map((name) => ({ name, path: `assets/photos/${name}` }));
}

function renderPhotoViewer() {
  const photo = currentPhotoCollection[currentPhotoIndex];
  if (!photo) return;

  const counter = `${currentPhotoIndex + 1} / ${currentPhotoCollection.length}`;
  appContent.innerHTML = `<div class="photo-viewer">
    <div class="photo-viewer-toolbar">
      <button class="photo-viewer-back" data-photo-viewer-back aria-label="Back">‹</button>
      <div class="photo-viewer-title">${photo.name}</div>
      <div class="photo-viewer-counter">${counter}</div>
    </div>
    <div class="photo-viewer-stage">
      <button class="photo-nav photo-nav-prev" data-photo-prev aria-label="Previous photo">‹</button>
      <img src="${photo.path}" alt="${photo.name}">
      <button class="photo-nav photo-nav-next" data-photo-next aria-label="Next photo">›</button>
    </div>
    <div class="photo-viewer-footer">${photo.name}</div>
  </div>`;
}

function openPhoto(path, name, collection, index) {
  currentPhotoCollection = getPhotoCollection(collection);
  currentPhotoIndex = Number(index);
  currentPhotoFolder = collection;
  appTitle.textContent = name;
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
    content: `<div class="explorer-window">
      <div class="explorer-toolbar">
        <span class="explorer-nav">‹ &nbsp; › &nbsp; ↑</span>
        <div class="explorer-path">This PC</div>
      </div>
      <h3 class="explorer-heading">Folders</h3>
      <div class="explorer-grid">
        ${explorerItem("📄", "Documents", "documents")}
        ${explorerItem("⬇️", "Downloads", "downloads")}
        ${explorerItem("🖼️", "Pictures", "photos")}
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
    </div>`
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
    content: `<div class="explorer-window">
      <div class="explorer-toolbar">
        <span class="explorer-nav">‹ &nbsp; › &nbsp; ↑</span>
        <div class="explorer-path">Recycle Bin</div>
      </div>
      <div class="recycle-empty">
        <div class="recycle-empty-icon">🗑️</div>
        <p>This folder is empty.</p>
      </div>
    </div>`
  },

  chrome: {
    title: "Google Chrome",
    content: `<div class="fake-app">
      <div class="fake-app-logo"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="#fff"/><path d="M32 32L9 32A27 27 0 0 1 50 13z" fill="#ea4335"/><path d="M32 32l12 21A27 27 0 0 1 9 32z" fill="#34a853"/><path d="M32 32l18-19A27 27 0 0 1 44 53z" fill="#fbbc05"/><circle cx="32" cy="32" r="11" fill="#4285f4"/></svg></div>
      <h2>Google Chrome</h2>
      <p>Internet access unavailable during birthday maintenance.</p>
    </div>`
  },

  discord: {
    title: "Discord",
    content: `<div class="fake-app">
      <div class="fake-app-logo"><svg viewBox="0 0 64 64"><rect x="6" y="6" width="52" height="52" rx="13" fill="#5865f2"/><path d="M22 22c7-5 13-5 20 0 4 6 6 12 7 19-5 4-9 6-13 7l-2-4c3-1 5-2 7-4-7 4-12 4-19 0 2 2 4 3 7 4l-2 4c-4-1-8-3-13-7 1-7 3-13 8-19z" fill="white"/></svg></div>
      <h2>Discord</h2>
      <p>already enough hours logged here.</p>
    </div>`
  },

  spotify: {
    title: "Spotify",
    content: `<div class="fake-app">
      <div class="fake-app-logo"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="#1ed760"/><path d="M18 25c11-3 24-2 34 3M20 34c9-2 20-1 29 3M22 42c8-1 16 0 23 3" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/></svg></div>
      <h2>Spotify</h2>
      <p>Playback unavailable.</p>
    </div>`
  },

  steam: {
    title: "Steam",
    content: `<div class="fake-app">
      <div class="fake-app-logo"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="#15344c"/><circle cx="42" cy="22" r="9" fill="none" stroke="white" stroke-width="4"/><circle cx="20" cy="42" r="7" fill="none" stroke="white" stroke-width="4"/><path d="M26 39l10-11 8 3" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/></svg></div>
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

  photos: {
    title: "photos",
    content: renderPhotosHome()
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
  appTitle.textContent = data.title;
  appContent.innerHTML = appName === "photos" ? renderPhotosHome() : data.content;
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
    appTitle.textContent = computerAppData[appName].title;
    appContent.innerHTML = appName === "photos" ? renderPhotosHome() : computerAppData[appName].content;
    appWindow.classList.add("open");
  });
});

appContent.addEventListener("click", (event) => {
  const explorerButton = event.target.closest("[data-explorer-app]");
  if (explorerButton) {
    openComputerApp(explorerButton.dataset.explorerApp);
    return;
  }

  const folderButton = event.target.closest("[data-photo-folder]");
  if (folderButton) {
    const folder = folderButton.dataset.photoFolder;
    appTitle.textContent = folder === "candid" ? "candid pics i like" : "us";
    appContent.innerHTML = renderPhotoFolder(folder);
    computerClick();
    return;
  }

  const photoButton = event.target.closest("[data-photo-path]");
  if (photoButton) {
    openPhoto(
      photoButton.dataset.photoPath,
      photoButton.dataset.photoName,
      photoButton.dataset.photoCollection,
      photoButton.dataset.photoIndex
    );
    return;
  }

  if (event.target.closest("[data-photo-back]")) {
    appTitle.textContent = "photos";
    appContent.innerHTML = renderPhotosHome();
    computerClick();
    return;
  }

  if (event.target.closest("[data-photo-viewer-back]")) {
    if (currentPhotoFolder === "candid" || currentPhotoFolder === "us") {
      appTitle.textContent = currentPhotoFolder === "candid" ? "candid pics i like" : "us";
      appContent.innerHTML = renderPhotoFolder(currentPhotoFolder);
    } else {
      appTitle.textContent = "photos";
      appContent.innerHTML = renderPhotosHome();
    }
    computerClick();
    return;
  }

  if (event.target.closest("[data-photo-prev]")) {
    showPreviousPhoto();
    return;
  }

  if (event.target.closest("[data-photo-next]")) showNextPhoto();
});

if (startButton && startMenu) {
  startButton.addEventListener("click", (event) => {
    event.stopPropagation();
    computerClick();
    startMenu.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!startMenu.contains(event.target) && event.target !== startButton) startMenu.classList.remove("open");
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
