# Hinda's 28th game night

Static site, no build step. Open `index.html`.

- `join.html` guest onboarding: name, karaoke song, spelling bee, hot-take picks, allergies and diet
- `host.html` guest list, allergy summary, karaoke "Surprise me", hot-take assignment, CSV export
- `screen.html` projector view (home, menu, karaoke, hot take)

## Hot-take trick
Guests pick "I agree" or "I disagree" on the takes they feel strongly about. The host reveal assigns each
person the OPPOSITE side (agree -> argue against, disagree -> argue for). The join form never says this.

## Going live
`config.js` has `DB_URL` empty, which is demo mode (data stays in one browser).
For the real night, create a Firebase Realtime Database, paste its URL into `DB_URL`, and set its rules to
allow read/write on the `baffuday28` path. Anyone with the URL can read guest data, so keep the host and
screen links private and delete the data after the party.

## Not built yet
Spelling bee screens and word list; hot-take timers and scoring; a passcode on the host page.
