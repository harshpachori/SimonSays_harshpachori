# 🎮 Simon Says — Interactive Memory Game

A web-based implementation of the classic Simon Says memory game, built with vanilla HTML, CSS, and JavaScript. Designed to be fun, colorful, and accessible for kids under 10 years old.

**Live Demo:** [Play the game here](https://YOUR-USERNAME.github.io/YOUR-REPO-NAME)

---

## 📋 Table of Contents

- [The Game](#the-game)
- [Setup & Installation](#setup--installation)
- [How to Play](#how-to-play)
- [Running the Tests](#running-the-tests)
- [User Story Mapping](#user-story-mapping)
- [Project Plan](#project-plan)
- [Implementation Plan](#implementation-plan)
- [Coding Trade-offs](#coding-trade-offs)
- [Challenges & Debugging](#challenges--debugging)
- [AI Tools Used](#ai-tools-used)
- [Project Summary](#project-summary)

---

## 🕹️ The Game

**Simon Says** is a memory game where the computer generates a random sequence of colored pad presses, and the player must repeat the sequence from memory. Each round adds one more color to the sequence. The game ends when the player makes a mistake — or wins by completing all rounds at the chosen difficulty level.

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- [VS Code](https://code.visualstudio.com/) with the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the game locally**
- Open the project folder in VS Code
- Right-click `index.html`
- Select **"Open with Live Server"**
- The game opens in your browser at `http://127.0.0.1:5500`

### Project Structure
```
your-repo/
├── index.html            ← Main HTML file
├── README.md             ← This file
├── assets/
│   ├── simon-says-sound-1.mp3
│   ├── simon-says-sound-2.mp3
│   ├── simon-says-sound-3.mp3
│   └── simon-says-sound-4.mp3
└── src/
    ├── index.js          ← Game logic
    └── styles.css        ← Styling
```

---

## 🎯 How to Play

1. Open the game in your browser
2. Select a difficulty level from the dropdown:
   - ⭐ Level 1 — Easy (8 rounds)
   - ⭐⭐ Level 2 — Medium (14 rounds)
   - ⭐⭐⭐ Level 3 — Hard (20 rounds)
   - ⭐⭐⭐⭐ Level 4 — Expert (31 rounds)
3. Click the **Start** button
4. Watch the computer light up a sequence of colored pads
5. Repeat the sequence by clicking the pads in the same order
6. Each round adds one more pad to the sequence
7. Make a mistake and the game resets — complete all rounds to win!

---

## 🧪 Running the Tests

Tests are split by user story. Run them from the project root:

```bash
# Run all tests
npm test

# Run tests for a specific user story
npm run test:1    # US-01: Basic Game Structure
npm run test:2    # US-02: Initialize Game
npm run test:3    # US-03: Play Computer's Turn
npm run test:4    # US-04: Play Player's Turn
npm run test:5    # US-05: Reset Game
```

### What the tests check
- `test:1` — Verifies the HTML has an h1 with `js-heading`, a start button with `js-start-button`, four pad divs, and all query selectors are defined
- `test:2` — Verifies `setLevel()` returns correct round counts and `startButtonHandler()` correctly initializes game state
- `test:3` — Verifies `getRandomItem()`, `setText()`, `activatePad()`, `activatePads()`, and `playComputerTurn()` behave as specified
- `test:4` — Verifies `playHumanTurn()`, `padHandler()`, `checkPress()`, and `checkRound()` handle player interaction correctly
- `test:5` — Verifies `resetGame()` clears all state and restores the UI

---

## ✅ User Story Mapping

### US-01: Basic Game Structure
| Acceptance Criteria | Implementation | Status |
|---|---|---|
| `h1` tag with `js-heading` class | `<h1 class="js-heading">Simon Says</h1>` in `index.html` | ✅ |
| Four pad divs with correct classes and `data-color` | Four `<div>` elements with `js-pad-red/green/blue/yellow` and `data-color` attributes | ✅ |
| Start button with `js-start-button` class | `<button class="start-button js-start-button">` in `index.html` | ✅ |
| Query selectors for status, heading, pad container | `statusSpan`, `heading`, `padContainer` defined via `querySelector()` in `index.js` | ✅ |
| `pads` array with four pad objects | Four objects in `pads[]` with `color`, `selector`, and `sound` properties | ✅ |

### US-02: Initialize Game
| Acceptance Criteria | Implementation | Status |
|---|---|---|
| `setLevel()` returns correct round counts | Returns 8/14/20/31 for levels 1–4, error string otherwise | ✅ |
| `startButtonHandler()` initializes game correctly | Reads level selector, sets `maxRoundCount`, increments `roundCount`, hides/shows UI, calls `playComputerTurn()` | ✅ |
| `startButtonHandler()` attached as event listener | `startButton.addEventListener("click", startButtonHandler)` | ✅ |

### US-03: Play Computer's Turn
| Acceptance Criteria | Implementation | Status |
|---|---|---|
| `getRandomItem()` returns random array element | Uses `Math.random()` and `Math.floor()` to return random item | ✅ |
| `setText()` updates element text content | Sets `element.textContent = text` | ✅ |
| `activatePad()` lights up pad and plays sound | Adds `activated` class, plays sound, removes class after 500ms | ✅ |
| `activatePads()` activates sequence with delays | Uses `forEach` with `setTimeout` at 600ms intervals | ✅ |
| `playComputerTurn()` runs computer turn | Adds random color to `computerSequence`, calls `activatePads()`, schedules `playHumanTurn()` | ✅ |

### US-04: Play Player's Turn
| Acceptance Criteria | Implementation | Status |
|---|---|---|
| `playHumanTurn()` enables pad clicks | Removes `unclickable` class, updates status with remaining presses | ✅ |
| `padHandler()` handles pad clicks | Finds pad by color, plays sound, calls `checkPress()` | ✅ |
| `checkPress()` validates player press | Compares press to computer sequence at same index, calls `resetGame()` on mismatch | ✅ |
| `checkRound()` advances or ends game | Calls `resetGame()` on win, increments `roundCount` and calls `playComputerTurn()` otherwise | ✅ |

### US-05: Reset Game
| Acceptance Criteria | Implementation | Status |
|---|---|---|
| `resetGame()` resets all state and UI | Clears sequences and `roundCount`; restores heading, start button, level selector; hides status | ✅ |

### US-06: Originality & Creativity
| Feature | Implementation |
|---|---|
| Kid-friendly visual theme | Animated pastel gradient background, `Fredoka One` font, large 180×180px pads |
| Per-pad glow animations | CSS `radial-gradient` and colored `box-shadow` on `.activated` class |
| Bouncing star title animation | CSS `@keyframes bounce` on `h1::before` and `h1::after` pseudo-elements |
| Pulsing start button | CSS `@keyframes pulse` animation on `.start-button` |
| Difficulty level selector | Dropdown wired to `setLevel()` via `parseInt(levelSelect.value)` |

### US-07: Deployment
| Acceptance Criteria | Status |
|---|---|
| Game deployed to GitHub Pages | ✅ Live at the link above |

---

## 📐 Project Plan

### Functions & Algorithms

**Sequence Validation** — `checkPress()` uses index-based comparison. Each player press is pushed to `playerSequence`, and its index is used to compare against the same position in `computerSequence`. A mismatch at any index immediately ends the game.

**Timed Sequence Playback** — `activatePads()` uses `setTimeout()` with a multiplied delay `(index + 1) * 600ms` so each pad activates sequentially. The human turn triggers after `roundCount * 600 + 1000ms` to ensure the full sequence finishes before the player can interact.

**Level System** — `setLevel()` uses `if` conditionals for readability and easy isolated testing.

**Event Delegation** — A single listener on `padContainer` handles all four pad clicks via `event.target.dataset.color`, keeping the code DRY.

---

## 🛠️ Implementation Plan

The project was implemented in user story order, each building on the last:

1. **US-01** — Built HTML skeleton with heading, button, status span, and four pad divs using `js-` prefixed classes to separate styling from JS targeting
2. **US-02** — Wired `startButtonHandler()` to read the level dropdown, set `maxRoundCount`, hide controls, and kick off the computer's first turn
3. **US-03** — Built sequence playback using `getRandomItem()` and `activatePads()` with staggered `setTimeout` delays
4. **US-04** — Added event delegation on `padContainer`; `checkPress()` validates each press and `checkRound()` handles end-of-round logic
5. **US-05** — `resetGame()` clears all state arrays and restores full UI to pre-game state
6. **US-06** — Applied kid-friendly CSS redesign and wired difficulty dropdown to `setLevel()`
7. **US-07** — Deployed via GitHub Pages from `main` branch root

---

## ⚖️ Coding Trade-offs

**Event Delegation vs. Individual Listeners** — One listener on `padContainer` instead of four. More efficient and DRY, with a small trade-off of needing to filter out container clicks with `if (!color) return`.

**`let` for Sequences** — `computerSequence` and `playerSequence` use `let` so `resetGame()` can reassign to fresh empty arrays rather than mutating in place. Cleaner reset logic at the cost of `window` test references not reflecting post-reset state.

**CSS Animations vs. JS Animations** — All animations handled in CSS to keep JS focused on game logic and leverage the browser's optimized rendering pipeline for smoother performance.

---

## 🔧 Challenges & Debugging

**1. Timing the Human Turn** — Calculating when to call `playHumanTurn()` required `roundCount * 600 + 1000ms`. Too short and players could click mid-animation; too long and the game felt sluggish.

**2. String vs. Integer Type Mismatch** — The `select` dropdown returns its value as a string (`"1"`), but `setLevel()` uses strict equality against integers. Fixed with `parseInt(levelSelect.value)`.

**3. Duplicate `index.js` Files** — Two `index.js` files existed (root and `src/`). The browser loaded the root version which had uninitialized `const` declarations, causing `SyntaxError: Missing initializer in const declaration`. Fixed by deleting the root file.

**4. GitHub Pages Cache** — After pushing fixes, the browser continued serving a cached broken file. Resolved with hard refresh (`Ctrl+Shift+R`) and testing in an incognito window.

---

## 🤖 AI Tools Used

| Tool | How It Was Used |
|---|---|
| **Claude (Anthropic)** | Pair-programming assistance for implementing user stories, CSS design, debugging support (type mismatch, duplicate file issue), and README writing |

AI was used to accelerate implementation and catch non-obvious bugs. All logic was reviewed and understood before being applied — AI supplemented rather than replaced the development process.

---

## 📝 Project Summary

- **Simon Says** was built from a provided starter codebase, with all game logic implemented across five core user stories covering HTML structure, game initialization, computer/player turns, and reset functionality.
- A difficulty level selector was added as an originality feature (US-06), surfacing the existing `setLevel()` logic through a kid-friendly dropdown. The biggest technical challenge was a type mismatch where the dropdown returned string values that broke strict equality in `setLevel()`, resolved by parsing with `parseInt()`.
- A duplicate `index.js` at the repo root caused a persistent `SyntaxError` traced using the browser's developer console — a practical debugging experience reinforcing the importance of verifying exactly which files the browser loads.


## Replit Screenshot

<img width="1882" height="974" alt="Simon Says - Replit Screenshot" src="https://github.com/user-attachments/assets/9be799e6-b03f-47ac-a627-90ec3e91f2e7" />





