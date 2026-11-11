// The show runner: host the whole night from the projector page. A "Start now" button on the title page, then a control strip at the
// bottom (it fades out after a few seconds; move the mouse to bring it back). The strip walks you through the spelling bee, asks before
// every karaoke roulette break, then the hot takes. It drives host.html (loaded invisibly in a frame) through window.HOSTAPI, so it uses
// exactly the same game code as the host panel.
(function () {
  var cfg = window.GCG_CONFIG || {}, KEY = "gcg-run-" + (cfg.ROOT || "");
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var rnd = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  var EVERY = [cfg.KARAOKE_EVERY_MIN || 4, cfg.KARAOKE_EVERY_MAX || 7];

  // ---- state kept across a reload ----
  var run = { phase: "idle", every: rnd(EVERY[0], EVERY[1]), sinceK: 0, ret: "", takeIdx: 0, takes: cfg.TAKES_TO_PLAY || 5, stage: 0, kOn: true, counted: "", paused: null, ask: false, stageTouched: false };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved && saved.phase) run = Object.assign(run, saved); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(run)); } catch (e) {} }

  // ---- DOM ----
  var css = document.createElement("style");
  css.textContent = [
    "#hostframe{position:fixed;left:-20px;top:-20px;width:2px;height:2px;border:0;opacity:0;pointer-events:none}",
    "body.hostmode{cursor:default}",
    "#runner{position:fixed;left:0;right:0;bottom:0;z-index:90;padding:1.4vh 2.2vw 1.8vh;background:rgba(8,24,62,.96);color:#FFF4C9;font:500 clamp(12px,1.15vw,18px)/1.35 Inter,sans-serif;display:grid;gap:1.1vh;transition:opacity .35s,transform .35s;box-shadow:0 -1.2vh 3vh rgba(0,0,0,.35)}",
    "#runner.hide{opacity:0;transform:translateY(100%);pointer-events:none}",
    "#runner .row{display:flex;gap:.8vw;align-items:center;flex-wrap:wrap}",
    "#runner .st{flex:1;min-width:14vw;opacity:.85}",
    "#runner .st b{font-weight:700;opacity:1;color:#F5D76E}",
    "#runner button{font:700 clamp(12px,1.1vw,17px)/1 Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;border:1.5px solid #FFF4C9;background:transparent;color:#FFF4C9;padding:.9em 1.2em;border-radius:6px;cursor:pointer}",
    "#runner button:hover{background:rgba(255,244,201,.14)}",
    "#runner button.go{background:#F5D76E;border-color:#F5D76E;color:#08183E;font-size:clamp(14px,1.5vw,24px);padding:.8em 1.8em}",
    "#runner button.go:hover{background:#FFE48A}",
    "#runner button[disabled]{opacity:.35;cursor:default}",
    "#runner button.opt{font-size:clamp(15px,1.7vw,28px);padding:.7em 1.5em;letter-spacing:.1em}",
    "#runner button.opt.on{background:#FFF4C9;color:#08183E}",
    "#runner .ask{display:flex;gap:1vw;align-items:center;flex-wrap:wrap;background:rgba(245,215,110,.16);border:1.5px solid #F5D76E;border-radius:8px;padding:1.1vh 1.2vw}",
    "#runner .ask .q{flex:1;font:400 clamp(18px,2vw,32px)/1.1 'Instrument Serif',Georgia,serif;color:#F5D76E}",
    "#runner .sec{opacity:.9}",
    "#startbtn{position:fixed;left:50%;bottom:11vh;transform:translateX(-50%);z-index:80;font:700 clamp(18px,2vw,32px)/1 Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;background:#08183E;color:#F5D76E;border:0;border-radius:999px;padding:.9em 2.4em;cursor:pointer;box-shadow:0 1.2vh 3vh rgba(8,24,62,.4)}",
    "#startbtn:hover{background:#0F2560}",
    "#dlgwrap[hidden],#startbtn[hidden]{display:none}",
    "#dlgwrap{position:fixed;inset:0;z-index:95;background:rgba(8,24,62,.78);display:grid;place-items:center}",
    "#dlg{background:#FBE9A6;color:#08183E;border-radius:10px;padding:3.2vh 3vw;width:min(54vw,860px);font:400 clamp(13px,1.2vw,19px)/1.45 Inter,sans-serif;display:grid;gap:2vh;box-shadow:0 2vh 6vh rgba(0,0,0,.45)}",
    "#dlg h2{font:400 clamp(34px,3.8vw,60px)/1 'Instrument Serif',Georgia,serif;margin:0}",
    "#dlg .lab{font:700 clamp(10px,.9vw,14px)/1.2 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;opacity:.7;margin:0 0 .8vh}",
    "#dlg .pills{display:flex;gap:.7vw;flex-wrap:wrap}",
    "#dlg .pill{font:700 clamp(12px,1.1vw,17px)/1.2 Inter,sans-serif;border:1.5px solid #08183E;background:transparent;color:#08183E;border-radius:999px;padding:.7em 1.3em;cursor:pointer;text-align:left}",
    "#dlg .pill small{display:block;font-weight:500;opacity:.75;margin-top:.2em;letter-spacing:0}",
    "#dlg .pill.on{background:#08183E;color:#F5D76E}",
    "#dlg .go{justify-self:start;font:700 clamp(14px,1.4vw,22px)/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;background:#08183E;color:#F5D76E;border:0;border-radius:6px;padding:.9em 1.8em;cursor:pointer}",
    "#dlg .go[disabled]{opacity:.35;cursor:default}",
    "#dlg .note{opacity:.75}"
  ].join("\n");
  document.head.appendChild(css);

  var frame = document.createElement("iframe"); frame.id = "hostframe"; frame.src = "host.html?embed=1"; frame.setAttribute("aria-hidden", "true"); frame.tabIndex = -1; document.body.appendChild(frame);
  var strip = document.createElement("div"); strip.id = "runner"; strip.className = "hide"; document.body.appendChild(strip);
  var startBtn = document.createElement("button"); startBtn.id = "startbtn"; startBtn.type = "button"; startBtn.textContent = "Start now"; startBtn.hidden = true; document.body.appendChild(startBtn);
  var dlgWrap = document.createElement("div"); dlgWrap.id = "dlgwrap"; dlgWrap.hidden = true; document.body.appendChild(dlgWrap);

  function api() { try { return frame.contentWindow && frame.contentWindow.HOSTAPI; } catch (e) { return null; } }
  var st = { mode: "home" };
  var A = null, G = null, dialogOpen = false, hideT = 0, sig = "";

  // ---- show / hide the strip with the mouse ----
  function poke() {
    document.body.classList.add("hostmode"); strip.classList.remove("hide"); clearTimeout(hideT);
    hideT = setTimeout(function () { if (!needsAttention()) { strip.classList.add("hide"); document.body.classList.remove("hostmode"); } }, 4500);
  }
  document.addEventListener("mousemove", poke); document.addEventListener("mousedown", poke); document.addEventListener("touchstart", poke);
  function needsAttention() { return !!(run.ask || run.paused || dialogOpen || run.phase === "done"); }
  function chime() {
    try { var ac = new (window.AudioContext || window.webkitAudioContext)(); [660, 880].forEach(function (f, i) { var o = ac.createOscillator(), g = ac.createGain(); o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.12, ac.currentTime + i * .15); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + i * .15 + .3); o.connect(g); g.connect(ac.destination); o.start(ac.currentTime + i * .15); o.stop(ac.currentTime + i * .15 + .35); }); } catch (e) {}
  }

  // ---- the setup dialog ----
  function openSetup() {
    A = api(); if (!A) return; G = A.get(); dialogOpen = true; poke();
    var keen = G.keenest, all = G.eligible, useKeen = keen >= 6;
    if (!run.stageTouched) run.stage = useKeen ? keen : 0;
    var mins = function (n) { var turns = n >= 20 ? 42 : n >= 15 ? 32 : n >= 11 ? 26 : 20; return "about " + Math.round(turns * 1.5 / 5) * 5 + " min"; };
    var noGuests = !G.guests;
    var takeOpts = [3, 4, 5, 6, 8].filter(function (n) { return n <= G.takes.length; });
    dlgWrap.hidden = false;
    dlgWrap.innerHTML = '<div id="dlg"><h2>Ready?</h2>' +
      (noGuests ? '<p class="note"><b>No guests are loaded.</b> Load the guest file, then come back to this screen.</p><div><label class="pill" style="display:inline-block">Load guest file (.json)<input type="file" id="dlgfile" accept="application/json,.json" hidden></label></div><p class="note" id="dlgmsg"></p>' :
        '<p class="note">' + G.guests + ' guests. ' + all + ' can go on the bee stage. The people who said Rather not or Please no are never put on an activity they said no to.</p>' +
        '<div><p class="lab">Spelling bee: who goes on stage</p><div class="pills">' +
        (keen >= 6 ? '<button type="button" class="pill' + (run.stage === keen ? " on" : "") + '" data-stage="' + keen + '">The keenest ' + keen + '<small>' + mins(keen) + '</small></button>' : "") +
        '<button type="button" class="pill' + (run.stage === 0 ? " on" : "") + '" data-stage="0">Everyone ' + all + '<small>' + mins(all) + '</small></button></div></div>' +
        '<div><p class="lab">Hot takes to play</p><div class="pills">' + takeOpts.map(function (n) { return '<button type="button" class="pill' + (run.takes === n ? " on" : "") + '" data-takes="' + n + '">' + n + '</button>'; }).join("") + '</div></div>' +
        '<div><p class="lab">Karaoke roulette breaks</p><div class="pills"><button type="button" class="pill' + (run.kOn ? " on" : "") + '" data-k="1">Ask me every ' + EVERY[0] + ' to ' + EVERY[1] + ' turns<small>You say yes or not now each time</small></button><button type="button" class="pill' + (!run.kOn ? " on" : "") + '" data-k="0">No breaks, I will call them myself</button></div></div>' +
        '<button type="button" class="go" id="dlgbegin">Start the spelling bee</button>') + '<p class="note"><button type="button" class="pill" id="dlgcancel">Not yet</button></p></div>';
  }
  function closeDlg() { dialogOpen = false; dlgWrap.hidden = true; dlgWrap.innerHTML = ""; }
  dlgWrap.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("button, label"); if (!t) return;
    if (t.dataset.stage !== undefined) { run.stage = +t.dataset.stage; run.stageTouched = true; save(); return openSetup(); }
    if (t.dataset.takes) { run.takes = +t.dataset.takes; save(); return openSetup(); }
    if (t.dataset.k !== undefined) { run.kOn = t.dataset.k === "1"; save(); return openSetup(); }
    if (t.id === "dlgcancel") return closeDlg();
    if (t.id === "dlgbegin") {
      closeDlg(); A = api(); A.beeLoad(run.stage); A.beeRules();
      run.phase = "bee"; run.sinceK = 0; run.every = rnd(EVERY[0], EVERY[1]); run.ret = ""; run.ask = false; run.paused = null; run.counted = ""; save(); paint(true);
    }
  });
  dlgWrap.addEventListener("change", function (e) {
    if (e.target.id !== "dlgfile" || !e.target.files[0]) return;
    var f = e.target.files[0]; document.getElementById("dlgmsg").textContent = "Reading...";
    f.text().then(function (t) { return api().importJson(t); }).then(function (n) { document.getElementById("dlgmsg").textContent = "Loaded " + n + " guests."; setTimeout(openSetup, 600); })
      .catch(function () { document.getElementById("dlgmsg").textContent = "That file is not a guest list."; });
  });
  startBtn.addEventListener("click", function () { openSetup(); });

  // ---- what happens after a karaoke break ----
  function returnFromKaraoke() {
    var r = run.ret; run.ret = ""; save(); A = api();
    if (r === "bee-next") A.beeNext(); else if (r === "bee-call") A.beeCall(); else if (r === "hot-next") hotNext(); else if (r === "hot-same") A.takeShow(); else A.beeCall();
  }
  function spinNow(ret) { A = api(); run.ret = ret; run.sinceK = 0; run.every = rnd(EVERY[0], EVERY[1]); run.ask = false; save(); A.spin(); }
  function karaokeRet() {
    var m = st.mode;
    if (run.phase === "hot") return (m === "hottake" && st.phase === "twist") || m === "home" ? "hot-next" : "hot-same";
    return m === "bee" && st.phase === "result" ? "bee-next" : "bee-call";
  }

  // ---- hot takes ----
  function startHot() {
    A = api(); G = A.get(); run.phase = "hot"; run.takeIdx = 0; run.ret = ""; run.ask = false; run.counted = ""; save();
    A.takePick(G.takes[0].id); A.takeShow();
  }
  function hotNext() {
    A = api(); G = A.get(); run.takeIdx++; save();
    if (run.takeIdx >= Math.min(run.takes, G.takes.length)) return finishNight();
    A.takePick(G.takes[run.takeIdx].id); A.takeShow();
  }
  function finishNight() { A = api(); run.phase = "done"; run.ask = false; save(); A.setState({ mode: "home" }); }

  // ---- pause ----
  function pause() { A = api(); run.paused = st; save(); A.setState({ mode: "pause", resume: st }); }
  function resume() { A = api(); var r = run.paused; run.paused = null; save(); A.setState(Object.assign({}, r && r.mode !== "pause" ? r : { mode: "home" }, { noReplay: true })); }

  // ---- actions ----
  var ACT = {
    call: function () { A.beeCall(); },
    show: function () { A.beeShow(); },
    lock: function () { A.beeLock(st.chosen); },
    unpick: function () { A.beeUnpick(); },
    next: function () { A.beeNext(); },
    win: function () { A.beeWin(); },
    skipq: function () { A.beeSkipPrompt(); },
    skipp: function () { if (confirm("Take this contestant off the stage (not here) and call the next one?")) A.beeSkipPerson(); },
    endbee: function () { if (confirm("End the spelling bee now and show the champion?")) A.beeWin(); },
    hot: function () { startHot(); },
    stand: function () { A.takeStand(); },
    twist: function () { A.takeTwist(); },
    hnext: function () { hotNext(); },
    hskip: function () { if (confirm("Skip this take?")) hotNext(); },
    hend: function () { if (confirm("End the hot takes and finish the night?")) finishNight(); },
    kyes: function () { spinNow(karaokeRet()); },
    kno: function () { run.ask = false; run.sinceK = Math.max(0, run.every - 3); save(); },
    know: function () { spinNow(karaokeRet()); },
    kback: function () { returnFromKaraoke(); },
    kagain: function () { A.spinAgain(); },
    pause: function () { pause(); },
    resume: function () { resume(); },
    reset: function () { run.phase = "idle"; run.ret = ""; run.ask = false; run.paused = null; save(); A.setState({ mode: "home" }); }
  };
  strip.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button"); if (!b || b.disabled) return; A = api(); if (!A) return;
    if (b.dataset.pick) { A.beePick(b.dataset.pick); return; }
    var f = ACT[b.dataset.act]; if (f) { f(); setTimeout(function () { paint(true); }, 60); }
  });
  document.addEventListener("keydown", function (e) {
    if (dialogOpen || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ""))) return;
    var k = e.key;
    if (run.phase === "idle" && (k === " " || k === "Enter") && !startBtn.hidden) { e.preventDefault(); openSetup(); return; }
    if (run.phase === "idle" || run.phase === "done") return;
    var go = strip.querySelector("button.go:not([disabled])");
    if ((k === " " || k === "Enter") && go) { e.preventDefault(); go.click(); poke(); }
    else if (k === "p" || k === "P") { var pb = strip.querySelector('[data-act="pause"],[data-act="resume"]'); if (pb) pb.click(); poke(); }
    else if (k === "k" || k === "K") { var kb = strip.querySelector('[data-act="know"]'); if (kb) kb.click(); poke(); }
    else if (k === "s" || k === "S") { var sb = strip.querySelector('[data-act="skipq"],[data-act="hskip"]'); if (sb) sb.click(); poke(); }
    else if (/^[1-4]$/.test(k)) { var ob = strip.querySelectorAll("button.opt")[+k - 1]; if (ob) { ob.click(); poke(); } }
    else if (k === "h" || k === "H") poke();
  });

  // ---- the strip ----
  function btn(label, act, cls, extra) { return '<button type="button" data-act="' + act + '"' + (cls ? ' class="' + cls + '"' : "") + (extra || "") + ">" + label + "</button>"; }
  function countTurn(key) { if (run.counted !== key) { run.counted = key; run.sinceK++; save(); } }

  function paint(force) {
    var m = st.mode || "home", html = "", status = "", primary = "", sec = [], opts = "", ask = "";
    startBtn.hidden = !(run.phase === "idle" && (m === "home" || !m));
    if (run.phase === "idle") { strip.classList.add("hide"); return; }
    A = api(); if (!A || !A.get) { strip.innerHTML = '<div class="row"><span class="st">Loading the show...</span></div>'; return; }
    G = A.get();

    if (m === "pause") {
      status = "<b>Paused.</b> The screen says we'll be right back.";
      primary = btn("Resume", "resume", "go"); sec = [];
    } else if (m === "roulette" || m === "karaoke") {
      status = "<b>Karaoke roulette.</b> " + esc(st.name || "") + (st.song ? " &middot; " + esc(st.song) : "");
      primary = btn("Back to the show", "kback", "go");
      sec = [btn("Not here? Spin again", "kagain", "sec"), btn("Pause", "pause", "sec")];
    } else if (run.phase === "bee") {
      var stand = G.alive + " standing" + (G.sudden ? " &middot; sudden death" : ""), who = G.cur ? " &middot; up: <b>" + esc(G.cur) + "</b>" : "";
      var left = G.total - G.n - 1;
      status = "<b>Spelling bee.</b> Round " + G.round + " &middot; " + stand + who + " &middot; prompt " + (G.n + 1) + " of " + G.total + (left < 6 ? ' <span style="color:#FF6B7F">(only ' + left + ' prompts left)</span>' : "");
      if (m === "bee" && st.phase === "result") {
        countTurn("b" + (st.round) + "-" + st.n + "-" + st.contestant);
        primary = st.final ? btn("Show the champion", "win", "go") : btn("Next contestant", "next", "go");
        sec = [btn("Karaoke now", "know", "sec"), btn("End the bee now", "endbee", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "bee" && st.phase === "confirm") {
        primary = btn("Lock it in: " + esc(st.chosen || ""), "lock", "go");
        sec = [btn("Not that one", "unpick", "sec"), btn("Skip question", "skipq", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "bee") {
        opts = (st.options || []).map(function (o, i) { return '<button type="button" class="opt" data-pick="' + esc(o) + '">' + (i + 1) + " &nbsp;" + esc(o) + "</button>"; }).join("");
        primary = '<button type="button" class="go" disabled>Tap their answer</button>';
        sec = [btn("Skip question", "skipq", "sec"), btn("Not here, skip person", "skipp", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "beecall") {
        primary = btn("Show the sentence", "show", "go");
        sec = [btn("Skip question", "skipq", "sec"), btn("Not here, skip person", "skipp", "sec"), btn("Karaoke now", "know", "sec"), btn("End the bee now", "endbee", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "beewin") {
        status = "<b>We have a champion.</b>";
        primary = btn("Next: Twisted Hot Takes", "hot", "go"); sec = [btn("Karaoke now", "know", "sec"), btn("Pause", "pause", "sec")];
      } else {
        primary = btn(G.n === 0 && m !== "bee" ? "Call up the first contestant" : "Call up the next contestant", "call", "go");
        sec = [btn("End the bee now", "endbee", "sec"), btn("Pause", "pause", "sec")];
      }
      // a karaoke break is offered between turns
      if (run.kOn && m === "bee" && st.phase === "result" && !st.final && run.sinceK >= run.every && G.wheel > 0 && !run.ask) { run.ask = true; save(); chime(); }
      if (run.ask && !(m === "bee" && st.phase === "result" && !st.final)) { run.ask = false; save(); }
    } else if (run.phase === "hot") {
      var tk = Math.min(run.takes, G.takes.length), nowT = run.takeIdx + 1;
      status = "<b>Twisted hot takes.</b> Take " + nowT + " of " + tk;
      if (m === "hottake" && st.phase === "twist") {
        countTurn("h" + st.takeId);
        primary = nowT >= tk ? btn("Finish the night", "hend", "go") : btn("Next take", "hnext", "go");
        if (nowT >= tk) ACT.hend = function () { finishNight(); };
        sec = [btn("Karaoke now", "know", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "hottake" && st.phase === "stand") {
        primary = btn("The twist", "twist", "go"); sec = [btn("Skip take", "hskip", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "hottake") {
        primary = btn("Show what everyone picked", "stand", "go"); sec = [btn("Skip take", "hskip", "sec"), btn("Karaoke now", "know", "sec"), btn("Pause", "pause", "sec")];
      } else primary = btn("Show take " + nowT, "hnext", "go");
      if (run.kOn && m === "hottake" && st.phase === "twist" && nowT < tk && run.sinceK >= Math.max(2, run.every - 3) && G.wheel > 0 && !run.ask) { run.ask = true; save(); chime(); }
      if (run.ask && !(m === "hottake" && st.phase === "twist")) { run.ask = false; save(); }
    } else if (run.phase === "done") {
      status = "<b>That's the night.</b> Thank you for coming.";
      primary = btn("Back to the title", "reset", "go"); sec = [];
    }

    if (run.ask) {
      ask = '<div class="ask"><span class="q">Karaoke roulette break? ' + G.wheel + ' on the wheel.</span>' + btn("Yes, spin the wheel", "kyes", "go") + btn("Not now", "kno") + "</div>";
    }
    html = (ask || "") + (opts ? '<div class="row">' + opts + "</div>" : "") +
      '<div class="row"><span class="st">' + status + "</span>" + (run.ask ? "" : primary) + '<span class="row">' + sec.join("") + "</span></div>";
    var s2 = html + "|" + (strip.classList.contains("hide") ? 1 : 0);
    if (force || s2.split("|")[0] !== sig) { sig = s2.split("|")[0]; strip.innerHTML = html; }
    if (needsAttention() || run.ask) poke();
  }

  if (window.store) window.store.subscribe("state", function (v) { st = v || { mode: "home" }; paint(); });
  setInterval(paint, 1200);
  paint();
  window.GCG_RUN = { open: openSetup, get: function () { return run; } };
})();
