# 🎮 Simon Says — Interactive Memory Game

A web-based implementation of the classic Simon Says memory game, built with vanilla HTML, CSS, and JavaScript. Designed to be fun, colorful, and accessible for kids under 10 years old.

---

## 🕹️ The Game

**Simon Says** is a memory game where the computer generates a random sequence of colored pad presses, and the player must repeat the sequence from memory. Each round adds one more color to the sequence. The game ends when the player makes a mistake — or wins by completing all rounds at the chosen difficulty level.

**Live Demo:** [Play the game here](https://harshpachori.github.io/SimonSays_harshpachori/)

---

## 📐 Project Plan

### Functions & Features

The game is broken into modular, single-responsibility functions:

| Function | Purpose |
|---|---|
| `setLevel(level)` | Returns the number of rounds for a given difficulty (1–4) |
| `startButtonHandler()` | Initializes the game on Start button click |
| `getRandomItem(collection)` | Returns a random element from an array |
| `setText(element, text)` | Updates the text content of a DOM element |
| `activatePad(color)` | Lights up and plays the sound for a single pad |
| `activatePads(sequence)` | Iterates the sequence with timed delays between each pad |
| `playComputerTurn()` | Runs the computer's turn — adds a color and plays the sequence |
| `playHumanTurn()` | Enables player interaction and shows remaining presses |
| `padHandler(event)` | Handles player pad clicks via event delegation |
| `checkPress(color)` | Validates each player press against the computer sequence |
| `checkRound()` | Determines if the player advances, wins, or loses |
| `resetGame(text)` | Resets all state and UI to the starting configuration |

### Key Features

- Four colored interactive pads with unique sounds
- Animated pad activation with glow effects
- Difficulty selector (Level 1–4) with varying round counts
- Real-time status messages guiding the player
- Responsive reset on win or loss
- Kid-friendly visual design with pastel animated background, large touch targets, and playful fonts

### Algorithms & Logic

**Sequence Validation** — `checkPress()` uses index-based comparison. Each player press is pushed to `playerSequence`, and its index is used to compare against the same position in `computerSequence`. A mismatch at any index immediately ends the game, preventing the player from continuing on a wrong sequence.

**Timed Sequence Playback** — `activatePads()` uses `setTimeout()` with a multiplied delay `(index + 1) * 600ms` so each pad activates one after another rather than simultaneously. The human turn is triggered after `roundCount * 600 + 1000ms` to ensure the full computer sequence finishes before the player can click.

**Level System** — `setLevel()` uses simple conditional returns rather than a lookup object or switch statement, keeping it readable and easy to test in isolation.

---

## 🛠️ Implementation Plan

The project was implemented in order of the user stories, which naturally built on each other:

1. **HTML Structure (US-01)** — Built the skeleton first: heading, start button, status span, and four pad divs with `data-color` attributes for event delegation. Added `js-` prefixed classes to separate styling concerns from JavaScript targeting.

2. **Game Initialization (US-02)** — Wired up `startButtonHandler()` to read the level selector, set `maxRoundCount`, hide the UI controls, and kick off the computer's first turn.

3. **Computer Turn (US-03)** — Implemented the sequence builder using `getRandomItem()` to randomly select from the `pads` array, then used `activatePads()` with `setTimeout` to animate each pad in order with proper delays.

4. **Player Turn (US-04)** — Used event delegation on `padContainer` (one listener instead of four) so `padHandler()` catches all pad clicks. `checkPress()` validates each press and `checkRound()` handles end-of-round logic.

5. **Reset Logic (US-05)** — `resetGame()` clears all state arrays, resets the round counter, and restores the UI to its pre-game state so the player can immediately start again.

6. **Originality (US-06)** — Applied a full kid-friendly CSS redesign using animated gradients, `Fredoka One` font, 3D button effects, per-pad glow animations, and added a difficulty level dropdown wired to `setLevel()`.

7. **Deployment (US-07)** — Deployed via GitHub Pages from the `main` branch root.

---

## ⚖️ Coding Trade-offs

### Event Delegation vs. Individual Listeners
Rather than attaching four separate click listeners (one per pad), a single listener was placed on the `padContainer`. This is more efficient and keeps the code DRY — the `padHandler` reads `event.target.dataset.color` to identify which pad was clicked. The trade-off is a small added complexity in filtering out clicks on the container itself (`if (!color) return`), but this is minimal.

### `const` vs. `let` for Sequences
`computerSequence` and `playerSequence` are declared with `let` even though they start as arrays, because `resetGame()` reassigns them to fresh empty arrays (`[] `) rather than mutating in place with `.length = 0`. Reassignment is cleaner and less error-prone than mutation in this context, but it does mean the `window` references at the bottom of the file point to the original arrays and won't reflect resets — an acceptable trade-off since those references are only for testing purposes.

### `setLevel()` Conditionals vs. Lookup Table
`setLevel()` uses `if` statements rather than an object lookup `{ 1: 8, 2: 14 }[level]`. The conditionals are slightly more verbose but are easier for beginners to read and debug, which aligns with the educational nature of this project.

### CSS Animations vs. JavaScript Animations
All animations (gradient shift, bounce, pulse, pad glow) are handled entirely in CSS rather than JavaScript. This keeps the JS focused purely on game logic and leverages the browser's optimized rendering pipeline for smoother animations.

---

## 💬 Justification, Challenges & Debugging

### Design Justifications
The toddler-friendly design was chosen deliberately: large pad targets (180×180px) accommodate small, imprecise fingers. High-contrast glowing activated states make it immediately obvious which pad lit up. The `Fredoka One` rounded font is legible for early readers. The animated pastel gradient avoids static or harsh backgrounds that might distract young players.

### Challenges

**1. Timing the Human Turn**
The trickiest logic was calculating when to call `playHumanTurn()` after the computer sequence finishes. The delay needed to account for the full sequence length: `roundCount * 600 + 1000ms`. Too short and the player could click before the last pad finished animating; too long and the game felt sluggish.

**2. `setLevel()` Passing Integer vs. String**
The dropdown `select` element returns its value as a **string** (`"1"`, `"2"`, etc.), but `setLevel()` uses strict equality (`===`) comparing against integers. This caused `setLevel()` to always return the error message. Fixed by parsing the value: `parseInt(levelSelect.value)` before passing it to `setLevel()`.

**3. Wrong `index.js` Being Loaded**
During development, there were two `index.js` files — one in the root and one in `src/`. The browser was loading the root version (which still had uninitialized `const` declarations), causing a `SyntaxError: Missing initializer in const declaration` on line 7. Resolved by deleting the root `index.js` and ensuring `index.html` correctly references `./src/index.js`.

**4. GitHub Pages Cache**
After pushing fixes, the browser continued serving the cached broken file. Resolved using hard refresh (`Ctrl+Shift+R`) and testing in an incognito window to bypass cache entirely.

---

## 🤖 AI Tools Used

| Tool | How It Was Used | Justification |
|---|---|---|
| **Claude (Anthropic)** | Code implementation guidance, CSS design, debugging support, README writing | Used as a pair-programming assistant to work through user stories systematically, catch bugs (wrong file path, string vs. integer type mismatch), and produce a cohesive kid-friendly design. All logic was reviewed and understood before being applied — AI supplemented rather than replaced the development process. |

AI assistance was used to accelerate implementation and debugging, particularly for identifying non-obvious issues like the `parseInt` fix for the level selector and the duplicate `index.js` file problem. Critical reasoning about game logic, timing, and design decisions was done independently first, with AI used to validate and refine those choices.

---

## 📝 Project Summary

- **Simon Says** was built from a provided starter codebase, with all game logic implemented from scratch across five user stories covering HTML structure, game initialization, computer/player turns, and reset functionality. A sixth user story added a kid-friendly visual redesign and a difficulty level selector, giving parents and young players control over game length. The biggest technical challenges were around timing (coordinating `setTimeout` delays for pad sequences) and a subtle type mismatch bug where the dropdown returned string values that broke strict equality checks in `setLevel()`. A file path issue with a duplicate `index.js` caused a persistent browser error that was ultimately traced using the browser's developer console — a valuable real-world debugging experience.
