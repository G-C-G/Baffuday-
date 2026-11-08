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

## Not built yet
Spelling bee screens and word list; hot-take timers and scoring; a passcode on the host page.

## Karaoke
Everyone submits a song, then rates how they feel about performing (5 Put me on first, 4 Happy to sing,
3 I'll do it if called, 2 Rather not, 1 Please no). "Surprise me" draws at random from the most willing
tier that still has people, so 1s and 2s are only reached last. `KARAOKE_TARGET` in `config.js` (15) drives
the performed counter and a warning if too few people are willing.

## Preferences (last step of the form)
For each of spelling bee, hot takes and karaoke: "rather do", "either way" (default) or "rather not".
"Rather not" on hot takes means never assigned a side. On karaoke it drops them to the last tier (still reachable);
"rather do" lifts them to at least tier 4.
