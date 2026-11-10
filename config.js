// Backend config. Leave DB_URL empty for demo mode (data stays in this browser only).
// For the real night: create a Firebase Realtime Database and paste its URL here,
// e.g. "https://your-project-default-rtdb.firebaseio.com"
window.GCG_CONFIG = {
  DB_URL: "",
  ROOT: "baffuday28",
  TITLE: "Hinda's 28th",
  // The party date, shown on the invitation above the time, e.g. "Saturday 14 March". Leave empty to show the time only.
  DATE: "Saturday 14 November",
  // Where it is, shown under the time on the invitation.
  VENUE: "Sid Apartments, Blohum Road, Dzorwulu",
  START_TIME: "6:30 PM",
  KARAOKE_TARGET: 15,
  // Spelling bee: when this many (or fewer) people are left, nobody can be eliminated; the first correct guess wins
  BEE_SUDDEN_DEATH_AT: 2,
  // Spelling bee: pick which word of each pair is "the answer" at random every game (no tell from how often a word appears).
  // Set to false to use the fixed answer written in assets/bee.js.
  BEE_RANDOM_ANSWER: true,
  // An optional line above "You're up." (karaoke) and in the bee call-up. Empty = nothing. Put a new intro here whenever you find one you like.
  INTRO: "",
  // The build-up sound before a reveal (bee answer, roulette near-miss, the twist). "none" = silence. "synth" = the old heartbeat drumroll.
  // Or a file, e.g. "assets/sounds/suspense.mp3". It plays for the length of the pause and fades out.
  SUSPENSE: "none",
  // Karaoke roulette: the drum roll with a cymbal crash. It starts with the spin and the crash is when the wheel stops on the winner.
  // ROULETTE_LAND_MS = how far into the file the crash lands (milliseconds). Set ROULETTE_SOUND to "" to use the old timing with no roll.
  ROULETTE_SOUND: "assets/sounds/roulette-roll.mp3",
  ROULETTE_LAND_MS: 5380,
  // The running order shown on the "Tonight" projector screen
  LINEUP: ["The Evil Spelling Bee", "Karaoke Roulette", "Twisted Hot Takes", "???", "Cake"]
};
