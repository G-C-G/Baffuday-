// Backend config. Leave DB_URL empty for demo mode (data stays in this browser only).
// For the real night: create a Firebase Realtime Database and paste its URL here,
// e.g. "https://your-project-default-rtdb.firebaseio.com"
window.GCG_CONFIG = {
  DB_URL: "",
  ROOT: "baffuday28",
  TITLE: "Hinda's 28th",
  START_TIME: "6:30 PM",
  KARAOKE_TARGET: 15,
  // Spelling bee: when this many (or fewer) people are left, nobody can be eliminated; the first correct guess wins
  BEE_SUDDEN_DEATH_AT: 2,
  // Spelling bee: pick which word of each pair is "the answer" at random every game (no tell from how often a word appears).
  // Set to false to use the fixed answer written in assets/bee.js.
  BEE_RANDOM_ANSWER: true,
  // The running order shown on the "Tonight" projector screen
  LINEUP: ["The Evil Spelling Bee", "Karaoke Roulette", "Twisted Hot Takes", "???", "Cake"]
};
