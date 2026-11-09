# Hinda's 28th game night

Static site, no build step. Open `index.html`.

- `join.html` guest onboarding: name, karaoke song and willingness, hot-take picks, allergies and diet, and at the end which of spelling bee, hot takes and karaoke they'd rather do or rather not
- `host.html` guest list, allergy summary, karaoke "Surprise me", hot-take assignment, CSV export
- `screen.html` projector view (home, menu, karaoke, hot take)

## Hot-take trick
Guests pick "I agree" or "I disagree" on the takes they feel strongly about, then rate 1-5 (Whatever, Mildly, I have opinions, Don't start with me, I will argue about this). The host reveal assigns each
person the OPPOSITE side (agree -> argue against, disagree -> argue for). The join form never says this.

## Going live
`config.js` has `DB_URL` empty, which is demo mode (data stays in one browser).
For the real night, create a Firebase Realtime Database, paste its URL into `DB_URL`, and set its rules to
allow read/write on the `baffuday28` path. Anyone with the URL can read guest data, so keep the host and
screen links private and delete the data after the party.

## Not built yet (old list)
Spelling bee screens and word list; hot-take timers and scoring; a passcode on the host page.

## Karaoke
Everyone submits a song, then rates how they feel about performing (5 Put me on first, 4 Happy to sing,
3 I'll do it if called, 2 Rather not, 1 Please no). "Surprise me" draws at random from the most willing
tier that still has people, so 1s and 2s are only reached last. `KARAOKE_TARGET` in `config.js` (15) drives
the performed counter and a warning if too few people are willing.

## Preferences (last step of the form)
For each of spelling bee, hot takes and karaoke: "rather do", "either way" (default) or "rather not".
"Rather not" on hot takes puts them last in line for a side (set "people per side" on the host panel to cut each side down). On karaoke it drops them to the last tier (still reachable);
"rather do" lifts them to at least tier 4.

## Engagement tab (host)
Scores everyone 0-10 (preferences, karaoke willingness, hot takes picked), labels them High / Medium / Low,
and tags "All in" (wants all three) and "Watcher" (wants none, against at least two). Everyone should be in
at least one game: people not yet in one are listed first, lowest score first, with the game they are least against.
Karaoke calls and hot-take reveals mark people in automatically; "Mark in" covers the spelling bee until it is built.

## Hot-take call order
When "people per side" cuts a side down, people are called in this order: strong feelings (4-5) who are keen,
strong with no preference, strong but "rather not", medium (3), medium "rather not", then weak feelings (1-2).
Within a group, people who have not yet been in a hot take go first.

## Choosing tonight's takes
The form collects all 11, but you won't play them all. On the host panel's Show control tab, each take shows
how many people picked it, the split between the two sides, how many feel strongly (4-5) and the average strength.
Untick "Play" on the ones you are leaving out; that choice is saved.

## Spelling bee (host panel, "Spelling bee" tab)
45 homophone prompts in 5 rounds (`assets/bee.js`). Everyone who chose "rather do" the bee starts on stage
("Load sign-ups onto stage"; add or remove people in the table). The contestant stands with their back to the
screen. The projector shows only the sentence; the host sees the word, the question to ask and the sentence to read.
Correct: they stay on. Incorrect: they sit down and the projector reveals all spellings with meanings.
Last one standing wins. The rules slide, a "still standing" count and a winner slide are on the projector too.

Rounds advance by pass: everyone still standing gets one turn per round, then the next, harder round starts
(prompts 1-10 easy through the last ten hardest). "Next prompt" calls the next person up on the projector by name;
"Show sentence" then puts their sentence on screen. Correct / Incorrect updates the table; wrong sits them down.

The projector shows the sentence plus the possible spellings (in a random order). The contestant spells their answer
out loud; the host taps the spelling they gave (or types something else) and the system marks it right or wrong
against the correct word. Correct / Incorrect buttons remain as a manual override if the host mishears.

## Right / wrong effects (projector)
Wrong: the whole screen goes red, shakes, and a loud buzzer plays. Right: the screen goes yellow with confetti and a
cheer that grows with the round and with how few people are left (levels 1-5). The champion screen is level 6, the biggest.
Browsers block sound until someone clicks the projector page once, so click it before the night.
Test keys on the projector page: 1-5 celebration sizes, 6 champion, b buzzer.

## Answers PDF (works with no database)
At the end of the join form, guests download a PDF of their answers (or share it on a phone that supports it) and send
it to the host, for example on WhatsApp. The PDF is readable and also carries the answers as a code, so on the host
panel's Guests tab "Import answer PDFs" reads many files at once. Importing the same PDF again updates that guest,
and a file that is not an answers PDF is reported and skipped. `assets/jspdf.umd.min.js` is jsPDF 2.5.1 (MIT), kept
in the repo so it works without internet.
Limits: letters outside basic Latin show as "?" in the readable PDF text (the code inside is exact); people who fill the
form on two different browsers get two entries (match is by an id stored in the browser).

## Who's coming (host panel)
Paste your expected guests, one per line (optional phone after a comma). Imported or submitted answers tick people off
by name; "Ama K." matches "Ama Kwarteng" automatically, and anything uncertain goes into a small "does not match
anyone" list where you pick who it is or mark it as a plus-one. The table shows who has sent and who has not, and a
chase list of the rest can be copied.

## Design system
Yellow is the world, blue is the voice. Yellow `#F5D76E` and blue `#08183E` (the shades from the first onboarding build),
with light yellow `#FBE9A6` for surfaces and white only for rare highlights. No burgundy, no extra accent colours.
Dramatic projector moments invert it: blue ground, yellow type (call-ups, karaoke, wrong, champion). A correct answer is
a yellow screen in a blue frame that thickens in later rounds. Instrument Serif for display, Inter for everything else,
8px spacing, 6px radius, almost no shadows. Tokens live in `assets/style.css`.
The guest form is one question per screen (01 / 06 ... lock it in). The projector shows one idea per screen. The running order
on the "Tonight" screen is `LINEUP` in `config.js`. The bee screens use a monoline bee mark. Wrong answers buzz and shake the
screen; correct answers cheer, louder in later rounds. No confetti.

## Highlighted homophones
On the projector the sentence shows every word from the spelling set in a highlighted block ("You're", "your"), so the audience
can follow a long sentence. It highlights the whole set, so it never reveals which spelling is being asked for. Plural and
past forms (insured, canvassed, currants) highlight too; checked against all 45 prompts.

## Spelling bee sentences
The sentences are the savage, dry-host version (`assets/bee.js`). Four were adjusted so the game still works: sentence 2 now uses
to / too / two correctly; "insure" and "waste" were added to the ensure and waist sentences (they were missing from the sets);
and the questions for too, sole, current and hoard were rewritten to match how those words are used in the new sentences.
On the host panel the word being asked for is underlined in the sentence and the other homophones are bold, so you know where
to lean in as you read. The projector highlights the whole set without saying which one is the answer.

## No meanings (the chaos rule)
The meaning is never given. The projector shows only the sentence (homophones highlighted) and the spellings; the host reads the
sentence leaning on the target word (underlined on the host panel) and the contestant has to guess the spelling. The host can tap
the spelling they gave and the system says right or wrong. The meanings only appear in the reveal afterwards. The host panel
keeps a dimmed "for arguments only" meaning line; the meaning is never sent to the projector before the answer.

## Sudden death (spelling bee)
Wrong guesses sit people down until only two are left (`BEE_SUDDEN_DEATH_AT` in `config.js`). From then on nobody can be
eliminated: they keep taking turns, round after round, and the first correct guess wins the whole game. The projector labels
those screens "Sudden death", a wrong guess says nobody is out, and the winning guess gets the biggest celebration. The host's
"Show winner" button then shows the champion. This also means the bee can never end with nobody standing.

## Random answers (no tells)
Each prompt's answer is chosen at random from its word set (`BEE_RANDOM_ANSWER` in `config.js`; set it to `false` to use the fixed
answer in `assets/bee.js`). It is seeded when you press "Load sign-ups onto stage", so a refresh keeps the same answer for each prompt
but every game is different. This removes tells such as the answer being the word that appears most often in the sentence. The
host panel shows the chosen word and underlines it in the sentence; the "for arguments only" meaning follows the chosen word.

## Game-show flow ("Is that your final answer?")
On the host panel, tapping a spelling no longer judges it. The projector highlights the chosen option and asks "Is that your final answer?",
and the host panel offers "Yes, final answer" or "No, let them think" (No clears the choice and returns to the sentence). Yes judges it:
a right answer turns that option green with a little confetti and a cheer (bigger in later rounds); a wrong answer turns the whole screen black, slams a big
red X stamp on it and plays a long talent-show buzzer. Then the normal Correct / Wrong screen follows with the real answer.
Green and red appear only in these answer moments; the rest of the app stays yellow and blue. The old Correct / Incorrect override buttons
still judge instantly (no confirm step) for when you mishear.

The moment between "Yes, final answer" and the reveal is held on purpose: the chosen option throbs, a drumroll speeds up, then a beat of
silence. Round 1 waits about 2.4s; later rounds wait longer, sudden death adds 1.5s, and the finale (or the winning guess) waits about 6.5s
on a dark blue screen. The X is a bold, sharp-cornered red X with no curves.

Update: nothing says "Correct" or "Wrong" any more. After the pause, a right answer fires confetti from the left and right edges (a little in
round 1, the most at the finale) and the chosen option stays selected (no green). A wrong answer turns the screen black with the red X. In both
cases the screen that follows shows the correct word, large, with the other spellings and their meanings underneath.

Update: the answer screen is now just the word. Right: the correct word, front and centre, with the side confetti and the win sound.
Wrong: a black screen with the red X on the left; on the right the word they said, crossed out, and the correct word under it. The
other spellings and their meanings no longer appear on the projector. The screen stays until you press Next prompt.

The fake-out: after "Yes, final answer" and the drumroll, the word they said appears in the middle exactly like a winning answer (yellow, blue
frame). Right and wrong look identical for a beat (longer at the finale). Then the truth: a right answer fires the confetti and win sound; a wrong
answer cuts instantly to black with a punch flash, the word is struck through, the red X slams down, the buzzer sounds and the correct word drops in underneath.
