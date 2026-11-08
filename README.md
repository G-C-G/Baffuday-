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
50 homophone prompts in 5 rounds (`assets/bee.js`). Everyone who chose "rather do" the bee starts on stage
("Load sign-ups onto stage"; add or remove people in the table). The contestant stands with their back to the
screen. The projector shows only the sentence; the host sees the word, the question to ask and the sentence to read.
Correct: they stay on. Incorrect: they sit down and the projector reveals all spellings with meanings.
Last one standing wins. The rules slide, a "still standing" count and a winner slide are on the projector too.
