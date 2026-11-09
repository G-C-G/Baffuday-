// The 11 hot takes, in the order they are asked: the ones most likely to cause outrage first, easy ones last.
window.TAKES = [
  { id: "partners",  text: "Men make better partners than women.", q: "Who make better partners?", a: "Men", b: "Women" },
  { id: "leaders",   text: "Women are better leaders than men.", q: "Who are better leaders?", a: "Women", b: "Men" },
  { id: "dramatic",  text: "Men are actually more dramatic than women.", q: "Who is more dramatic?", a: "Men", b: "Women" },
  { id: "homemaker", text: "A woman can be the sole breadwinner and the man should be the primary homemaker.", q: "Woman as sole breadwinner, man as primary homemaker?", a: "Works for me", b: "Not for me" },
  { id: "firstmove", text: "Women should make the first move.", q: "Who should make the first move?", a: "Women", b: "Men" },
  { id: "jollof",    text: "Nigerian jollof is better than Ghanaian jollof.", q: "Whose jollof wins?", a: "Nigerian", b: "Ghanaian" },
  { id: "president", text: "The next President of Ghana should be under 40.", q: "The next President of Ghana?", a: "Under 40", b: "40 or older" },
  { id: "onread",    text: "It's acceptable to leave someone on read for three days.", q: "Leaving someone on read for three days?", a: "Acceptable", b: "Not acceptable" },
  { id: "cereal",    text: "Cereal goes in the bowl before the milk.", q: "Cereal first or milk first?", a: "Cereal first", b: "Milk first" },
  { id: "shower",    text: "Showering at night is better than showering in the morning.", q: "When should you shower?", a: "Night", b: "Morning" },
  { id: "pineapple", text: "Pineapple belongs on pizza.", q: "Pineapple on pizza?", a: "Belongs on it", b: "Never" }
];
// Each take is asked as a question with two answers. a = the side the take text states (stored "agree"), b = the other ("disagree").
// A guest's stored pick is "agree" or "disagree". The game gives them the OPPOSITE side.
window.opposite = function (stance) { return stance === "agree" ? "disagree" : "agree"; };
// Scale shown to guests.
window.SCALE = [
  { n: 1, label: "Whatever" },
  { n: 2, label: "Mildly" },
  { n: 3, label: "I have opinions" },
  { n: 4, label: "Don't start with me" },
  { n: 5, label: "I will argue about this" }
];
// Picks are stored as { s: "agree"|"disagree", n: 1-5 }. Old string picks count as 3.
window.pick = function (v) { return !v ? null : typeof v === "string" ? { s: v, n: 3 } : v; };
// Karaoke willingness. Everyone still submits a song; this decides who is called first.
window.SING = [
  { n: 5, label: "Put me on first" },
  { n: 4, label: "Happy to sing" },
  { n: 3, label: "I'll do it if called" },
  { n: 2, label: "Rather not" },
  { n: 1, label: "Please no" }
];
// Not ticking Karaoke sends someone to the bottom tier (still reachable as a last resort).
// Activities. Each guest says, at the end of the form, which they'd rather do and which they'd rather not.
window.INVOLVE = [
  { id: "bee", short: "Bee", label: "The Evil Spelling Bee", desc: "A spelling bee that is not really about spelling." },
  { id: "karaoke", short: "Karaoke", label: "Karaoke Roulette", desc: "Your song, at a moment of our choosing." },
  { id: "takes", short: "Takes", label: "Twisted Hot Takes", desc: "Strong opinions, said out loud, with a twist." }
];
// Returns "want", "ok" (either way) or "not". Old records: bee from the old field, true = want, else ok.
// The answer to "what would you rather do tonight" is a 1-5 rating per activity.
window.RATING = [
  { n: 5, label: "Put me on first" }, { n: 4, label: "I'm happy to do it" }, { n: 3, label: "I'll do it if called" },
  { n: 2, label: "Rather not" }, { n: 1, label: "Please no" }
];
window.ratingLabel = function (n) { var r = RATING.filter(function (o) { return o.n === n; })[0]; return r ? r.label : ""; };
// 1-5 for a guest and an activity. Older records stored "want" / "ok" / "not" (or true): those map to 4 / 3 / 2.
window.level = function (g, k) {
  var v = g && g.involve ? g.involve[k] : (k === "bee" && g && g.bee === "yes" ? 4 : 3);
  if (v === true) return 4; if (typeof v === "number") return Math.max(1, Math.min(5, Math.round(v)));
  return v === "want" ? 4 : v === "not" ? 2 : 3;
};
// Three-way view used by the host tools: "want" (4-5), "ok" (3), "not" (1-2, which we respect: never called, last in line).
window.pref = function (g, k) { var n = level(g, k); return n >= 4 ? "want" : n === 3 ? "ok" : "not"; };
// Taking part = not "rather not".
window.into = function (g, k) { return pref(g, k) !== "not"; };
// Karaoke order: willingness scale, raised to 4 if they'd rather do karaoke, dropped to 1 if they'd rather not.
window.singOf = function (g) { var n = level(g, "karaoke"); return n >= 3 ? n : 1; };
// Interaction score 0-10: activity preferences (0-6) + karaoke willingness (0-2) + how many takes they picked (0-2).
window.engagement = function (g) {
  var pv = { want: 2, ok: 1, not: 0 }, s = 0;
  INVOLVE.forEach(function (o) { s += pv[pref(g, o.id)]; });
  var sing = { want: 2, ok: 1, not: 0 }[pref(g, "karaoke")];
  var np = Math.min(Object.keys(g.picks || {}).length, 4) / 4 * 2;
  return Math.round((s + sing + np) * 10) / 10;
};
window.levelOf = function (score) { return score >= 7 ? "High" : score >= 4 ? "Medium" : "Low"; };
// Has this guest been in at least one game yet? (karaoke, a hot-take reveal, the bee, or marked by hand)
window.involved = function (g) { return !!(g.performed || (g.took && (g.took.takes || g.took.bee || g.took.manual))); };
// Suggest the game they are least against, then the least exposed: hot takes, then bee, then karaoke.
window.suggest = function (g) {
  var rank = { want: 0, ok: 1, not: 2 }, order = ["takes", "bee", "karaoke"], best = null;
  order.forEach(function (k) { if (best === null || rank[pref(g, k)] < rank[pref(g, best)]) best = k; });
  return INVOLVE.filter(function (o) { return o.id === best; })[0].label;
};
// Spot the extremes: "All in" wants everything, "Watcher" wants none and is against at least two.
window.kindOf = function (g) {
  var w = 0, n = 0; INVOLVE.forEach(function (o) { var p = pref(g, o.id); if (p === "want") w++; if (p === "not") n++; });
  return w === INVOLVE.length ? "All in" : (w === 0 && n >= 2 ? "Watcher" : "");
};
// Hot-take call order (lower = called first). n is the 1-5 strength, pf is "want" | "ok" | "not".
// Strong feelings beat everything else, even "rather not" (the host can try to talk those people round).
//   0 strong (4-5), rather do   1 strong, either way   2 strong, rather not
//   3 medium (3), rather do or either way   4 medium, rather not   5 weak feelings (1-2)
window.takeRank = function (n, pf) {
  if (n <= 2) return 5;
  if (n >= 4) return pf === "want" ? 0 : pf === "ok" ? 1 : 2;
  return pf === "not" ? 4 : 3;
};
window.RANK_LABEL = ["strong + keen", "strong", "strong, rather not", "medium", "medium, rather not", "weak feelings"];
// Guests who said "rather not" to karaoke, or "Please no" to performing, are never called by Surprise me. We promised them.
window.noKaraoke = function (g) { return pref(g, "karaoke") === "not"; };
