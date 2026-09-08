const loadingScreen =
  document.getElementById("loadingScreen");

const introScreen =
  document.getElementById("introScreen");

const enterButton =
  document.getElementById("enterButton");

const room =
  document.getElementById("room");

const roomImage =
  document.getElementById("roomImage");


/* ============================= */
/* STARTUP */
/* ============================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    loadingScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");

  }, 1900);

});


enterButton.addEventListener("click", () => {

  introScreen.classList.add("hidden");
  room.classList.add("visible");

});


/* ============================= */
/* SUBTLE ROOM MOVEMENT */
/* DESKTOP / TRACKPAD ONLY */
/* ============================= */

if (window.matchMedia("(pointer: fine)").matches) {

  document.addEventListener("mousemove", (event) => {

    if (room.classList.contains("final-reveal-active")) {
      return;
    }

    const x =
      (event.clientX / window.innerWidth - 0.5) * 4;

    const y =
      (event.clientY / window.innerHeight - 0.5) * 3;

    roomImage.style.transform =
      `scale(1.025) translate(${-x}px, ${-y}px)`;

  });

}


/* ============================= */
/* MODALS */
/* ============================= */

const modalMap = {

  computer:
    document.getElementById("computerModal"),

  tv:
    document.getElementById("tvModal"),

  panda:
    document.getElementById("pandaModal"),

  laptop:
    document.getElementById("laptopModal"),

  note:
    document.getElementById("noteModal")

};


const hotspots =
  document.querySelectorAll(".hotspot");


function openHotspot(hotspot) {

  const item =
    hotspot.dataset.item;

  const modal =
    modalMap[item];

  if (!modal) {
    return;
  }

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  markFound(item);
}


/* ============================= */
/* HOTSPOT INTERACTIONS */
/* POINTER EVENTS */
/* ============================= */

hotspots.forEach((hotspot) => {

  hotspot.addEventListener(
    "pointerenter",
    () => {

      hotspot.classList.add("active");

    }
  );


  hotspot.addEventListener(
    "pointerleave",
    () => {

      hotspot.classList.remove("active");

    }
  );


  hotspot.addEventListener(
    "pointerdown",
    () => {

      hotspot.classList.add("active");

    }
  );


  hotspot.addEventListener(
    "pointerup",
    (event) => {

      event.preventDefault();

      hotspot.classList.remove("active");

      openHotspot(hotspot);

    }
  );


  hotspot.addEventListener(
    "pointercancel",
    () => {

      hotspot.classList.remove("active");

    }
  );

});


/* ============================= */
/* CLOSE MODALS */
/* ============================= */

document
  .querySelectorAll("[data-close]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const modal =
        button.closest(".modal");

      if (!modal) {
        return;
      }

      modal.classList.remove("open");

      modal.setAttribute(
        "aria-hidden",
        "true"
      );


      if (
        foundItems.size === 5 &&
        !finalShown
      ) {

        setTimeout(() => {

          startFinalReveal();

        }, 450);

      }

    });

  });


/* ============================= */
/* HELP */
/* ============================= */

const helpButton =
  document.getElementById("helpButton");

const helpModal =
  document.getElementById("helpModal");


helpButton.addEventListener("click", () => {

  helpModal.classList.add("open");

  helpModal.setAttribute(
    "aria-hidden",
    "false"
  );

});


/* ============================= */
/* CLOCK */
/* ============================= */

const computerTime =
  document.getElementById("computerTime");

const taskbarTime =
  document.getElementById("taskbarTime");


function updateClock() {

  const now =
    new Date();

  const time =
    now.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit"
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
/* FOUND ITEMS */
/* ============================= */

const foundItems =
  new Set();

const progressText =
  document.getElementById("progressText");

const progressDots =
  document.querySelectorAll(
    ".progress-dots span"
  );

const finalModal =
  document.getElementById("finalModal");


let finalShown =
  false;


function markFound(item) {

  if (foundItems.has(item)) {
    return;
  }

  foundItems.add(item);

  const count =
    foundItems.size;


  progressText.textContent =
    `${count} / 5 found`;


  progressDots.forEach(
    (dot, index) => {

      if (index < count) {

        dot.classList.add("found");

      }

    }
  );

}


/* ============================= */
/* CINEMATIC FINAL REVEAL */
/* ============================= */

const finalCard =
  finalModal.querySelector(".final-card");

const finalEyebrow =
  finalCard.querySelector(".eyebrow");

const finalHeading =
  finalCard.querySelector("h2");

const finalParagraph =
  finalCard.querySelector("p:not(.eyebrow)");

const openFinalButton =
  document.getElementById(
    "openFinalButton"
  );

const finalLaterButton =
  document.getElementById(
    "finalLaterButton"
  );


function changeFinalText(
  heading,
  paragraph = ""
) {

  finalCard.classList.add(
    "changing"
  );


  setTimeout(() => {

    finalHeading.textContent =
      heading;

    finalParagraph.textContent =
      paragraph;

    finalCard.classList.remove(
      "changing"
    );

  }, 350);

}


function startFinalReveal() {

  if (finalShown) {
    return;
  }

  finalShown = true;


  document
    .querySelectorAll(".modal.open")
    .forEach((modal) => {

      modal.classList.remove("open");

      modal.setAttribute(
        "aria-hidden",
        "true"
      );

    });


  room.classList.add(
    "final-reveal-active"
  );


  roomImage.style.transform =
    "scale(1.035)";


  finalModal.classList.add(
    "open",
    "cinematic"
  );


  finalModal.setAttribute(
    "aria-hidden",
    "false"
  );


  finalEyebrow.textContent =
    "5 / 5 FOUND";


  finalHeading.textContent =
    "you actually found everything...";


  finalParagraph.textContent =
    "";


  openFinalButton.classList.remove(
    "reveal-button-visible"
  );


  setTimeout(() => {

    changeFinalText(
      "of course you did.",
      "nosy."
    );

  }, 1900);


  setTimeout(() => {

    changeFinalText(
      "theres one more thing, sayang."
    );

  }, 3900);


  setTimeout(() => {

    openFinalButton.classList.add(
      "reveal-button-visible"
    );

  }, 5400);

}


/* ============================= */
/* COMPUTER APPS */
/* ============================= */

const appWindow =
  document.getElementById("appWindow");

const appTitle =
  document.getElementById("appTitle");

const appContent =
  document.getElementById("appContent");

const closeApp =
  document.getElementById("closeApp");


const appData = {

  birthday: {

    title:
      "birthday.txt",

    content: `
      <p class="eyebrow">18 SEPTEMBER 2026</p>

      <h2>
        congratulations.
      </h2>

      <p>
        you have successfully completed
        30 years of being Faris.
      </p>

      <p>
        current status:
        <strong>old but still cute.</strong>
      </p>

      <p>
        please proceed with caution.
        joints may begin making noises.
      </p>
    `
  },


  photos: {

    title:
      "photos",

    content: `
      <p class="eyebrow">
        PHOTOS
      </p>

      <h2>
        evidence.
      </h2>

      <p>
        this is where we'll put some of
        your favourite photos later.
      </p>

      <p>
        not an anniversary scrapbook.
        promise.
      </p>
    `
  },


  message: {

    title:
      "message.txt",

    content: `
      <p class="eyebrow">
        FROM: NADHIRA
      </p>

      <h2>
        hi sayang.
      </h2>

      <p>
        i know youre probably clicking
        everything because youre nosy.
      </p>

      <p>
        good.
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
        you havent earned this yet.
      </p>

      <p>
        go explore the room.
      </p>
    `
  }

};


document
  .querySelectorAll(".desktop-icon")
  .forEach((icon) => {

    icon.addEventListener("click", () => {

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

      appWindow.classList.add("open");

    });

  });


closeApp.addEventListener(
  "click",
  () => {

    appWindow.classList.remove("open");

  }
);


/* ============================= */
/* FINAL MESSAGE */
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

    finalModal.classList.remove(
      "open",
      "cinematic"
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


finalLaterButton.addEventListener(
  "click",
  () => {

    finalModal.classList.remove(
      "open",
      "cinematic"
    );

    finalModal.setAttribute(
      "aria-hidden",
      "true"
    );

    room.classList.remove(
      "final-reveal-active"
    );

  }
);


closeBirthdayMessage.addEventListener(
  "click",
  () => {

    birthdayMessage.classList.add(
      "hidden"
    );

    room.classList.remove(
      "final-reveal-active"
    );

  }
);
