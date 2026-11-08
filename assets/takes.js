// The 11 hot takes, in the order they will be played (easy warm-ups first).
window.TAKES = [
  { id: "pineapple", text: "Pineapple belongs on pizza." },
  { id: "shower",    text: "Showering at night is better than showering in the morning." },
  { id: "cereal",    text: "Cereal is better eaten dry than with milk." },
  { id: "onread",    text: "It's acceptable to leave someone on read for three days." },
  { id: "jollof",    text: "Nigerian jollof is better than Ghanaian jollof." },
  { id: "dramatic",  text: "Men are actually more dramatic than women." },
  { id: "firstmove", text: "Women should make the first move." },
  { id: "leaders",   text: "Women are better leaders than men." },
  { id: "homemaker", text: "A woman can be the sole breadwinner and the man should be the primary homemaker." },
  { id: "partners",  text: "Men make better partners than women." },
  { id: "president", text: "The next President of Ghana should be under 40." }
];
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
