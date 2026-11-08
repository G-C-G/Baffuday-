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
