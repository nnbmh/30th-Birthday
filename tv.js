(() => {
  const tvModal = document.getElementById("tvModal");
  const tvPower = document.getElementById("tvPower");
  const tvStatic = document.getElementById("tvStatic");
  const tvBroadcast = document.getElementById("tvBroadcast");
  const newsScreen = document.getElementById("newsScreen");
  const newsNextButton = document.getElementById("newsNextButton");
  const newsTickerText = document.getElementById("newsTickerText");
  const birthdayVideo = document.getElementById("birthdayVideo");
  const videoFallback = document.getElementById("videoFallback");

  let currentNewsSlide = 0;
  let tvTimers = [];

  const defaultTicker =
    "FARIS TURNS 30 • SAYANG MONITORING SITUATION FROM 10,827 KM AWAY • MORE TO FOLLOW";

  const newsSlides = [
    {
      ticker: "FARIS TURNS 30 • SAYANG MONITORING SITUATION FROM 10,827 KM AWAY • MORE TO FOLLOW",
      html: `
        <div class="news-slide">
          <span class="news-breaking-tag">BREAKING NEWS</span>
          <h1 class="news-title">FARIS<br>TURNS 30</h1>
          <p class="news-location">LIVE • UNITED KINGDOM</p>
        </div>
      `
    },

    {
      ticker: defaultTicker,
      html: `
        <div class="news-slide">
          <p class="news-kicker">LIVE REPORT</p>
          <p class="news-copy">Good evening.</p>
          <p class="news-copy">We interrupt your regularly scheduled programming with breaking news from the United Kingdom.</p>
          <p class="news-copy">Faris has officially turned 30.</p>
          <p class="news-copy">Sources in Singapore have confirmed that celebrations are underway.</p>
          <p class="news-copy">The birthday boy is reported to be in good spirits.</p>
        </div>
      `
    },

    {
      ticker: "SPECIAL REPORT • INVESTIGATION INTO SUBJECT FARIS NOW UNDERWAY",
      html: `
        <div class="news-slide">
          <p class="news-kicker">SPECIAL REPORT</p>
          <h1 class="news-title small">THE FARIS<br>FILES</h1>
          <p class="news-copy" style="margin-top:28px;">Our investigation into the birthday boy has uncovered several behaviours that experts have described as... uniquely Faris.</p>
        </div>
      `
    },

    {
      ticker: "DEVELOPING • SUBJECT PROFILE RELEASED • FINDINGS DESCRIBED AS UNIQUELY FARIS",
      html: `
        <div class="news-slide">
          <div class="news-card">
            <p class="news-card-title">SUBJECT: FARIS</p>

            <div class="profile-grid">
              <strong>age</strong>
              <span>30</span>

              <strong>location</strong>
              <span>United Kingdom</span>

              <strong>hobbies</strong>
              <span>rock climbing, occasional Dota</span>

              <strong>known weaknesses</strong>
              <span>steak, cheese</span>

              <strong>musical knowledge</strong>
              <span>suspiciously extensive</span>

              <strong>time required to do anything</strong>
              <span>longer than necessary</span>

              <strong>tendency to chew random objects</strong>
              <span>concerning</span>

              <strong>relationship status</strong>
              <span>very taken</span>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "DEVELOPING • RANDOM OBJECTS ADVISED TO REMAIN VIGILANT",
      html: `
        <div class="news-slide">
          <p class="news-kicker">INVESTIGATION CONTINUES</p>

          <p class="news-copy">Investigators remain unable to explain why the subject insists on chewing random objects.</p>

          <p class="news-copy">They have, however, confirmed that he takes approximately three business days to complete a task that should take five minutes.</p>
        </div>
      `
    },

    {
      ticker: "WELFARE UPDATE • FOOD AND HYDRATION STATUS UNDER ACTIVE SUPERVISION",
      html: `
        <div class="news-slide">
          <p class="news-kicker">WELFARE REPORT</p>

          <p class="news-copy">Despite these findings, reports from Singapore suggest Faris regularly conducts important welfare checks on his girlfriend.</p>

          <p class="news-copy">These generally consist of two questions:</p>

          <p class="news-emphasis">“you eat already or not?”</p>
          <p class="news-emphasis">“drink more water.”</p>
        </div>
      `
    },

    {
      ticker: "SAYANG WELFARE PROGRAMME • HYDRATION AGGRESSIVELY MONITORED",
      html: `
        <div class="news-slide">
          <div class="news-card">
            <p class="news-card-title">SAYANG WELFARE PROGRAMME</p>

            <div class="welfare-grid">
              <span>food intake</span>
              <strong>monitored</strong>

              <span>hydration</span>
              <strong>aggressively monitored</strong>

              <span>responsible officer</span>
              <strong>Faris</strong>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "MUSIC INVESTIGATION • IDENTIFICATION RATE DESCRIBED AS ANNOYINGLY HIGH",
      html: `
        <div class="news-slide">
          <p class="news-kicker">MUSIC INVESTIGATION</p>

          <p class="news-copy">Further investigation has revealed an unusual ability.</p>

          <p class="news-copy">Witnesses claim that almost any song can be played in Faris' presence and he will somehow know what it is.</p>

          <p class="news-copy">Experts have yet to determine why his brain has chosen to store this information.</p>

          <p class="news-kicker" style="margin-top:30px;">MUSICAL IDENTIFICATION RATE</p>
          <div class="music-rate">annoyingly high</div>
        </div>
      `
    },

    {
      ticker: "ARCHIVED AUDIO RECOVERED • NO LEGAL ACTION HAS BEEN TAKEN",
      html: `
        <div class="news-slide">
          <p class="news-kicker">ARCHIVED AUDIO TRANSCRIPT</p>

          <div class="music-transcript">
            ♪ Di mana dia, anak baboy saya? ♪<br>
            ♪ Di mana dia, buah hati saya? ♪
          </div>

          <p class="news-copy" style="margin-top:28px;">The performance is believed to be an unauthorised adaptation of <em>Chan Mali Chan</em>.</p>

          <p class="news-copy">No legal action has been taken.</p>
        </div>
      `
    },

    {
      ticker: "DATA DESK • FARIS BY THE NUMBERS • ANALYSIS CONTINUES",
      html: `
        <div class="news-slide">
          <div class="news-card">
            <p class="news-card-title">FARIS BY THE NUMBERS</p>

            <div class="stats-grid">
              <span>countries explored together</span>
              <strong>4</strong>

              <span>distance between Faris & Sayang</span>
              <strong>10,827 km</strong>

              <span>flights Sayang has taken over</span>
              <strong>3</strong>

              <span>Discord calls</span>
              <strong>too many to count</strong>

              <span>calls that somehow became 3–4am</span>
              <strong>more than sensible</strong>

              <span>songs Faris mysteriously knows</span>
              <strong>apparently all of them</strong>

              <span>how often Sayang misses him</span>
              <strong>more than shed like to admit</strong>

              <span>hugs currently owed to Sayang</span>
              <strong>far too many</strong>

              <span>times shes wished he was 10,827 km closer</span>
              <strong>countless</strong>

              <span>likelihood shed fly all that way for him again</span>
              <strong>100%</strong>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "LATE NIGHT REPORT • NEITHER PARTY APPEARS INTERESTED IN LEARNING FROM THIS",
      html: `
        <div class="news-slide">
          <p class="news-kicker">DISTANCE REPORT</p>

          <p class="news-copy">Despite the considerable distance between Singapore and the United Kingdom, sources confirm that the pair continue to spend an unreasonable number of hours together on Discord.</p>

          <p class="news-copy">Some calls have reportedly continued until 3 or 4 in the morning.</p>

          <p class="news-copy">Neither party appears interested in learning from this.</p>
        </div>
      `
    },

    {
      ticker: "BREAKING • SAYANG CAUGHT BEING NICE • INVESTIGATION UNDERWAY",
      html: `
        <div class="news-slide">
          <p class="news-kicker">EXCLUSIVE STATEMENT FROM SINGAPORE</p>

          <div class="quote-card">
            <blockquote>
              “hes annoying uh... but i really love seeing him happy. especially that face he makes when hes genuinely excited abt something and his stupid big smile.<br><br>
              dont tell him i said that.”
            </blockquote>

            <cite>— Sayang</cite>
          </div>

          <p class="news-copy" style="margin-top:26px;">Unfortunately for the source, the statement has now been broadcast internationally.</p>
        </div>
      `
    },

    {
      ticker: "VERIFIED • SUBJECT CONFIRMED TO BE VERY VERY LOVED",
      html: `
        <div class="news-slide">
          <p class="news-kicker">FINAL INVESTIGATIVE FINDING</p>

          <p class="news-copy">Investigators have concluded that while Faris remains difficult to classify, one fact has been independently verified.</p>

          <div class="news-emphasis">He is very, very loved.</div>

          <p class="news-copy" style="margin-top:24px;">Particularly by one woman approximately 10,827 kilometres away.</p>
        </div>
      `
    },

    {
      ticker: "EXCLUSIVE FOOTAGE INCOMING • MATERIAL SUPPLIED BY SINGAPORE CORRESPONDENT",
      html: `
        <div class="news-slide">
          <p class="news-kicker">DEVELOPING</p>

          <p class="news-copy">We are now receiving exclusive footage supplied by our Singapore correspondent.</p>

          <p class="news-copy">The following material concerns the birthday boy directly.</p>

          <div class="news-emphasis">EXCLUSIVE FOOTAGE</div>
          <p class="news-location">FARIS: 30 YEARS IN THE MAKING</p>
          <p class="news-location">footage supplied by Sayang</p>
        </div>
      `
    },

    {
      ticker: "EXCLUSIVE FOOTAGE • FARIS: 30 YEARS IN THE MAKING",
      video: true,
      html: `
        <div class="news-slide">
          <p class="news-kicker">EXCLUSIVE FOOTAGE</p>

          <div class="news-video-stage" id="newsVideoStage"></div>
        </div>
      `
    },

    {
      ticker: "HAPPY BIRTHDAY FARIS • 10,827 KM AWAY BUT NEVER REALLY THAT FAR • SAYANG LOVES YOU • END OF REPORT",
      final: true,
      html: `
        <div class="news-slide news-final">
          <p class="news-kicker">END OF SPECIAL REPORT</p>

          <h1 class="news-title small">HAPPY 30TH<br>BIRTHDAY, FARIS</h1>

          <p class="news-copy" style="margin:28px auto 0;">This concludes our special birthday coverage.</p>

          <p class="news-copy" style="margin:10px auto 0;">Further celebrations are expected throughout the day.</p>

          <div class="news-final-heart">♡</div>
        </div>
      `
    }
  ];

  function clearTVTimers() {
    tvTimers.forEach((timer) => clearTimeout(timer));
    tvTimers = [];
  }

  function renderNewsSlide() {
    const slide = newsSlides[currentNewsSlide];

    newsScreen.scrollTop = 0;
    newsScreen.innerHTML = slide.html;
    newsTickerText.textContent = slide.ticker;

    newsTickerText.style.animation = "none";
    void newsTickerText.offsetWidth;
    newsTickerText.style.animation = "";

    if (slide.video) {
      const stage = document.getElementById("newsVideoStage");

      if (stage) {
        stage.appendChild(birthdayVideo);
        stage.appendChild(videoFallback);
      }

      newsNextButton.textContent = "CONTINUE REPORT";
    } else if (slide.final) {
      newsNextButton.textContent = "RETURN TO ROOM";
    } else {
      newsNextButton.textContent = "NEXT STORY";
    }

    if (typeof window.playTone === "function") {
      window.playTone(360, 0.05, 0.008, "sine");
    }
  }

  function startBirthdayNews() {
    clearTVTimers();
    currentNewsSlide = 0;

    tvPower.className = "tv-power";
    tvStatic.className = "tv-static";
    tvBroadcast.className = "tv-broadcast";

    newsScreen.innerHTML = "";
    newsTickerText.textContent = "";

    const staticTimer = setTimeout(() => {
      tvPower.classList.add("hidden-phase");
      tvStatic.classList.add("active");
    }, 700);

    const broadcastTimer = setTimeout(() => {
      tvStatic.classList.add("hidden-phase");
      tvBroadcast.classList.add("active");

      setTimeout(() => {
        renderNewsSlide();
      }, 220);
    }, 1550);

    tvTimers.push(staticTimer, broadcastTimer);
  }

  newsNextButton.addEventListener("click", () => {
    const slide = newsSlides[currentNewsSlide];

    if (slide.final) {
      tvModal.classList.remove("open");
      tvModal.setAttribute("aria-hidden", "true");

      if (!birthdayVideo.paused) {
        birthdayVideo.pause();
      }

      if (typeof window.clearRoomFocus === "function") {
        window.clearRoomFocus();
      }

      return;
    }

    currentNewsSlide += 1;
    renderNewsSlide();
  });

  const originalRunTVSequence = window.runTVSequence;

  window.runTVSequence = function () {
    startBirthdayNews();
  };

  document.querySelectorAll("#tvModal [data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      clearTVTimers();

      if (!birthdayVideo.paused) {
        birthdayVideo.pause();
      }
    });
  });

  if (birthdayVideo) {
    birthdayVideo.addEventListener("ended", () => {
      newsNextButton.textContent = "CONTINUE REPORT";
    });
  }
})();
