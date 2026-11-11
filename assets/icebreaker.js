// Icebreaker groups. For every hot take, people are put in balanced groups of 4: two arguing one side, two arguing the other.
// 1. People who really picked OPPOSITE sides are matched first, and the strongest feelings are matched with the strongest feelings.
// 2. When a take is lopsided (most of Ghana picks the same side) the rest are still put in balanced groups of 4: the two with the weakest
//    feelings in each group are asked to argue the side they did NOT pick (flip: true), so every group is 2 against 2.
// 3. At most 3 people are left over for a take; they listen.
// Same guests + same seed always give the same groups, in any browser. People who said Rather not / Please no to hot takes are never in a group.
(function (root) {
  function h(str) { var x = 2166136261; for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function rnd(seed, key) { var x = h(seed + "|" + key); x ^= x >>> 13; x = Math.imul(x, 0x5bd1e995) >>> 0; x ^= x >>> 15; return (x >>> 0) / 4294967296; }

  // guests: array of guest records. takes: the takes in the order they will be played. Returns one entry per take.
  function plan(guests, takes, seed) {
    seed = seed || 1;
    var counts = {}, out = [];
    var pk = root.pick || function (v) { return v && v.s ? v : null; }, into = root.into || function () { return true; };
    takes.forEach(function (t) {
      var A = [], B = [];
      guests.forEach(function (g) {
        if (!into(g, "takes")) return;
        var p = pk((g.picks || {})[t.id]); if (!p) return;
        (p.s === "agree" ? A : B).push({ name: g.name, n: p.n || 3, side: p.s === "agree" ? "a" : "b" });
      });
      var key = function (p) { return [-p.n, counts[p.name] || 0, rnd(seed, t.id + "|" + p.name)]; };
      var cmp = function (x, y) { var a = key(x), b = key(y); return a[0] - b[0] || a[1] - b[1] || a[2] - b[2]; };
      A.sort(cmp); B.sort(cmp);
      var M = A.length <= B.length ? A.slice() : B.slice(), J = A.length <= B.length ? B.slice() : A.slice(), groups = [], used = {};
      var take = function (g) { [].concat(g.a, g.b).forEach(function (m) { used[m.name] = 1; counts[m.name] = (counts[m.name] || 0) + 1; }); groups.push(g); };
      var mem = function (p, side) { return { name: p.name, n: p.n, flip: p.side !== side, side: side }; };

      // 1. real opposites, strongest first
      var R = Math.floor(M.length / 2);
      for (var r = 0; r < R; r++) {
        var pm = M.splice(0, 2), pj = J.splice(0, 2), sideM = pm[0].side, sideJ = pj[0].side;
        var gm = pm.map(function (p) { return mem(p, sideM); }), gj = pj.map(function (p) { return mem(p, sideJ); });
        var heat = pm.concat(pj).reduce(function (s, p) { return s + p.n; }, 0) / 4;
        take(sideM === "a" ? { a: gm, b: gj, heat: heat, real: true } : { a: gj, b: gm, heat: heat, real: true });
      }
      // 2. everyone else: balanced groups of 4. The weakest feelings in a group are asked to argue the other side.
      var pool = M.concat(J).sort(cmp);
      while (pool.length >= 4) {
        var four = pool.splice(0, 4), na = four.filter(function (p) { return p.side === "a"; }).length, nb = 4 - na;
        var flipSide = na > 2 ? "a" : nb > 2 ? "b" : "", flips = flipSide ? Math.abs(na - 2) : 0, flipped = {};
        if (flips) four.filter(function (p) { return p.side === flipSide; }).sort(function (x, y) { return x.n - y.n || ((counts[x.name] || 0) - (counts[y.name] || 0)); }).slice(0, flips).forEach(function (p) { flipped[p.name] = 1; });
        var ga = [], gb = [];
        four.forEach(function (p) { var s = flipped[p.name] ? (p.side === "a" ? "b" : "a") : p.side; (s === "a" ? ga : gb).push(mem(p, s)); });
        var real = four.filter(function (p) { return !flipped[p.name]; });
        take({ a: ga, b: gb, heat: real.reduce(function (s, p) { return s + p.n; }, 0) / (real.length || 1) - 1, real: false });
      }
      var listeners = A.concat(B).filter(function (p) { return !used[p.name]; }).map(function (p) { return p.name; });
      var tot = A.length + B.length, major = A.length >= B.length ? t.a : t.b, minor = A.length >= B.length ? t.b : t.a, note = "";
      if (tot && Math.max(A.length, B.length) / tot >= 0.7) note = "Most of you picked " + major + ". If everyone in your group picked the same, two of you argue " + minor + " anyway. Talk about why someone would pick it.";
      if (t.id === "jollof" && note) note = "We're in Ghana, so most of you picked Ghanaian. Even if you don't support Nigerian, talk about why people would choose Nigerian jollof. Get in that mindset. If everyone in your group picked Ghanaian, two of you argue Nigerian.";
      out.push({ takeId: t.id, text: t.text, a: t.a, b: t.b, q: t.q, nA: A.length, nB: B.length, groups: groups, listeners: listeners, note: note });
    });
    return out;
  }
  root.ICE = { plan: plan };
})(typeof window !== "undefined" ? window : globalThis);
