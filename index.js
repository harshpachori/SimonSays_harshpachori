/**
 * DOM SELECTORS
 */

const startButton = document.querySelector(".js-start-button");
const statusSpan = document.querySelector(".js-status");
const heading = document.querySelector(".js-heading");
const padContainer = document.querySelector(".js-pad-container");
const levelSelect = document.querySelector(".js-level-select"); // NEW

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
    sound: new Audio("../assets/simon-says-sound-1.mp3"),
  },
  {
    color: "green",
    selector: document.querySelector(".js-pad-green"),
    sound: new Audio("../assets/simon-says-sound-2.mp3"),
  },
  {
    color: "blue",
    selector: document.querySelector(".js-pad-blue"),
    sound: new Audio("../assets/simon-says-sound-3.mp3"),
  },
  {
    color: "yellow",
    selector: document.querySelector(".js-pad-yellow"),
    sound: new Audio("../assets/simon-says-sound-4.mp3"),
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
 * 1. Reads the selected level from the dropdown and passes it to setLevel()
 * 2. Increments roundCount from 0 to 1
 * 3. Hides the start button and level selector
 * 4. Unhides the status element
 * 5. Calls playComputerTurn() to start the game
 */
function startButtonHandler() {
  const selectedLevel = parseInt(levelSelect.value); // NEW - read dropdown value
  maxRoundCount = setLevel(selectedLevel);            // NEW - pass level to setLevel()
  roundCount = 1;
  startButton.classList.add("hidden");
  levelSelect.classList.add("hidden");               // NEW - hide dropdown during game
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
 * HE
