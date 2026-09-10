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

  /* BBN BRAND OVERRIDE */
  const bbnStyle = document.createElement("style");
  bbnStyle.textContent = `
    .studio-background::after {
      content: "BBN" !important;
    }
  `;
  document.head.appendChild(bbnStyle);

  const slides = [
    {
      ticker: "BBN NEWS • FARIS TURNS 30 • SAYANG MONITORING SITUATION FROM 10,827 KM AWAY • BIRTHDAY BOY REPORTED TO BE IN GOOD SPIRITS • LIVE FROM THE UNITED KINGDOM • BBN NEWS • FARIS TURNS 30 • SAYANG MONITORING SITUATION FROM 10,827 KM AWAY",
      html: `
        <div class="news-slide">
          <div class="broadcast-scene">
            <div class="studio-background"></div>

            <div class="anchor-zone">
              <div class="anchor-silhouette">
                <div class="anchor-head"></div>
                <div class="anchor-body"></div>
              </div>
            </div>

            <div class="studio-side-panel">
              <p class="small-label">LIVE • UNITED KINGDOM</p>
              <h2>FARIS TURNS 30</h2>
              <p>Celebrations are underway as the birthday boy officially enters his thirties.</p>
            </div>

            <div class="lower-third">
              <div class="lower-breaking">BREAKING NEWS</div>
              <div class="lower-main">
                <h1>FARIS TURNS 30</h1>
              </div>
              <div class="lower-sub">Celebrations underway in the United Kingdom</div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN NEWS • FARIS TURNS 30 • BIRTHDAY BOY REPORTED TO BE IN GOOD SPIRITS • SOURCES IN SINGAPORE CONFIRM CELEBRATIONS • LIVE FROM THE UNITED KINGDOM • BBN NEWS • FARIS TURNS 30",
      html: `
        <div class="news-slide">
          <div class="broadcast-scene">
            <div class="studio-background"></div>

            <div class="anchor-zone">
              <div class="anchor-silhouette">
                <div class="anchor-head"></div>
                <div class="anchor-body"></div>
              </div>
              <div class="anchor-label">BBN NEWSROOM • LIVE</div>
            </div>

            <div class="studio-side-panel">
              <p class="small-label">BREAKING NEWS</p>
              <h2>Birthday celebrations underway</h2>
              <p>We interrupt your regularly scheduled programming with breaking news from the United Kingdom.</p>
              <p>Faris has officially turned 30.</p>
            </div>

            <div class="lower-third">
              <div class="lower-breaking">LIVE</div>
              <div class="lower-main">
                <h1>Faris officially turns 30</h1>
              </div>
              <div class="lower-sub">Sources in Singapore confirm celebrations are underway</div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN SPECIAL REPORT • THE FARIS FILES • INVESTIGATION INTO BIRTHDAY SUBJECT NOW UNDERWAY • EXPERTS DESCRIBE FINDINGS AS UNIQUELY FARIS • BBN SPECIAL REPORT • THE FARIS FILES",
      html: `
        <div class="news-slide">
          <div class="news-package">
            <span class="package-kicker">SPECIAL REPORT</span>
            <h1 class="package-title">THE FARIS FILES</h1>

            <p class="package-copy">
              Our investigation into the birthday boy has uncovered several behaviours that experts have described as... uniquely Faris.
            </p>

            <div class="lower-third">
              <div class="lower-breaking">BBN INVESTIGATION</div>
              <div class="lower-main">
                <h1>The Faris Files</h1>
              </div>
              <div class="lower-sub">Investigators examine unusual behaviour of birthday subject</div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN NEWS • SUBJECT PROFILE RELEASED • FARIS, 30, UNITED KINGDOM • MUSICAL KNOWLEDGE SUSPICIOUSLY EXTENSIVE • RELATIONSHIP STATUS CONFIRMED AS VERY TAKEN • BBN NEWS",
      html: `
        <div class="news-slide">
          <div class="profile-package">
            <div class="subject-visual">
              <span class="subject-status">SUBJECT IDENTIFIED</span>

              <div class="subject-name">
                <strong>FARIS</strong>
                <span>United Kingdom • Age 30</span>
              </div>
            </div>

            <div class="profile-data">
              <h2>SUBJECT PROFILE</h2>

              <div class="profile-row"><strong>age</strong><span>30</span></div>
              <div class="profile-row"><strong>location</strong><span>United Kingdom</span></div>
              <div class="profile-row"><strong>hobbies</strong><span>rock climbing, occasional Dota</span></div>
              <div class="profile-row"><strong>known weaknesses</strong><span>steak, cheese</span></div>
              <div class="profile-row"><strong>musical knowledge</strong><span>suspiciously extensive</span></div>
              <div class="profile-row"><strong>time required to do anything</strong><span>longer than necessary</span></div>
              <div class="profile-row"><strong>chewing random objects</strong><span>concerning</span></div>
              <div class="profile-row"><strong>relationship status</strong><span>very taken</span></div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN DEVELOPING • RANDOM OBJECTS ADVISED TO REMAIN VIGILANT • INVESTIGATORS UNABLE TO EXPLAIN CHEWING BEHAVIOUR • SIMPLE TASKS REPORTEDLY TAKING THREE BUSINESS DAYS • BBN DEVELOPING",
      html: `
        <div class="news-slide">
          <div class="news-package">
            <span class="package-kicker">DEVELOPING STORY</span>
            <h1 class="package-title">Random objects remain at risk</h1>

            <p class="package-copy">
              Investigators remain unable to explain why the subject insists on chewing random objects.
            </p>

            <p class="package-copy">
              They have, however, confirmed that he takes approximately three business days to complete a task that should take five minutes.
            </p>

            <div class="lower-third">
              <div class="lower-breaking">DEVELOPING</div>
              <div class="lower-main">
                <h1>Investigation continues</h1>
              </div>
              <div class="lower-sub">Random objects advised to remain vigilant</div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN NEWS • SAYANG WELFARE CHECKS CONTINUE • FOOD INTAKE MONITORED • HYDRATION AGGRESSIVELY MONITORED • RESPONSIBLE OFFICER IDENTIFIED AS FARIS • BBN NEWS",
      html: `
        <div class="news-slide">
          <div class="news-package">
            <span class="package-kicker">WELFARE REPORT</span>

            <p class="package-copy">
              Despite these findings, reports from Singapore suggest Faris regularly conducts important welfare checks on his girlfriend.
            </p>

            <p class="package-copy">
              These generally consist of two questions:
            </p>

            <div class="big-quote">“you eat already or not?”</div>
            <div class="big-quote">“drink more water.”</div>

            <div class="lower-third">
              <div class="lower-breaking">BBN REPORT</div>
              <div class="lower-main">
                <h1>Sayang welfare checks continue</h1>
              </div>
              <div class="lower-sub">Food intake and hydration remain under supervision</div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN DATA • SAYANG WELFARE PROGRAMME • FOOD INTAKE MONITORED • HYDRATION AGGRESSIVELY MONITORED • RESPONSIBLE OFFICER: FARIS • BBN DATA • SAYANG WELFARE PROGRAMME",
      html: `
        <div class="news-slide">
          <div class="info-board">
            <h2>SAYANG WELFARE PROGRAMME</h2>

            <div class="info-row">
              <span>food intake</span>
              <strong>monitored</strong>
            </div>

            <div class="info-row">
              <span>hydration</span>
              <strong>aggressively monitored</strong>
            </div>

            <div class="info-row">
              <span>responsible officer</span>
              <strong>Faris</strong>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN CULTURE • MUSICAL IDENTIFICATION RATE DESCRIBED AS ANNOYINGLY HIGH • WITNESSES SAY SUBJECT SOMEHOW KNOWS ALMOST EVERY SONG • EXPERTS BAFFLED • BBN CULTURE",
      html: `
        <div class="news-slide">
          <div class="music-card">
            <span class="package-kicker">MUSIC INVESTIGATION</span>
            <h2>Unusual ability identified</h2>

            <p>
              Witnesses claim that almost any song can be played in Faris' presence and he will somehow know what it is.
            </p>

            <p>
              Experts have yet to determine why his brain has chosen to store this information.
            </p>

            <div class="music-rate">annoyingly high</div>
          </div>

          <div class="lower-third">
            <div class="lower-breaking">ANALYSIS</div>
            <div class="lower-main">
              <h1>Musical identification rate</h1>
            </div>
            <div class="lower-sub">Experts describe ability as suspiciously extensive</div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN ARCHIVE • PREVIOUSLY UNHEARD AUDIO RECOVERED • UNAUTHORISED CHAN MALI CHAN ADAPTATION UNDER REVIEW • NO LEGAL ACTION HAS BEEN TAKEN • BBN ARCHIVE",
      html: `
        <div class="news-slide">
          <div class="music-card">
            <span class="package-kicker">ARCHIVED AUDIO TRANSCRIPT</span>

            <div class="music-transcript">
              ♪ Di mana dia, anak baboy saya? ♪<br>
              ♪ Di mana dia, buah hati saya? ♪
            </div>

            <p>
              The performance is believed to be an unauthorised adaptation of <em>Chan Mali Chan</em>.
            </p>

            <p>No legal action has been taken.</p>
          </div>

          <div class="lower-third">
            <div class="lower-breaking">BBN ARCHIVE</div>
            <div class="lower-main">
              <h1>Previously unheard material recovered</h1>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN DATA DESK • FARIS BY THE NUMBERS • 10,827 KM BETWEEN FARIS AND SAYANG • 3 FLIGHTS TAKEN OVER • DISCORD CALLS TOO MANY TO COUNT • LIKELIHOOD SAYANG FLIES OVER AGAIN: 100% • BBN DATA DESK",
      html: `
        <div class="news-slide">
          <div class="info-board">
            <h2>FARIS BY THE NUMBERS</h2>

            <div class="info-row"><span>countries explored together</span><strong>4</strong></div>
            <div class="info-row"><span>distance between Faris & Sayang</span><strong>10,827 km</strong></div>
            <div class="info-row"><span>flights Sayang has taken over</span><strong>3</strong></div>
            <div class="info-row"><span>Discord calls</span><strong>too many to count</strong></div>
            <div class="info-row"><span>calls that became 3–4am</span><strong>more than sensible</strong></div>
            <div class="info-row"><span>songs Faris mysteriously knows</span><strong>apparently all of them</strong></div>
            <div class="info-row"><span>how often Sayang misses him</span><strong>more than shed like to admit</strong></div>
            <div class="info-row"><span>hugs currently owed</span><strong>far too many</strong></div>
            <div class="info-row"><span>wishes he was 10,827 km closer</span><strong>countless</strong></div>
            <div class="info-row"><span>likelihood shed fly over again</span><strong>100%</strong></div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN LATE NIGHT • DISCORD CALLS REPORTEDLY CONTINUE UNTIL 3 OR 4AM • NEITHER PARTY APPEARS INTERESTED IN LEARNING FROM THIS • DISTANCE REMAINS 10,827 KM • BBN LATE NIGHT",
      html: `
        <div class="news-slide">
          <div class="broadcast-scene">
            <div class="studio-background"></div>

            <div class="studio-side-panel">
              <p class="small-label">DISTANCE REPORT</p>
              <h2>10,827 km apart</h2>

              <p>
                Sources confirm that the pair continue to spend an unreasonable number of hours together on Discord.
              </p>

              <p>
                Some calls have reportedly continued until 3 or 4 in the morning.
              </p>
            </div>

            <div class="lower-third">
              <div class="lower-breaking">LIVE</div>
              <div class="lower-main">
                <h1>Neither party learns from this</h1>
              </div>
              <div class="lower-sub">Late-night Discord calls continue despite considerable distance</div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN EXCLUSIVE • SAYANG CAUGHT BEING NICE • INVESTIGATION UNDERWAY • SOURCE ADMITS SHE LOVES SEEING FARIS GENUINELY HAPPY • STATEMENT BROADCAST INTERNATIONALLY • BBN EXCLUSIVE",
      html: `
        <div class="news-slide">
          <div class="statement-layout">
            <span class="statement-tag">EXCLUSIVE STATEMENT FROM SINGAPORE</span>

            <blockquote>
              “hes annoying uh... but i really love seeing him happy. especially that face he makes when hes genuinely excited abt something and his stupid big smile.<br><br>
              dont tell him i said that.”
            </blockquote>

            <cite>— Sayang</cite>
          </div>

          <div class="lower-third">
            <div class="lower-breaking">BBN EXCLUSIVE</div>
            <div class="lower-main">
              <h1>Sayang caught being nice</h1>
            </div>
            <div class="lower-sub">Unfortunately, statement has now been broadcast internationally</div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN VERIFIED • FARIS CONFIRMED TO BE VERY VERY LOVED • FINDING INDEPENDENTLY VERIFIED BY SOURCE APPROXIMATELY 10,827 KM AWAY • BBN VERIFIED • FARIS CONFIRMED TO BE VERY VERY LOVED",
      html: `
        <div class="news-slide">
          <div class="news-package">
            <span class="package-kicker">FINAL INVESTIGATIVE FINDING</span>

            <p class="package-copy">
              Investigators have concluded that while Faris remains difficult to classify, one fact has been independently verified.
            </p>

            <div class="big-quote">He is very, very loved.</div>

            <p class="package-copy">
              Particularly by one woman approximately 10,827 kilometres away.
            </p>

            <div class="lower-third">
              <div class="lower-breaking">CONFIRMED</div>
              <div class="lower-main">
                <h1>Faris is very, very loved</h1>
              </div>
              <div class="lower-sub">Finding independently verified by Singapore source</div>
            </div>
          </div>
        </div>
      `
    },

    {
      ticker: "BBN EXCLUSIVE • FOOTAGE INCOMING FROM SINGAPORE CORRESPONDENT • FARIS: 30 YEARS IN THE MAKING • MATERIAL CONCERNS BIRTHDAY BOY DIRECTLY • BBN EXCLUSIVE",
      html: `
        <div class="news-slide">
          <div class="news-package">
            <span class="package-kicker">EXCLUSIVE FOOTAGE</span>

            <h1 class="package-title">FARIS:<br>30 YEARS IN THE MAKING</h1>

            <p class="package-copy">
              We are now receiving exclusive footage supplied by our Singapore correspondent.
            </p>

            <p class="package-copy">
              The following material concerns the birthday boy directly.
            </p>

            <div class="lower-third">
              <div class="lower-breaking">BBN EXCLUSIVE</div>
              <div class="lower-main">
                <h1>Footage supplied by Sayang</h1>
              </div>
            </div>
          </div>
        </div>
      `
    },

    {
      video: true,
      ticker: "BBN EXCLUSIVE FOOTAGE • FARIS: 30 YEARS IN THE MAKING • FOOTAGE SUPPLIED BY SAYANG • BBN EXCLUSIVE FOOTAGE • FARIS: 30 YEARS IN THE MAKING • FOOTAGE SUPPLIED BY SAYANG",
      html: `
        <div class="news-slide">
          <div class="news-video-stage" id="newsVideoStage"></div>

          <div class="lower-third">
            <div class="lower-breaking">BBN EXCLUSIVE</div>
            <div class="lower-main">
              <h1>Faris: 30 Years in the Making</h1>
            </div>
          </div>
        </div>
      `
    },

    {
      final: true,
      ticker: "BBN NEWS • HAPPY BIRTHDAY FARIS • 10,827 KM AWAY BUT NEVER REALLY THAT FAR • SAYANG LOVES YOU • END OF REPORT • HAPPY BIRTHDAY FARIS • BBN NEWS",
      html: `
        <div class="news-slide">
          <div class="final-broadcast">
            <div>
              <h1>HAPPY 30TH<br>BIRTHDAY, FARIS</h1>

              <p>
                This concludes our special birthday coverage.
              </p>

              <p>
                Further celebrations are expected throughout the day.
              </p>
            </div>
          </div>
        </div>
      `
    }
  ];

  function clearTVTimers() {
    tvTimers.forEach((timer) => clearTimeout(timer));
    tvTimers = [];
  }

  function restartTicker() {
    newsTickerText.style.animation = "none";
    void newsTickerText.offsetWidth;
    newsTickerText.style.animation = "";
  }

  function renderNewsSlide() {
    const slide = slides[currentNewsSlide];

    newsScreen.innerHTML = slide.html;
    newsTickerText.textContent = slide.ticker;
    restartTicker();

    if (slide.video) {
      const stage = document.getElementById("newsVideoStage");

      if (stage) {
        stage.appendChild(birthdayVideo);
        stage.appendChild(videoFallback);
      }

      newsNextButton.textContent = "CONTINUE ›";
    } else if (slide.final) {
      newsNextButton.textContent = "RETURN TO ROOM";
    } else {
      newsNextButton.textContent = "CONTINUE ›";
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
    }, 650);

    const broadcastTimer = setTimeout(() => {
      tvStatic.classList.add("hidden-phase");
      tvBroadcast.classList.add("active");

      const revealTimer = setTimeout(() => {
        renderNewsSlide();
      }, 180);

      tvTimers.push(revealTimer);
    }, 1400);

    tvTimers.push(staticTimer, broadcastTimer);
  }

  function closeBirthdayNews() {
    clearTVTimers();

    if (birthdayVideo && !birthdayVideo.paused) {
      birthdayVideo.pause();
    }

    tvModal.classList.remove("open");
    tvModal.setAttribute("aria-hidden", "true");

    if (typeof clearRoomFocus === "function") {
      clearRoomFocus();
    }
  }

  newsNextButton.addEventListener("click", () => {
    const slide = slides[currentNewsSlide];

    if (slide.final) {
      closeBirthdayNews();
      return;
    }

    currentNewsSlide += 1;
    renderNewsSlide();
  });

  window.runTVSequence = startBirthdayNews;

  document.querySelectorAll("#tvModal [data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      clearTVTimers();

      if (birthdayVideo && !birthdayVideo.paused) {
        birthdayVideo.pause();
      }
    });
  });

  if (birthdayVideo) {
    birthdayVideo.addEventListener("ended", () => {
      newsNextButton.textContent = "CONTINUE ›";
    });
  }
})();
