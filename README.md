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
The form collects all 8, but you won't play them all.
After the last take, guests can add one of their own (optional). It lands in the PDF and in an "Own take" column on the host panel Guests tab and the CSV, so you can decide if it is spicy enough. On the host panel's Show control tab, each take shows
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
Wrong: the whole screen goes red, shakes, and the wrong-answer clip (assets/sounds/wrong.mp3) plays. Right: the screen goes yellow with confetti and a
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

Update: the bee sentence screen has the sentence on the left, the spelling options big and bold at the bottom centre, a small "Final answer?" under
a selected option and a small "Locked in" once locked. The "1 / 45" counter is gone (only "still standing" stays). On the host panel one tap selects a
spelling and only a quick double tap on the same spelling (within about 0.9s) locks it in; a slower second tap does not lock.

Balance pass (projector): announcement screens are centred (name screen, karaoke, hot-take statement, bee stage count, call-up, champion); lists and
rules stay left-aligned; the bee sentence sits top-left and a little wider, with the options a little higher at the bottom centre; the Tonight list fits at 16:9, 4:3 and 1080p.

## The promise to guests
The form tells guests that nobody is forced. Anyone who answers "I'd rather not" to Karaoke, or "Please no" to performing, is never called by Surprise me
(the host panel counts them as opted out). Guests are nudged, once, to try at least one thing if they put all three on "rather not", but they can still
choose that. Form error messages now sit above the buttons so they are not hidden under them.

## Form order (updated)
Name, then Tonight (the three activities: The Evil Spelling Bee, Twisted Hot Takes, Karaoke Roulette), then the song and the courage question
(skipped if the guest says no to Karaoke Roulette), then the Twisted hot takes (always asked, even if they said rather not), then food. The progress
count adapts (06 steps, or 04 when karaoke is skipped).

Copy update: the form asks guests to pick more than one activity ("But you can say no"). If fewer than two activities are on "rather do" or "either way",
the form nudges once and then lets them continue.

A prompt can be marked "fixed" (a sixth item in its entry in `assets/bee.js`) so it always uses the answer written for it instead of a random one. The capital / capitol prompt is fixed to "Capitol".

## Onboarding, latest
The first screen shows what is happening tonight (The Evil Spelling Bee, Karaoke Roulette, Twisted Hot Takes, starting at `START_TIME` in `config.js`, 6:30 PM)
and then the food menu. The activity question (rather do / either way / rather not) is the whole basis: there is no separate "how do you feel about performing" question
any more. Karaoke order is rather do first, then either way; rather not is never called. The Tonight step opens with "This is a safe space. If you say no, we will RESPEKK it."

Order now: intro (what is happening, 6:30 PM, the halal certified menu) > allergies and diet (optional, so people can list anything they cannot eat straight after seeing the menu) > name > the three activities > song (if karaoke) > Twisted hot takes.

## Ratings
The Tonight question is now a 1-5 rating per activity (5 Put me on first, 4 I'm happy to do it, 3 I'll do it if called, 2 Rather not, 1 Please no).
4 and 5 count as "rather do"; 3 is "either way"; 1 and 2 are a no, which we respect (never called for karaoke, last in line for hot takes, not put on the bee stage by default).
Karaoke is called 5 first, then 4, then 3. Older answers saved as want / ok / not still work (they read as 4 / 3 / 2).

## Guest form sounds (assets/sounds)

- Title page ("Hinda's 28th" and the details below it): `greeting.mp3` (salam alaikum / walaikum salam) and `yay-open.mp3` (the "yay", a quieter copy of `yay.mp3`) play together, once. The page says "Turn your sound on for the full experience." If the browser blocks sound on load, a "Can't hear it? Tap here." link appears; tapping it starts the yay and greeting (it stays hidden when sound plays by itself). Browsers and phones refuse sound until the first tap, so on a phone it starts on the guest's first tap on the title page; where the browser allows it, it plays by itself on load. Tapping "Begin to RSVP" stops both for good. After sound has started, a small speaker icon in the header mutes and unmutes everything.
- `bg.mp3` is the background music. It starts only at "Begin to RSVP" (the second slide), never on the title page, loops, and runs to the end. Its level is baked into the file (about -28 LUFS) because phones ignore code volume settings.
- Short effects pause the music while they play, then it carries on from where it was: `dmx.mp3` (Put me on first), `happy.mp3` (I'm happy to do it), `maybe.mp3` (I'll do it if called), `nemesis.mp3` (Rather not), `meow.mp3` (Please no), `hee-hee.mp3` (song added), `yay.mp3` (finish). Answer sounds stop when the guest leaves the screen.
- `wrong.mp3` is the projector's wrong-answer sound.

## Karaoke roulette (any time in the night)

- **Projector:** a real wheel with names on it. It spins about 8 seconds with a ticking sound, slows down, lands, then shows "You're up." with the name and song, confetti and the cheer. Press **r** on the projector page to test a spin without the host panel.
- **Host panel, Show control:** "Spin the roulette wheel". The wheel has everyone who is up for karaoke and has not sung yet. People who said "Put me on first" get 3 slices, "I'm happy to do it" 2, "I'll do it if called" 1, spread around the wheel, so the keenest come up more often. Tick "Strict" to put only the keenest group on the wheel. Nobody who said "Rather not" or "Please no" is ever on it.
- **"Not here? Spin again":** puts the person back in the pool for later and spins again.
- **Intermissions from any screen:** the "Karaoke roulette break" button at the top of the host panel works during the spelling bee, the hot takes, the menu, anything. "Back to the game" restores exactly what was on the projector. Spin between rounds, not in the middle of an answer.
- **Random reminders:** tick "Remind me at random times to spin, every X to Y minutes" (default 6 to 12). The host page shows a banner with a chime at random intervals; you decide whether to spin ("Spin now") or snooze ("Later"). Keep the host page open. The timer restarts after every spin.

## Importing a guest file

If answers arrive as screenshots instead of PDFs, type them into a guest-list JSON (an array of the same records the form saves) and use **Import guest file (.json)** on the Guests tab. Importing is safe to repeat: a guest with the same id, or the same exact name, is updated instead of duplicated, so a real PDF from the same person later just replaces the transcribed entry. Guest data (names, songs, allergies) is never committed to this repo because the repo and the site are public.

## Who is in each activity (the promise)

Every guest rates each activity 1 to 5. **3 (I'll do it if called), 4 and 5 are in. 1 (Please no) and 2 (Rather not) are never in that activity.**
- Spelling bee: "Load sign-ups onto stage" puts everyone on stage except guests who said 1 or 2. The table shows "opted out" instead of an Add button for them.
- Karaoke roulette: opted-out guests are never on the wheel.
- Twisted hot takes: opted-out guests are never assigned a side (they show under "Opted out").

## Who is called first

Everywhere, the keenest go first: **"Put me on first" (5), then "I'm happy to do it" (4), then "I'll do it if called" (3).**
- Karaoke roulette: the wheel holds the keenest group still waiting; when they have all sung it moves down to the next group. (Untick "Keenest first" on the Show control tab for a mixed wheel.)
- Spelling bee: "Load sign-ups onto stage" puts the keenest first in the call-up order, random inside each group.
- Twisted hot takes: everyone gets a go before anyone gets a second (fewest takes so far first), and inside that the keenest go first, then the strongest feelings. **Team size** is Auto, 3, 4, 5 or Everyone. Auto keeps the two teams even (never more than one person apart, never below 3): a side of 5 or fewer all play; bigger sides play in groups of 3, growing to 4 (9+ people on that side) and 5 (12+). Note: the sides can only be as even as the crowd's picks. If 21 of 23 people pick the same side, the other team is small however the host sets this.

## The twist and the roulette drama

- **Hot take on the projector, three steps from the host panel:** 1. Show take (the question). 2. Show what everyone picked (each person who plays this take is placed under what they really picked). 3. The twist: a drumroll, a full-screen "The twist." slam with a flash and shake, then every name is thrown across to the opposite side, with a "picked ..." note kept under each name so the room knows what each person originally picked.
- **Roulette fake-out:** the wheel spins about 6 seconds, slows right down and almost stops on the person just before the winner, holds there with a heartbeat, then creeps over to the winner. With only one or two names on the wheel it just spins and lands.

## The intro line

`INTRO` in `config.js` is an optional line shown above "You're up." (karaoke) and before "To the stage, please." (bee call-up). It is empty now. Put any new phrase there and it appears on both.

## The suspense sound

The build-up before a reveal (spelling bee answer, the roulette near-miss, the hot take twist) is set by `SUSPENSE` in `config.js`: `"none"` is silence (the default), `"synth"` brings back the old heartbeat drumroll, or give a file such as `"assets/sounds/suspense.mp3"`. A file plays for the length of the pause and fades out at the end.

## Roulette roll sound

`ROULETTE_SOUND` in `config.js` is the drum roll with a cymbal crash (`assets/sounds/roulette-roll.mp3`). It starts with the spin; the wheel's slow-down, the near-miss pause and the creep to the winner are all timed so the cymbal crash lands exactly as the wheel stops and "You're up." appears. `ROULETTE_LAND_MS` is where the crash sits in the file (5380 ms for this one). If you swap the file, change that number to the new crash time. Set `ROULETTE_SOUND` to `""` for the old silent timing.

## Pictures on bee prompts

`BEE_IMAGES` in `assets/bee.js` maps a prompt (its words in alphabetical order, joined with "/") to a picture. While that prompt is on the projector the picture sits on the right of the sentence. Right now: pair / pear shows `assets/bee/rick-ross-pears.png`. A missing file is just not shown.

## Sounds on bee prompts

`BEE_SOUNDS` in `assets/bee.js` (same keys as `BEE_IMAGES`) plays a sound once when that prompt first appears on the projector. Right now: pair / pear plays `assets/sounds/shoutout-pears.mp3` (the Rick Ross "shout out to all the pears" clip) together with his picture.

## Exact highlighting

`BEE_EXACT` in `assets/bee.js` lists prompts where only the exact words are highlighted, not forms such as plurals. Right now: pair / pear, so "pear" and "pair" are marked and "pears" is not. Other prompts keep the normal rule (the word plus endings like -s, -ed, -ing).

## Hosting from the projector page

Open `screen.html` (the projector page) and host the whole night from it, no separate host panel needed.
- **Setup is on the host screen, never on the projector.** On the host panel there is a **Night setup** tab: who goes on the bee stage (the keenest or everyone), how many hot takes to play, and whether to be offered karaoke breaks. It saves as you change it. Load the guest file there too (Guests tab, Import guest file).
- **Title page:** the **Start now** button (or Space / Enter) is only on the title page. It starts the spelling bee straight away using the Night setup. If no guests are loaded it shows a small line on the strip instead of starting.
- **The control strip** sits along the bottom and fades out after a few seconds. Move the mouse to bring it back. It always shows one big gold button for the next step, so you can press Space or Enter all night:
  - Spelling bee: Call up contestant, Show the sentence, tap their answer (or press 1, 2, 3), Lock it in, Next contestant, Show the champion. Then Next: Twisted Hot Takes.
  - Hot takes: Show what everyone picked, The twist, Next take, Finish the night.
- **Karaoke breaks:** after a random 4 to 7 bee turns (and between hot takes) the strip asks "Karaoke roulette break?" with a chime. **Yes, spin the wheel** runs the roulette; **Not now** asks again a few turns later. After the song, **Back to the show** carries on from the next contestant or take. **Karaoke now** starts a break any time.
- **Pause** puts "Be right back." on screen; **Resume** puts back exactly what was there, without replaying the reveal.
- **Skip question** gives the same contestant the next prompt and scores nobody. **Not here, skip person** takes them off the stage and calls the next one. **Skip take** moves to the next hot take. **End the bee now** crowns the champion on the spot.
- Keys: Space/Enter = the gold button, P pause, K karaoke now, S skip, 1 to 4 pick an answer, H show the strip.
- Settings in `config.js`: `KARAOKE_EVERY_MIN`, `KARAOKE_EVERY_MAX`, `TAKES_TO_PLAY`.
- It runs on the same game code as the host panel (loaded invisibly in the page), so both stay in sync. The projector page and host panel must be in the same browser for the demo storage to be shared, which is the case when you host from the projector page alone.

## Icebreaker debates (before the spelling bee)

Set on the host panel's **Night setup** tab: Off, 1 minute or 2 minutes per take. When on, **Start now** begins with all the hot takes (lightest to spiciest), one at a time.
- **The projector makes the groups, always 2 against 2.** People who really picked opposite sides are matched first, and the strongest feelings are matched with the strongest feelings (the hottest matchup is marked "Most heated"). When a take is lopsided, the rest are still put in balanced groups of 4: the two people in a group with the weakest feelings are asked to argue the side they did NOT pick (their name carries a small "picked ..." note). Nobody is left out unless fewer than 4 remain.
- **A big clock** runs on the projector. At zero it says "Time." with a bell and a flash. The strip has **Start the clock**, **+30 seconds**, **Next take**, **Skip this take**, **Skip the icebreaker**, and Pause (which freezes the clock).
- **Lopsided takes get an instruction on screen.** Where 70% or more picked one side, the screen tells everyone to talk about why someone would pick the other side. Jollof has its own line about Ghana and Nigerian jollof.
- The screen also says "Listen closely. Keep an open mind."
- **The groups are fixed and repeatable.** The same guests and shuffle number give the same groups in every browser. The Night setup tab lists the groups for all 8 takes, with **Shuffle the groups** and **Print the groups**. Final groups should be made after the last answers are in.
- People who said Rather not or Please no to hot takes are never put in a group.
- **Mixing.** The groups are spread so that people meet as many different people as possible across the 8 takes (the Night setup tab shows the result: with the 24 who can play, each person meets about 20 of the other 23 on average). A perfect "everyone meets everyone" is not possible with 2 against 2 groups and the sides people picked, so a handful of pairs never share a group.

## Who is here tonight

The host panel's **Night setup** tab starts with **Who is here tonight**: a big tap list of every guest. Tap people as they arrive (tap again to undo), or **Everyone is here** / **Clear all**. Only the people marked here are put in the icebreaker groups, the spelling bee stage, the karaoke wheel and the hot-take teams, so nobody is called to the stage who is not in the room. You can change it at any time: someone who arrives late joins the next icebreaker take, the wheel and the hot takes straight away (the bee stage is set when the bee starts; add a late arrival from the Spelling bee tab).
**Start now** on the projector will not start until at least 4 people are marked here, and tells you so on the strip. (Before anyone has been marked, the host panel treats everyone as present, which is only for testing.)

## Update: the controls are on the host page, the projector is only the game

The control strip and Start now button now live on the **host page**, in the **Run the show** tab. The projector page (`screen.html`) shows only the game: no buttons, no strip, no setup, nothing for the crowd to see except the game. This replaces "Hosting from the projector page" above.
- **One laptop, two windows:** open `host.html` and `screen.html`, drag the projector window to the projector (extended display), and run the night from the host window on the laptop's own screen. Both windows must be in the **same browser**.
- **Tablet and laptop:** needs the live database (see below). The tablet runs `host.html` (Run the show), the laptop runs `screen.html` on the projector.
- Everything else (Who is here, Night setup, the icebreaker, the bee, karaoke breaks, hot takes, pause, skips) is unchanged, just driven from the host page.

### Live database (so two devices share the game)
1. Create a free Firebase project and add a Realtime Database. Start it in test mode.
2. Paste its address (like `https://your-project-default-rtdb.firebaseio.com`) into `DB_URL` in `config.js`.
3. Open `host.html` on the tablet and load the guest file there. Open `screen.html` on the laptop. They share everything within a couple of seconds.
Test it at home first. With a database set, the guest form also saves each submission straight into it.

## The host panel, simplified

The host panel now opens on two steps: **1. Get ready** (load the guest file, tick who is here, pick the icebreaker length, the bee stage, how many hot takes, and whether to be asked about karaoke breaks) and **2. Run the show**. Everything else (Guests table, Who's coming, Allergies, Engagement, Spelling bee, Show control, the stats row, CSV export) is behind the **More** button. The icebreaker groups are in a collapsed "See the icebreaker groups" section.

## Everyone who said yes gets a karaoke turn

- The strip works out how often to offer a karaoke break from how many people still have to sing (everyone who is here, said Put me on first / happy / if called, and has not sung) against how many bee turns and hot takes are left. With about 20 singers it offers a break after almost every turn; with few singers, much less often (never more than every 7 turns). You still say yes or not now each time.
- **Karaoke finale.** After the last hot take, if anyone who said yes has not sung yet, the strip stays open with "Spin for the next singer" until they all have. "That is everyone" ends the night. "Finish the night now" asks first if some have not sung.
- People who said Rather not or Please no are never called, and people not ticked as here are never called.
- The Get ready page shows the cost: how many songs and roughly how many minutes (`MIN_PER_SONG` in `config.js`, default 5).

## Built for up to about 40 people

- **Icebreaker screen scales:** up to 6 groups on two columns, 7 to 12 groups on three columns, more on four. Tested with 40 guests (9 groups fit on one screen).
- **Most singers** (Get ready tab): everyone who said yes (default), or up to 12, 16, 20 or 24. The keenest are called first, the strip's breaks and the karaoke finale respect the cap, and the Get ready page shows the songs and minutes.
- **Spelling bee stage** is capped (`BEE_MAX_STAGE`, default 14, and `BEE_MAX_EVERYONE`, default 24) so a bigger crowd cannot run the bee past its 46 prompts. Everyone else is the audience.
- Time is the real limit: about 105 minutes plus about 4 minutes per guest if everyone who said yes sings. With 40 guests, cap the singers.

## Play page (one device, no separate host panel during the night)
`play.html` shows the projector full screen with the host buttons floating on top. Move the mouse, touch the screen or press a key and the buttons come up for 5 seconds, then hide so the room sees only the game. Space / Enter = the big gold button, P pause, K karaoke, S skip. "Setup" (top left, when the buttons are up) goes back to the host panel. Set up first on `host.html` (load guests, tick who is here, pick the settings), then open `play.html` in the same browser.
