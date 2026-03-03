/**
 * DOM SELECTORS
 */

const startButton = document.querySelector(".js-start-button");
const statusSpan = document.querySelector(".js-status");
const heading = document.querySelector(".js-heading");
const padContainer = document.querySelector(".js-pad-container");
const levelSelect = document.querySelector(".js-level-select");

/**
 * VARIABLES
 */
let computerSequence = [];
let playerSequence = [];
let maxRoundCount = 0;
let roundCount = 0;

const pads = [
  {
    color: "red",
    selector: document.querySelector(".js-pad-red"),
    sound: new Audio(
      "https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-1.mp3?raw=true"
    ),
  },
  {
    color: "green",
    selector: document.querySelector(".js-pad-green"),
    sound: new Audio(
      "https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-2.mp3?raw=true"
    ),
  },
  {
    color: "blue",
    selector: document.querySelector(".js-pad-blue"),
    sound: new Audio(
      "https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-3.mp3?raw=true"
    ),
  },
  {
    color: "yellow",
    selector: document.querySelector(".js-pad-yellow"),
    sound: new Audio(
      "https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-4.mp3?raw=true"
    ),
  },
];

/**
 * EVENT LISTENERS
 */

padContainer.addEventListener("click", padHandler);
startButton.addEventListener("click", startButtonHandler);

/**
 * EVENT HANDLERS
 */

/**
 * Called when the start button is clicked.
 * 1. setLevel() is called to set the level of the game
 * 2. Increments roundCount from 0 to 1
 * 3. Hides the start button
 * 4. Unhides the status element
 * 5. playComputerTurn() is called to start the game
 */
function startButtonHandler() {
  // setLevel() sets the number of rounds based on difficulty
  // playComputerTurn() starts the computer's first turn
  const selectedLevel = levelSelect ? parseInt(levelSelect.value) : 1;
  maxRoundCount = setLevel(selectedLevel);
  roundCount = 1;
  startButton.classList.add("hidden");
  if (levelSelect) levelSelect.classList.add("hidden");
  statusSpan.classList.remove("hidden");
  playComputerTurn();

  return { startButton, statusSpan };
}

/**
 * Called when one of the pads is clicked.
 * 1. Extracts color from data-color attribute
 * 2. Exits if color is falsy
 * 3. Finds the pad in the pads array
 * 4. Plays the pad's sound
 * 5. Calls checkPress(color)
 * 6. Returns the color
 */
function padHandler(event) {
  const { color } = event.target.dataset;
  if (!color) return;

  const pad = pads.find((pad) => pad.color === color);
  pad.sound.play();
  checkPress(color);

  return color;
}

/**
 * HELPER FUNCTIONS
 */

/**
 * Sets the level of the game.
 * Returns rounds for valid levels 1-4, or an error message otherwise.
 */
function setLevel(level = 1) {
  if (level === 1) return 8;
  if (level === 2) return 14;
  if (level === 3) return 20;
  if (level === 4) return 31;
  return "Please enter level 1, 2, 3, or 4";
}

/**
 * Returns a randomly selected item from a given array.
 */
function getRandomItem(collection) {
  if (collection.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}

/**
 * Sets the text content of a given HTML element with a given message.
 */
function setText(element, text) {
  element.textContent = text;
  return element;
}

/**
 * Activates a pad of a given color by playing its sound and lighting it up.
 * 1. Finds the pad in the pads array
 * 2. Adds the "activated" class
 * 3. Plays the sound
 * 4. After 500ms, removes the "activated" class
 */
function activatePad(color) {
  const pad = pads.find((pad) => pad.color === color);
  pad.selector.classList.add("activated");
  pad.sound.play();
  setTimeout(() => pad.selector.classList.remove("activated"), 500);
}

/**
 * Activates a sequence of colors passed as an array.
 * Uses setTimeout to add a 600ms delay between each pad activation.
 */
function activatePads(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => activatePad(color), (index + 1) * 600);
  });
}

/**
 * Allows the computer to play its turn.
 * 1. Makes pads unclickable
 * 2. Updates status message
 * 3. Updates heading with round info
 * 4. Adds a random color to computerSequence
 * 5. Activates the sequence
 * 6. Calls playHumanTurn() after the sequence completes
 */
function playComputerTurn() {
  padContainer.classList.add("unclickable");
  setText(statusSpan, "The computer's turn...");
  setText(heading, `Round ${roundCount} of ${maxRoundCount}`);

  const randomColor = getRandomItem(pads).color;
  computerSequence.push(randomColor);
  activatePads(computerSequence);

  setTimeout(() => playHumanTurn(roundCount), roundCount * 600 + 1000);
}

/**
 * Allows the player to play their turn.
 * 1. Removes "unclickable" class so pads are clickable
 * 2. Displays how many presses are left
 */
function playHumanTurn() {
  padContainer.classList.remove("unclickable");
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(statusSpan, `Your turn! ${remainingPresses} press(es) left.`);
}

/**
 * Checks the player's pad selection on each press.
 * 1. Adds color to playerSequence
 * 2. Gets the index of the press
 * 3. Calculates remaining presses
 * 4. Updates status
 * 5. Checks for wrong press — resets if mismatch
 * 6. Calls checkRound() if no presses remain
 */
function checkPress(color) {
  playerSequence.push(color);
  const index = playerSequence.length - 1;
  const remainingPresses = computerSequence.length - playerSequence.length;

  setText(statusSpan, `Your turn! ${remainingPresses} press(es) left.`);

  if (computerSequence[index] !== playerSequence[index]) {
    resetGame("Wrong! Game over. Try again!");
    return;
  }

  if (remainingPresses === 0) {
    checkRound();
  }
}

/**
 * Checks the round results.
 * 1. If playerSequence length matches maxRoundCount, player wins
 * 2. Otherwise increments roundCount, resets playerSequence, calls playComputerTurn()
 */
function checkRound() {
  if (playerSequence.length === maxRoundCount) {
    resetGame("Congratulations! You won! 🎉");
  } else {
    roundCount++;
    playerSequence = [];
    setText(statusSpan, "Nice! Keep going!");
    setTimeout(() => playComputerTurn(), 1000);
  }
}

/**
 * Resets the game to its original state.
 * 1. Resets computerSequence
 * 2. Resets playerSequence
 * 3. Resets roundCount
 */
function resetGame(text) {
  computerSequence = [];
  playerSequence = [];
  roundCount = 0;

  alert(text);
  setText(heading, "Simon Says");
  startButton.classList.remove("hidden");
  if (levelSelect) levelSelect.classList.remove("hidden");
  statusSpan.classList.add("hidden");
  padContainer.classList.add("unclickable");
}

/**
 * Please do not modify the code below.
 * Used for testing purposes.
 */
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;
