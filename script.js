const loadingScreen =
  document.getElementById(
    "loadingScreen"
  );

const introScreen =
  document.getElementById(
    "introScreen"
  );

const enterButton =
  document.getElementById(
    "enterButton"
  );

const room =
  document.getElementById(
    "room"
  );

const roomImage =
  document.getElementById(
    "roomImage"
  );

const focusTransition =
  document.getElementById(
    "focusTransition"
  );


/* ============================= */
/* SOUND */
/* ============================= */

let audioContext = null;

let soundEnabled = true;


const soundButton =
  document.getElementById(
    "soundButton"
  );


function initAudio() {

  if (!audioContext) {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (AudioContext) {

      audioContext =
        new AudioContext();

    }

  }


  if (
    audioContext &&
    audioContext.state ===
      "suspended"
  ) {

    audioContext.resume();

  }

}


function playTone(
  frequency = 440,
  duration = 0.08,
  volume = 0.025,
  type = "sine",
  delay = 0
) {

  if (
    !soundEnabled ||
    !audioContext
  ) {
    return;
  }


  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();


  oscillator.type =
    type;

  oscillator.frequency.value =
    frequency;


  const start =
    audioContext.currentTime +
    delay;


  gain.gain.setValueAtTime(
    0,
    start
  );

  gain.gain.linearRampToValueAtTime(
    volume,
    start + 0.015
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    start + duration
  );


  oscillator.connect(
    gain
  );

  gain.connect(
    audioContext.destination
  );


  oscillator.start(
    start
  );

  oscillator.stop(
    start + duration + 0.02
  );

}


function playClick() {

  playTone(
    620,
    0.05,
    0.018,
    "sine"
  );

}


function playComputerSound() {

  playTone(
    220,
    0.1,
    0.02,
    "sine"
  );

  playTone(
    370,
    0.12,
    0.018,
    "sine",
    0.07
  );

  playTone(
    530,
    0.18,
    0.015,
    "sine",
    0.15
  );

}


function playTVSound() {

  playTone(
    90,
    0.07,
    0.03,
    "square"
  );

}


function playTypingSound() {

  playTone(
    760 +
      Math.random() * 130,
    0.025,
    0.006,
    "square"
  );

}


function playFoundSound(
  count
) {

  const frequency =
    360 +
    count * 75;

  playTone(
    frequency,
    0.1,
    0.018,
    "sine"
  );

}


function playFinalChime() {

  playTone(
    330,
    0.8,
    0.022,
    "sine"
  );

  playTone(
    440,
    0.9,
    0.02,
    "sine",
    0.22
  );

  playTone(
    660,
    1.1,
    0.018,
    "sine",
    0.5
  );

}


soundButton.addEventListener(
  "click",
  () => {

    initAudio();

    soundEnabled =
      !soundEnabled;


    if (soundEnabled) {

      soundButton.textContent =
        "◉ sound on";

      soundButton.classList.remove(
        "muted"
      );

      playClick();

    } else {

      soundButton.textContent =
        "○ sound off";

      soundButton.classList.add(
        "muted"
      );

    }

  }
);


/* ============================= */
/* STARTUP */
/* ============================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        loadingScreen.classList.add(
          "hidden"
        );

        introScreen.classList.remove(
          "hidden"
        );

      },
      1500
    );

  }
);


enterButton.addEventListener(
  "click",
  () => {

    initAudio();

    playTone(
      250,
      0.12,
      0.02,
      "sine"
    );

    playTone(
      410,
      0.28,
      0.012,
      "sine",
      0.08
    );


    introScreen.classList.add(
      "hidden"
    );

    room.classList.add(
      "visible"
    );

  }
);


/* ============================= */
/* DESKTOP ROOM MOVEMENT */
/* ============================= */

if (
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  document.addEventListener(
    "mousemove",
    (event) => {

      if (
        room.classList.contains(
          "final-reveal-active"
        )
      ) {
        return;
      }


      if (
        room.classList.contains(
          "focus-computer"
        ) ||
        room.classList.contains(
          "focus-tv"
        ) ||
        room.classList.contains(
          "focus-laptop"
        ) ||
        room.classList.contains(
          "focus-panda"
        ) ||
        room.classList.contains(
          "focus-note"
        )
      ) {
        return;
      }


      const x =
        (
          event.clientX /
          window.innerWidth -
          0.5
        ) * 4;


      const y =
        (
          event.clientY /
          window.innerHeight -
          0.5
        ) * 3;


      roomImage.style.transform =
        `scale(1.025) translate(${-x}px, ${-y}px)`;

    }
  );

}


/* ============================= */
/* MODALS */
/* ============================= */

const modalMap = {

  computer:
    document.getElementById(
      "computerModal"
    ),

  tv:
    document.getElementById(
      "tvModal"
    ),

  panda:
    document.getElementById(
      "pandaModal"
    ),

  laptop:
    document.getElementById(
      "laptopModal"
    ),

  note:
    document.getElementById(
      "noteModal"
    )

};


const hotspots =
  document.querySelectorAll(
    ".hotspot"
  );


let openingHotspot =
  false;


/* ============================= */
/* RESET ROOM FOCUS */
/* ============================= */

function clearRoomFocus() {

  room.classList.remove(
    "focus-computer",
    "focus-tv",
    "focus-laptop",
    "focus-panda",
    "focus-note"
  );


  roomImage.style.transform =
    "";

}


/* ============================= */
/* OPEN HOTSPOT */
/* FAST TRANSITION */
/* ============================= */

function openHotspot(
  hotspot
) {

  if (openingHotspot) {
    return;
  }


  const item =
    hotspot.dataset.item;


  const modal =
    modalMap[item];


  if (!modal) {
    return;
  }


  openingHotspot =
    true;


  initAudio();

  playClick();


  room.classList.add(
    `focus-${item}`
  );


  focusTransition.classList.add(
    "active"
  );


  if (
    item === "computer"
  ) {

    playComputerSound();

  }


  if (
    item === "tv"
  ) {

    playTVSound();

  }


  /*
    BEFORE: 520ms
    NOW: 220ms

    Enough time to see the focus effect,
    but the object opens almost immediately.
  */

  setTimeout(
    () => {

      modal.classList.add(
        "open"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );


      markFound(
        item
      );


      runModalExperience(
        item
      );


      clearRoomFocus();


      focusTransition.classList.remove(
        "active"
      );


      openingHotspot =
        false;

    },
    220
  );

}


/* ============================= */
/* HOTSPOT POINTER EVENTS */
/* KEEP THIS LOGIC */
/* ============================= */

hotspots.forEach(
  (hotspot) => {

    hotspot.addEventListener(
      "pointerenter",
      () => {

        hotspot.classList.add(
          "active"
        );

      }
    );


    hotspot.addEventListener(
      "pointerleave",
      () => {

        hotspot.classList.remove(
          "active"
        );

      }
    );


    hotspot.addEventListener(
      "pointerdown",
      () => {

        hotspot.classList.add(
          "active"
        );

      }
    );


    hotspot.addEventListener(
      "pointerup",
      (event) => {

        event.preventDefault();


        hotspot.classList.remove(
          "active"
        );


        openHotspot(
          hotspot
        );

      }
    );


    hotspot.addEventListener(
      "pointercancel",
      () => {

        hotspot.classList.remove(
          "active"
        );

      }
    );

  }
);


/* ============================= */
/* INDIVIDUAL EXPERIENCES */
/* ============================= */

function runModalExperience(
  item
) {

  if (
    item === "computer"
  ) {

    runComputerBoot();

  }


  if (
    item === "tv"
  ) {

    runTVSequence();

  }


  if (
    item === "laptop"
  ) {

    runAIConversation();

  }


  if (
    item === "panda"
  ) {

    resetPanda();

  }

}


/* ============================= */
/* COMPUTER BOOT */
/* FASTER */
/* ============================= */

const computerBoot =
  document.getElementById(
    "computerBoot"
  );


function runComputerBoot() {

  computerBoot.classList.remove(
    "finished"
  );


  /*
    BEFORE: 1750ms
    NOW: 700ms
  */

  setTimeout(
    () => {

      computerBoot.classList.add(
        "finished"
      );

    },
    700
  );

}


/* ============================= */
/* TV SEQUENCE */
/* FASTER */
/* ============================= */

const tvPower =
  document.getElementById(
    "tvPower"
  );

const tvStatic =
  document.getElementById(
    "tvStatic"
  );

const tvBroadcast =
  document.getElementById(
    "tvBroadcast"
  );


function runTVSequence() {

  tvPower.className =
    "tv-power";

  tvStatic.className =
    "tv-static";

  tvBroadcast.className =
    "tv-broadcast";


  /*
    brief black screen
  */

  setTimeout(
    () => {

      tvPower.classList.add(
        "hidden-phase"
      );

      tvStatic.classList.add(
        "active"
      );


      playTone(
        85,
        0.06,
        0.015,
        "square"
      );

    },
    180
  );


  /*
    BEFORE broadcast appeared after 1750ms.
    Now it appears after 650ms.
  */

  setTimeout(
    () => {

      tvStatic.classList.add(
        "hidden-phase"
      );

      tvBroadcast.classList.add(
        "active"
      );


      playTone(
        410,
        0.16,
        0.016,
        "sine"
      );

    },
    650
  );

}


/* ============================= */
/* VIDEO DETECTION */
/* ============================= */

const birthdayVideo =
  document.getElementById(
    "birthdayVideo"
  );

const videoFallback =
  document.getElementById(
    "videoFallback"
  );


birthdayVideo.addEventListener(
  "loadedmetadata",
  () => {

    birthdayVideo.classList.add(
      "ready"
    );

    videoFallback.classList.add(
      "video-ready"
    );

  }
);


/* ============================= */
/* AI CONVERSATION */
/* FASTER PACING */
/* ============================= */

const aiConversation =
  document.getElementById(
    "aiConversation"
  );

const aiRevealMessages =
  document.querySelectorAll(
    ".reveal-message"
  );


let aiTimers =
  [];


const aiFastDelays = [
  250,
  650,
  1050,
  1500,
  2000,
  2550,
  3150
];


function runAIConversation() {

  aiTimers.forEach(
    (timer) => {

      clearTimeout(
        timer
      );

    }
  );


  aiTimers = [];


  aiRevealMessages.forEach(
    (message) => {

      message.classList.remove(
        "revealed"
      );

    }
  );


  aiConversation.scrollTop =
    0;


  aiRevealMessages.forEach(
    (message, index) => {

      const delay =
        aiFastDelays[index] ??
        (
          250 +
          index * 450
        );


      const timer =
        setTimeout(
          () => {

            message.classList.add(
              "revealed"
            );


            playTypingBurst();


            setTimeout(
              () => {

                aiConversation.scrollTo(
                  {
                    top:
                      aiConversation.scrollHeight,

                    behavior:
                      "smooth"
                  }
                );

              },
              50
            );

          },
          delay
        );


      aiTimers.push(
        timer
      );

    }
  );

}


function playTypingBurst() {

  if (!soundEnabled) {
    return;
  }


  for (
    let i = 0;
    i < 3;
    i++
  ) {

    setTimeout(
      () => {

        playTypingSound();

      },
      i * 35
    );

  }

}


/* ============================= */
/* PANDA DELIVERY */
/* ============================= */

const openPandaDelivery =
  document.getElementById(
    "openPandaDelivery"
  );

const pandaMessage =
  document.getElementById(
    "pandaMessage"
  );

const playPandaAudio =
  document.getElementById(
    "playPandaAudio"
  );

const pandaAudio =
  document.getElementById(
    "pandaAudio"
  );

const pandaAudioStatus =
  document.getElementById(
    "pandaAudioStatus"
  );


function resetPanda() {

  pandaMessage.classList.add(
    "hidden"
  );

  openPandaDelivery.classList.remove(
    "hidden"
  );

}


openPandaDelivery.addEventListener(
  "click",
  () => {

    playClick();


    openPandaDelivery.classList.add(
      "hidden"
    );

    pandaMessage.classList.remove(
      "hidden"
    );


    playTone(
      520,
      0.1,
      0.015,
      "sine"
    );

    playTone(
      690,
      0.14,
      0.013,
      "sine",
      0.08
    );

  }
);


playPandaAudio.addEventListener(
  "click",
  async () => {

    try {

      await pandaAudio.play();


      pandaAudioStatus.textContent =
        "playing message from sayang ♡";


      playPandaAudio.textContent =
        "playing...";

    } catch {

      pandaAudioStatus.textContent =
        "no recording uploaded yet... add assets/panda-message.m4a later";

    }

  }
);


pandaAudio.addEventListener(
  "ended",
  () => {

    playPandaAudio.textContent =
      "play again";

  }
);


/* ============================= */
/* CLOSE MODALS */
/* ============================= */

document
  .querySelectorAll(
    "[data-close]"
  )
  .forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const modal =
            button.closest(
              ".modal"
            );


          if (!modal) {
            return;
          }


          playClick();


          modal.classList.remove(
            "open"
          );


          modal.setAttribute(
            "aria-hidden",
            "true"
          );


          if (
            birthdayVideo &&
            !birthdayVideo.paused
          ) {

            birthdayVideo.pause();

          }


          if (
            pandaAudio &&
            !pandaAudio.paused
          ) {

            pandaAudio.pause();

          }


          clearRoomFocus();


          /*
            Slightly faster transition into
            final 5/5 reveal too.
          */

          if (
            foundItems.size === 5 &&
            !finalShown
          ) {

            setTimeout(
              () => {

                startFinalReveal();

              },
              350
            );

          }

        }
      );

    }
  );


/* ============================= */
/* HELP */
/* ============================= */

const helpButton =
  document.getElementById(
    "helpButton"
  );

const helpModal =
  document.getElementById(
    "helpModal"
  );


helpButton.addEventListener(
  "click",
  () => {

    playClick();


    helpModal.classList.add(
      "open"
    );

    helpModal.setAttribute(
      "aria-hidden",
      "false"
    );

  }
);


/* ============================= */
/* CLOCK */
/* ============================= */

const computerTime =
  document.getElementById(
    "computerTime"
  );

const taskbarTime =
  document.getElementById(
    "taskbarTime"
  );


function updateClock() {

  const now =
    new Date();


  const time =
    now.toLocaleTimeString(
      [],
      {
        hour:
          "2-digit",

        minute:
          "2-digit"
      }
    );


  computerTime.textContent =
    time;

  taskbarTime.textContent =
    time;

}


updateClock();


setInterval(
  updateClock,
  30000
);


/* ============================= */
/* DISCOVERIES */
/* ============================= */

const foundItems =
  new Set();


const progressText =
  document.getElementById(
    "progressText"
  );


const progressDots =
  document.querySelectorAll(
    ".progress-dots span"
  );


function markFound(
  item
) {

  if (
    foundItems.has(
      item
    )
  ) {
    return;
  }


  foundItems.add(
    item
  );


  const count =
    foundItems.size;


  progressText.textContent =
    `${count} / 5 found`;


  progressDots.forEach(
    (
      dot,
      index
    ) => {

      if (
        index < count
      ) {

        dot.classList.add(
          "found"
        );

      }

    }
  );


  playFoundSound(
    count
  );

}


/* ============================= */
/* COMPUTER APPS */
/* ============================= */

const appWindow =
  document.getElementById(
    "appWindow"
  );


const appTitle =
  document.getElementById(
    "appTitle"
  );


const appContent =
  document.getElementById(
    "appContent"
  );


const closeApp =
  document.getElementById(
    "closeApp"
  );


const appData = {

  birthday: {

    title:
      "birthday.txt",

    content: `
      <p class="eyebrow">
        SYSTEM RECORD
      </p>

      <h2>
        30 years detected.
      </h2>

      <p>
        congratulations.
        you have successfully completed
        thirty years of being Faris.
      </p>

      <p>
        current condition:
        <strong>
          old but still cute.
        </strong>
      </p>

      <p>
        estimated warranty:
        questionable.
      </p>

      <p>
        girlfriend recommendation:
        keep.
      </p>
    `

  },


  photos: {

    title:
      "photos",

    content: `
      <p class="eyebrow">
        PHOTO ARCHIVE
      </p>

      <h2>
        evidence.
      </h2>

      <p>
        photos are going here later.
      </p>

      <p>
        before you say anything...
        no, this is not secretly
        an anniversary scrapbook.
      </p>

      <p>
        this one is about you.
      </p>
    `

  },


  message: {

    title:
      "message.txt",

    content: `
      <p class="eyebrow">
        FROM NADHIRA
      </p>

      <h2>
        hi sayang.
      </h2>

      <p>
        i know youre probably clicking
        absolutely everything because
        youre nosy.
      </p>

      <p>
        which is exactly what i expected.
      </p>

      <p>
        keep going.
      </p>

      <p>
        theres more.
      </p>
    `

  },


  classified: {

    title:
      "CLASSIFIED",

    content: `
      <p class="eyebrow">
        RESTRICTED FILE
      </p>

      <h2>
        ACCESS DENIED
      </h2>

      <p>
        nice try.
      </p>

      <p>
        you havent unlocked this yet.
      </p>

      <p>
        go back to the room,
        detective.
      </p>
    `

  }

};


document
  .querySelectorAll(
    ".desktop-icon"
  )
  .forEach(
    (icon) => {

      icon.addEventListener(
        "click",
        () => {

          playClick();


          const app =
            icon.dataset.app;


          const data =
            appData[app];


          if (!data) {
            return;
          }


          appTitle.textContent =
            data.title;


          appContent.innerHTML =
            data.content;


          appWindow.classList.add(
            "open"
          );

        }
      );

    }
  );


closeApp.addEventListener(
  "click",
  () => {

    playClick();


    appWindow.classList.remove(
      "open"
    );

  }
);


/* ============================= */
/* FINAL REVEAL */
/* ============================= */

const finalModal =
  document.getElementById(
    "finalModal"
  );


const finalCounter =
  document.getElementById(
    "finalCounter"
  );


const finalHeading =
  document.getElementById(
    "finalHeading"
  );


const finalSubtext =
  document.getElementById(
    "finalSubtext"
  );


const openFinalButton =
  document.getElementById(
    "openFinalButton"
  );


let finalShown =
  false;


function swapFinalText(
  heading,
  subtext = ""
) {

  finalHeading.classList.add(
    "fade"
  );

  finalSubtext.classList.remove(
    "visible"
  );


  setTimeout(
    () => {

      finalHeading.textContent =
        heading;

      finalSubtext.textContent =
        subtext;


      finalHeading.classList.remove(
        "fade"
      );

      finalHeading.classList.add(
        "visible"
      );


      if (subtext) {

        finalSubtext.classList.add(
          "visible"
        );

      }

    },
    380
  );

}


function startFinalReveal() {

  if (finalShown) {
    return;
  }


  finalShown =
    true;


  document
    .querySelectorAll(
      ".modal.open"
    )
    .forEach(
      (modal) => {

        modal.classList.remove(
          "open"
        );

      }
    );


  appWindow.classList.remove(
    "open"
  );


  room.classList.add(
    "final-reveal-active"
  );


  playTone(
    110,
    1.2,
    0.018,
    "sine"
  );


  setTimeout(
    () => {

      room.classList.add(
        "final-lights"
      );

    },
    650
  );


  setTimeout(
    () => {

      finalModal.classList.add(
        "open"
      );

      finalModal.setAttribute(
        "aria-hidden",
        "false"
      );

    },
    900
  );


  setTimeout(
    () => {

      finalCounter.classList.add(
        "visible"
      );

    },
    1200
  );


  setTimeout(
    () => {

      finalHeading.textContent =
        "you actually found everything...";

      finalHeading.classList.add(
        "visible"
      );


      playFinalChime();

    },
    1550
  );


  setTimeout(
    () => {

      swapFinalText(
        "of course you did.",
        "nosy."
      );

    },
    3500
  );


  setTimeout(
    () => {

      swapFinalText(
        "theres one more thing, sayang."
      );

    },
    5450
  );


  setTimeout(
    () => {

      openFinalButton.classList.add(
        "visible"
      );

    },
    6900
  );

}


/* ============================= */
/* FINAL LETTER */
/* ============================= */

const birthdayMessage =
  document.getElementById(
    "birthdayMessage"
  );


const closeBirthdayMessage =
  document.getElementById(
    "closeBirthdayMessage"
  );


openFinalButton.addEventListener(
  "click",
  () => {

    playTone(
      440,
      0.45,
      0.018,
      "sine"
    );

    playTone(
      660,
      0.7,
      0.015,
      "sine",
      0.2
    );


    finalModal.classList.remove(
      "open"
    );


    finalModal.setAttribute(
      "aria-hidden",
      "true"
    );


    birthdayMessage.classList.remove(
      "hidden"
    );

  }
);


closeBirthdayMessage.addEventListener(
  "click",
  () => {

    birthdayMessage.classList.add(
      "hidden"
    );

  }
);
