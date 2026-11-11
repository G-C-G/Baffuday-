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
    var counts = {}, out = [], met = {};   // met["a|b"] = how many rounds two people have already shared a group
    var pairKey = function (x, y) { return x < y ? x + "|" + y : y + "|" + x; };
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
      var mem = function (p, side) { return { name: p.name, n: p.n, flip: p.side !== side, side: side, origin: p.side }; };

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
      // An even number of groups, never more than 8 (so names stay big on the projector): the extra groups are folded into the others as 3 against 3.
      var want = Math.min(groups.length, 8); if (want % 2 && want > 1) want--;
      if (groups.length > want) {
        groups.sort(function (x, y) { return (x.real ? 1 : 0) - (y.real ? 1 : 0) || x.heat - y.heat; });
        var cut = groups.splice(0, groups.length - want), to = 0;
        cut.forEach(function (g) {
          for (var q = 0; q < Math.max(g.a.length, g.b.length); q++) { var host = groups[to % groups.length]; to++; if (g.a[q]) host.a.push(g.a[q]); if (g.b[q]) host.b.push(g.b[q]); }
        });
      }
      // Spread the meetings: swap people between groups (same picked side, same role) so that as few pairs as possible have already met.
      var pairsOf = function (g) { var m = [].concat(g.a, g.b), r = []; for (var i = 0; i < m.length; i++) for (var j = i + 1; j < m.length; j++) r.push(pairKey(m[i].name, m[j].name)); return r; };
      var cost = function () { var c = 0; groups.forEach(function (g) { pairsOf(g).forEach(function (k) { c += (met[k] || 0) * 100; }); var sa = g.a.reduce(function (s, m) { return s + m.n; }, 0) / g.a.length, sb = g.b.reduce(function (s, m) { return s + m.n; }, 0) / g.b.length; c += Math.abs(sa - sb) * (g.real ? 1 : 0.2); }); return c; };
      var cur = cost(), it = 0, rs = rnd(seed, t.id + "|swap");
      for (it = 0; it < 2500 && groups.length > 1 && cur > 0.01; it++) {
        rs = rnd(seed, t.id + "|s" + it + "|" + rs);
        var i1 = Math.floor(rs * groups.length), rs2 = rnd(seed, t.id + "|t" + it), i2 = Math.floor(rs2 * groups.length); if (i1 === i2) continue;
        var g1 = groups[i1], g2 = groups[i2], s1 = rnd(seed, t.id + "|u" + it) < .5 ? "a" : "b", s2 = rnd(seed, t.id + "|v" + it) < .5 ? "a" : "b";
        var m1 = g1[s1], m2 = g2[s2], k1 = Math.floor(rnd(seed, t.id + "|w" + it) * m1.length), k2 = Math.floor(rnd(seed, t.id + "|x" + it) * m2.length);
        var p1 = m1[k1], p2 = m2[k2]; if (p1.origin !== p2.origin || p1.flip !== p2.flip || p1.side !== p2.side) continue;
        m1[k1] = p2; m2[k2] = p1; var nc = cost();
        if (nc < cur) cur = nc; else { m1[k1] = p1; m2[k2] = p2; }
      }
      groups.forEach(function (g) { pairsOf(g).forEach(function (k) { met[k] = (met[k] || 0) + 1; }); });
      var listeners = A.concat(B).filter(function (p) { return !used[p.name]; }).map(function (p) { return p.name; });
      var tot = A.length + B.length, major = A.length >= B.length ? t.a : t.b, minor = A.length >= B.length ? t.b : t.a, note = "";
      if (tot && Math.max(A.length, B.length) / tot >= 0.7) note = "Most people picked " + major + ", so some groups have two people arguing " + minor + " who did not pick it. Ask them to work out why someone would.";
      if (t.id === "jollof" && note) note = "We are in Ghana, so almost everyone picked Ghanaian. Tell them: even if you do not support Nigerian, talk about why people would choose Nigerian jollof, to get in that mindset. In most groups two people argue Nigerian who did not pick it.";
      out.push({ takeId: t.id, text: t.text, a: t.a, b: t.b, q: t.q, nA: A.length, nB: B.length, groups: groups, listeners: listeners, note: note });
    });
    return out;
  }
  // How well does a plan mix people? Returns, for the people who play, how many others each has met and how many pairs never meet.
  function coverage(P) {
    var people = {}, met = {};
    P.forEach(function (t) { t.groups.forEach(function (g) { var m = [].concat(g.a, g.b).map(function (x) { return x.name; }); m.forEach(function (n) { people[n] = people[n] || {}; m.forEach(function (o) { if (o !== n) people[n][o] = 1; }); }); }); });
    var names = Object.keys(people), per = names.map(function (n) { return Object.keys(people[n]).length; });
    var avg = per.length ? per.reduce(function (s, x) { return s + x; }, 0) / per.length : 0, min = per.length ? Math.min.apply(null, per) : 0, never = 0;
    for (var i = 0; i < names.length; i++) for (var j = i + 1; j < names.length; j++) if (!people[names[i]][names[j]]) never++;
    return { people: names.length, avg: avg, min: min, never: never, others: names.length - 1 };
  }
  // Try many shuffles and keep the one where the most people meet the most others.
  function best(guests, takes, seed, tries) {
    var bp = null, bc = null, bs = 0;
    for (var s = 0; s < (tries || 40); s++) {
      var sd = (seed || 1) * 1000 + s, p = plan(guests, takes, sd), c = coverage(p);
      if (!bc || c.never < bc.never || (c.never === bc.never && c.min > bc.min)) { bp = p; bc = c; bs = sd; }
    }
    bp.coverage = bc; bp.seedUsed = bs; return bp;
  }
  root.ICE = { plan: plan, coverage: coverage, best: best };
})(typeof window !== "undefined" ? window : globalThis);
