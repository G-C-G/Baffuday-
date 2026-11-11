// The show runner. It lives on the HOST page (the "Run the show" tab), never on the projector page, so the projector shows only the game.
// A big Start now button, then a control panel that walks you through the icebreaker, the spelling bee (asking before every karaoke
// break) and the hot takes. It drives the game through window.HOSTAPI, the same code the host panel buttons use.
(function () {
  var cfg = window.GCG_CONFIG || {}, KEY = "gcg-run-" + (cfg.ROOT || "");
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var rnd = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  var EVERY = [cfg.KARAOKE_EVERY_MIN || 4, cfg.KARAOKE_EVERY_MAX || 7];
  // How many bee turns / hot takes between karaoke breaks. It is worked out from how many people still have to sing (everyone who said yes
  // and is here gets a turn) against how many bee turns and hot takes are left, so the breaks are spread to fit everyone in.
  function pace() {
    var a = window.HOSTAPI; if (!a || !a.get) return EVERY[1]; var g = a.get(), R = g.kleft || 0; if (!R) return 99;
    var takes = Math.min(run.takes || 5, (g.takes || []).length), beeRem = 0, takesRem = takes;
    if (run.phase === "ice" || run.phase === "bee") beeRem = Math.max(4, Math.round((g.alive || g.onStage || 10) * 1.6));
    if (run.phase === "hot") takesRem = Math.max(0, takes - (run.takeIdx || 0) - 1);
    return Math.max(1, Math.min(EVERY[1], Math.floor((beeRem + takesRem) / R)));
  }

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
    "#runner.inhost{position:static;left:auto;right:auto;bottom:auto;transform:none;opacity:1;pointer-events:auto;border-radius:12px;padding:20px 22px;font-size:16px;gap:16px;box-shadow:none;margin-top:14px}",
    "#runner.inhost button{font-size:15px;padding:1em 1.3em}",
    "#runner.inhost button.go{font-size:22px;padding:.9em 1.8em}",
    "#runner.inhost button.opt{font-size:24px}",
    "#runner.inhost .ask .q{font-size:30px}",
    "#runner.inhost .st{font-size:17px}",
    "#startbtn{position:static;transform:none;display:block;margin:0;font-size:28px;padding:1em 3em;border-radius:12px}",
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
    "#startbtn[hidden]{display:none}",
  ].join("\n");
  document.head.appendChild(css);

  var panel = document.getElementById("runpanel");
  if (!panel) return;   // only runs on the host page
  var strip = document.createElement("div"); strip.id = "runner"; strip.className = "inhost"; panel.appendChild(strip);
  var startBtn = document.createElement("button"); startBtn.id = "startbtn"; startBtn.type = "button"; startBtn.textContent = "Start now"; startBtn.hidden = true; panel.insertBefore(startBtn, strip);

  function api() { return window.HOSTAPI; }
  var st = { mode: "home" };
  var A = null, G = null, hideT = 0, sig = "";

  // ---- show / hide the strip with the mouse ----
  function poke() {
    if (true) return;
    document.body.classList.add("hostmode"); strip.classList.remove("hide"); clearTimeout(hideT);
    hideT = setTimeout(function () { if (!needsAttention()) { strip.classList.add("hide"); document.body.classList.remove("hostmode"); } }, 4500);
  }
  document.addEventListener("mousemove", poke); document.addEventListener("mousedown", poke); document.addEventListener("touchstart", poke);
  function needsAttention() { return !!(run.ask || run.paused || hint || run.phase === "done"); }
  function chime() {
    try { var ac = new (window.AudioContext || window.webkitAudioContext)(); [660, 880].forEach(function (f, i) { var o = ac.createOscillator(), g = ac.createGain(); o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.12, ac.currentTime + i * .15); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + i * .15 + .3); o.connect(g); g.connect(ac.destination); o.start(ac.currentTime + i * .15); o.stop(ac.currentTime + i * .15 + .35); }); } catch (e) {}
  }

  // ---- Start now: no dialog. The setup is chosen on the host panel (Night setup tab) and never shown on the projector. ----
  var hint = "", hintT = 0;
  function say(t) { hint = t; clearTimeout(hintT); hintT = setTimeout(function () { hint = ""; paint(true); }, 7000); paint(true); poke(); }
  function startShow() {
    A = api(); if (!A || !A.get) return say("Still loading. Try again in a moment.");
    G = A.get();
    if (!G.guests) return say("No guests are loaded. On your host screen, load the guest file, then press Start now.");
    if (!G.hereOn) return say("Mark who is here first. On your host screen, open Get ready and tick the people who have arrived, then press Start now.");
    if (G.here < 4) return say("Only " + G.here + " marked here. Tick everyone who has arrived on your host screen (Get ready).");
    var s = G.show || {}; run.takes = s.takes || run.takes; run.kOn = s.k !== false; run.stage = s.stage; run.iceLen = s.ice === undefined ? 120 : s.ice;
    if (run.iceLen > 0) return startIce();
    startBee();
  }
  function startBee() {
    A = api(); G = A.get();
    var MAXS = cfg.BEE_MAX_STAGE || 14;   // a bigger stage would run past the 46 prompts
    A.beeLoad(run.stage === "everyone" || G.keenest < 6 ? Math.min(G.eligible, cfg.BEE_MAX_EVERYONE || 24) : Math.min(G.keenest, MAXS)); A.beeRules();
    run.phase = "bee"; run.sinceK = 0; run.ret = ""; run.ask = false; run.paused = null; run.counted = ""; save(); paint(true);
  }
  // ---- icebreaker: every take is debated first, in groups; the clock runs on the projector ----
  function startIce() { run.phase = "ice"; run.iceIdx = -1; run.ret = ""; run.ask = false; run.paused = null; save(); iceNext(); }
  function iceNext() {
    A = api(); var P = A.icePlan(), i = (run.iceIdx || 0) + 1;
    while (i < P.length && !P[i].groups.length) i++;               // nobody to argue: skip
    if (i >= P.length) return startBee();
    run.iceIdx = i; save(); var t = P[i];
    A.setState({ mode: "icebreaker", phase: "groups", num: i + 1, total: P.length, takeId: t.takeId, text: t.text, a: t.a, b: t.b, groups: t.groups, listeners: t.listeners, durMs: run.iceLen * 1000 });
  }
  function iceGo() { A = api(); A.setState(Object.assign({}, st, { phase: "timer", startAt: Date.now(), noReplay: true })); }
  function iceAdd() { A = api(); A.setState(Object.assign({}, st, { durMs: st.durMs + 30000, noReplay: true })); }
  startBtn.addEventListener("click", function () { startShow(); });

  // ---- what happens after a karaoke break ----
  function returnFromKaraoke() {
    var r = run.ret; run.ret = ""; save(); A = api();
    if (r === "bee-next") A.beeNext(); else if (r === "bee-call") A.beeCall(); else if (r === "hot-next") hotNext(); else if (r === "hot-same") A.takeShow(); else A.beeCall();
  }
  function spinNow(ret) { A = api(); run.ret = ret; run.sinceK = 0; run.ask = false; save(); A.spin(); }
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
  // After the last hot take, anyone who is here, said yes to karaoke and has not sung yet gets their turn before the night ends.
  function finishNight() {
    A = api(); G = A.get();
    if (run.kOn && G.kleft > 0 && run.phase !== "kfin") { run.phase = "kfin"; run.ask = false; save(); A.setState({ mode: "home" }); return; }
    run.phase = "done"; run.ask = false; save(); A.setState({ mode: "home" });
  }

  // ---- pause ----
  function pause() { A = api(); run.paused = st; run.pausedAt = Date.now(); save(); A.setState({ mode: "pause", resume: st }); }
  function resume() { A = api(); var r = run.paused; run.paused = null; save();
    if (r && r.mode === "icebreaker" && r.phase === "timer" && run.pausedAt) r = Object.assign({}, r, { startAt: r.startAt + (Date.now() - run.pausedAt) }); A.setState(Object.assign({}, r && r.mode !== "pause" ? r : { mode: "home" }, { noReplay: true })); }

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
    kspin: function () { A.spin(); },
    kdone: function () { if (G && G.kleft > 0 && !confirm(G.kleft + " people who said yes have not sung yet. Finish the night anyway?")) return; run.phase = "done"; run.ask = false; save(); A.setState({ mode: "home" }); },
    kyes: function () { spinNow(karaokeRet()); },
    kno: function () { run.ask = false; run.sinceK = Math.max(0, pace() - 1); save(); },
    know: function () { spinNow(karaokeRet()); },
    kback: function () { returnFromKaraoke(); },
    kagain: function () { A.spinAgain(); },
    pause: function () { pause(); },
    icego: function () { iceGo(); },
    icenext: function () { iceNext(); },
    icelast: function () { startBee(); },
    iceadd: function () { iceAdd(); },
    iceskip: function () { if (confirm("Skip the rest of the icebreaker and go to the spelling bee?")) startBee(); },
    resume: function () { resume(); },
    reset: function () { run.phase = "idle"; run.ret = ""; run.ask = false; run.paused = null; save(); A.setState({ mode: "home" }); }
  };
  strip.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button"); if (!b || b.disabled) return; A = api(); if (!A) return; fresh();
    if (b.dataset.pick) { A.beePick(b.dataset.pick); return; }
    if (b.dataset.w !== undefined) { var cur = (run.win || {})[st.takeId]; run.win = run.win || {}; run.win[st.takeId] = cur === b.dataset.w ? "" : b.dataset.w; save(); A.setState(Object.assign({}, st, { winner: run.win[st.takeId] || "", noReplay: true })); setTimeout(function () { paint(true); }, 60); return; }
    var f = ACT[b.dataset.act]; if (f) { f(); setTimeout(function () { paint(true); }, 60); }
  });
  document.addEventListener("keydown", function (e) {
    if (!document.getElementById("p-run").classList.contains("on")) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ""))) return;
    var k = e.key;
    if (run.phase === "idle" && (k === " " || k === "Enter") && !startBtn.hidden) { e.preventDefault(); startShow(); return; }
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

  function fresh() { var a = api(); if (a && a.get) { var g = a.get(); if (g && g.state && g.state.mode) st = g.state; else st = { mode: "home" }; } }
  function paint(force) {
    fresh();
    var m = st.mode || "home", html = "", status = "", primary = "", sec = [], opts = "", ask = "";
    startBtn.hidden = run.phase !== "idle";
    if (run.phase === "idle") { strip.classList.remove("hide"); if (hint) { strip.innerHTML = '<div class="row"><span class="st"><b>' + esc(hint) + "</b></span></div>"; strip.classList.remove("hide"); } else strip.classList.add("hide"); return; }
    A = api(); if (!A || !A.get) { strip.innerHTML = '<div class="row"><span class="st">Loading the show...</span></div>'; return; }
    G = A.get();

    if (m === "pause") {
      status = "<b>Paused.</b> The screen says we'll be right back.";
      primary = btn("Resume", "resume", "go"); sec = [];
    } else if (run.phase === "kfin") {
      status = "<b>Karaoke finale.</b> " + G.kleft + " still to sing &middot; " + G.ksung + " have sung" + ((m === "roulette" || m === "karaoke") && st.name ? " &middot; now: <b>" + esc(st.name) + "</b>" : "");
      primary = G.kleft > 0 ? btn("Spin for the next singer", "kspin", "go") : btn("That is everyone: finish the night", "kdone", "go");
      sec = [btn("Not here? Spin again", "kagain", "sec"), btn("Finish the night now", "kdone", "sec"), btn("Pause", "pause", "sec")];
    } else if (m === "roulette" || m === "karaoke") {
      status = "<b>Karaoke roulette.</b> " + esc(st.name || "") + (st.song ? " &middot; " + esc(st.song) : "");
      primary = btn("Back to the show", "kback", "go");
      sec = [btn("Not here? Spin again", "kagain", "sec"), btn("Pause", "pause", "sec")];
    } else if (run.phase === "ice") {
      var P2 = A.icePlan(), idx = run.iceIdx || 0, lastIce = !P2.slice(idx + 1).some(function (t) { return t.groups.length; });
      status = "<b>Icebreaker.</b> Take " + (idx + 1) + " of " + P2.length;
      if (idx === 0) status += '<br><span style="color:#F5D76E"><b>Say first:</b> If you are in a group where everyone feels the same way, work out why other people feel completely differently.</span>';
      if (P2[idx] && P2[idx].note) status += '<br><span style="color:#F5D76E"><b>For this one:</b> ' + esc(P2[idx].note) + "</span>";
      if (m === "icebreaker" && st.phase === "timer") {
        var left = st.startAt + st.durMs - Date.now();
        status += left > 0 ? " &middot; clock running (" + Math.ceil(left / 1000) + "s left)" : " &middot; <b>time</b>";
        primary = btn(lastIce ? "Next: the spelling bee" : "Next take", lastIce ? "icelast" : "icenext", "go");
        sec = [btn("+30 seconds", "iceadd", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "icebreaker") {
        primary = btn("Start the clock (" + Math.round(st.durMs / 1000 / 60 * 10) / 10 + " min)", "icego", "go");
        sec = [btn(lastIce ? "Skip to the spelling bee" : "Skip this take", lastIce ? "icelast" : "icenext", "sec"), btn("Skip the icebreaker", "iceskip", "sec"), btn("Pause", "pause", "sec")];
      } else primary = btn("Show the groups", "icenext", "go");
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
      if (run.kOn && m === "bee" && st.phase === "result" && !st.final && run.sinceK >= pace() && G.kleft > 0 && !run.ask) { run.ask = true; save(); chime(); }
      if (run.ask && !(m === "bee" && st.phase === "result" && !st.final)) { run.ask = false; save(); }
    } else if (run.phase === "hot") {
      var tk = Math.min(run.takes, G.takes.length), nowT = run.takeIdx + 1;
      status = "<b>Twisted hot takes.</b> Take " + nowT + " of " + tk;
      if (m === "hottake" && st.phase === "twist") {
        countTurn("h" + st.takeId);
        primary = nowT >= tk ? btn("Finish the night", "hend", "go") : btn("Next take", "hnext", "go");
        if (nowT >= tk) ACT.hend = function () { finishNight(); };
        sec = [btn("Karaoke now", "know", "sec"), btn("Pause", "pause", "sec")];
        var wn = (run.win || {})[st.takeId] || "";
        opts = '<span class="st">Ask the room: who was the most convincing? Tap the winner.</span>' + (st.people || []).map(function (p) { return btn(esc(p.name), "hwin", "opt" + (wn === p.name ? " on" : ""), ' data-w="' + esc(p.name) + '"'); }).join("");
      } else if (m === "hottake" && st.phase === "stand") {
        primary = btn("The twist", "twist", "go"); sec = [btn("Skip take", "hskip", "sec"), btn("Pause", "pause", "sec")];
      } else if (m === "hottake") {
        primary = btn("Show what everyone picked", "stand", "go"); sec = [btn("Skip take", "hskip", "sec"), btn("Karaoke now", "know", "sec"), btn("Pause", "pause", "sec")];
      } else primary = btn("Show take " + nowT, "hnext", "go");
      if (run.kOn && m === "hottake" && st.phase === "twist" && nowT < tk && run.sinceK >= pace() && G.kleft > 0 && !run.ask) { run.ask = true; save(); chime(); }
      if (run.ask && !(m === "hottake" && st.phase === "twist")) { run.ask = false; save(); }
    } else if (run.phase === "done") {
      status = "<b>That's the night.</b> Thank you for coming.";
      primary = btn("Back to the title", "reset", "go"); sec = [];
    }

    if (run.ask) {
      ask = '<div class="ask"><span class="q">Karaoke roulette break? ' + G.kleft + ' still to sing.</span>' + btn("Yes, spin the wheel", "kyes", "go") + btn("Not now", "kno") + "</div>";
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
  window.GCG_RUN = { open: startShow, get: function () { return run; } };
})();
