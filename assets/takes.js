// The 11 hot takes, in the order they will be played (easy warm-ups first).
window.TAKES = [
  { id: "pineapple", text: "Pineapple belongs on pizza.", q: "Pineapple on pizza?", a: "Belongs on it", b: "Never" },
  { id: "shower",    text: "Showering at night is better than showering in the morning.", q: "When should you shower?", a: "Night", b: "Morning" },
  { id: "cereal",    text: "Cereal is better eaten dry than with milk.", q: "How do you eat cereal?", a: "Dry", b: "With milk" },
  { id: "onread",    text: "It's acceptable to leave someone on read for three days.", q: "Leaving someone on read for three days?", a: "Acceptable", b: "Not acceptable" },
  { id: "jollof",    text: "Nigerian jollof is better than Ghanaian jollof.", q: "Whose jollof wins?", a: "Nigerian", b: "Ghanaian" },
  { id: "dramatic",  text: "Men are actually more dramatic than women.", q: "Who is more dramatic?", a: "Men", b: "Women" },
  { id: "firstmove", text: "Women should make the first move.", q: "Who should make the first move?", a: "Women should", b: "Women shouldn't have to" },
  { id: "leaders",   text: "Women are better leaders than men.", q: "Who are better leaders?", a: "Women", b: "Men" },
  { id: "homemaker", text: "A woman can be the sole breadwinner and the man should be the primary homemaker.", q: "Woman as sole breadwinner, man as primary homemaker?", a: "Works for me", b: "Not for me" },
  { id: "partners",  text: "Men make better partners than women.", q: "Who make better partners?", a: "Men", b: "Women" },
  { id: "president", text: "The next President of Ghana should be under 40.", q: "The next President of Ghana?", a: "Under 40", b: "40 or older" }
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
window.singOf = function (g) { return g && g.sing ? +g.sing : 3; };
