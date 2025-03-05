let canvas;
let startPage;
let world;
let keyboard;
let controls;

/**
 * Initializes the game by setting up essential components.
 *
 * This function performs the following tasks:
 * 1. Creates a new instance of the `Keyboard` class to handle keyboard inputs.
 * 2. Creates a new instance of the `Controls` class to manage game controls.
 * 3. Calls `initElements()` to initialize game elements.
 *
 * @function
 */
function init() {
  keyboard = new Keyboard();
  controls = new Controls();
  initElements();
}

/**
 * Initializes and assigns DOM elements used in the game.
 *
 * This function retrieves various game-related elements from the DOM
 * by their IDs and assigns them to corresponding global variables.
 *
 * @function
 */
function initElements() {
  gameWrapper = document.getElementById("game-wrapper");
  startPage = document.getElementById("start-page");
  canvas = document.getElementById("canvas");
  pauseScreen = document.getElementById("pause-screen");
  helpScreen = document.getElementById("help-screen");
  imprintScreen = document.getElementById("imprint-screen");
  winLoseScreen = document.getElementById("win-lose-screen");
}

/**
 * Starts the game by initializing the game world and updating UI elements.
 *
 * This function performs the following actions:
 * - Creates a new `World` instance using the `canvas` and `keyboard` objects.
 * - Makes the game canvas visible.
 * - Hides the start page.
 * - Displays mobile-specific UI elements if necessary.
 * - Checks and applies the client's mute status.
 *
 * @function
 */
function startTheGame() {
  world = new World(canvas, keyboard);
  changeElementVisibility(canvas, "visible");
  changeElementVisibility(startPage, "hide");
  showMobileSizeElement();
  checkMuteStatusOfClient();
}

/**
 * Displays mobile-specific UI elements if the screen width is below 990px.
 *
 * This function ensures touchscreen controls and fullscreen controls
 * are displayed when the game is played on smaller screens.
 *
 * @function
 */
function showMobileSizeElement() {
  if (window.innerWidth < 990) {
    controls.showTouchscreenControls();
    controls.showFullScreenControl();
  }
}

/**
 * Checks and applies the mute status of the game based on local storage.
 *
 * This function retrieves the mute preference from local storage (`epl-mute` key).
 * If the value is `true`, it mutes the background sound and updates the mute control UI.
 *
 * @function
 */
function checkMuteStatusOfClient() {
  if (JSON.parse(localStorage.getItem("epl-mute")) === true) {
    world.muteBackgroundSound();
    controls.mutedMuteControle();
  }
}

/**
 * Hides the game interface and returns to a non-playing state.
 *
 * This function hides the game canvas, pause screen, and help screen.
 * It also updates the UI elements, including changing the pause icon
 * to a resume icon, hiding the control wrapper, touchscreen controls,
 * and exiting fullscreen mode.
 *
 * @function
 */
function hideGame() {
  changeElementVisibility(pauseScreen, "hide");
  changeElementVisibility(canvas, "hide");
  hideHelpScreen();
  controls.changePauseIconToResume();
  controls.hideControlWrapper();
  controls.hideTouchscreenControls();
  controls.closeFullscreen();
}

/**
 * Restarts the game by resetting game states and starting a new session.
 *
 * This function hides the win/lose screen, resets the game over and win status,
 * and calls `startTheGame()` to begin a new game session.
 *
 * @function
 */
function restartGame() {
  hideWinLoseScreen();
  world.resetGameOverAndWinStatus();
  startTheGame();
}

/**
 * Returns the player to the main menu.
 *
 * This function hides the game, resets game states, hides the win/lose screen,
 * and makes the start page visible again.
 *
 * @function
 */
function backToMainMenu() {
  hideGame();
  hideWinLoseScreen();
  world.resetGameOverAndWinStatus();
  changeElementVisibility(startPage, "visible");
}

/**
 * Displays the win screen to indicate the player has won.
 *
 * This function makes the `winLoseScreen` visible, removes the "lose" class,
 * and adds the "win" class to style it as a winning screen.
 *
 * @function
 */
function showWinScreen() {
  changeElementVisibility(winLoseScreen, "visible");
  winLoseScreen.classList.remove("lose");
  winLoseScreen.classList.add("win");
}

/**
 * Displays the lose screen to indicate the player has lost.
 *
 * This function makes the `winLoseScreen` visible, removes the "win" class,
 * and adds the "lose" class to style it as a losing screen.
 *
 * @function
 */
function showLoseScreen() {
  changeElementVisibility(winLoseScreen, "visible");
  winLoseScreen.classList.remove("win");
  winLoseScreen.classList.add("lose");
}

/**
 * Hides the win/lose screen and resets its styling.
 *
 * This function hides the `winLoseScreen` and removes both the "win"
 * and "lose" classes, resetting its appearance.
 *
 * @function
 */
function hideWinLoseScreen() {
  changeElementVisibility(winLoseScreen, "hide");
  winLoseScreen.classList.remove("win");
  winLoseScreen.classList.remove("lose");
}

/**
 * Pauses the game by calling the world's pause function and updating UI elements.
 *
 * This function:
 * - Calls `world.pauseGame()` to pause the game logic.
 * - Makes the pause screen visible.
 * - Changes the pause icon to indicate the game is paused.
 *
 * @function
 */
function pauseGame() {
  world.pauseGame();
  changeElementVisibility(pauseScreen, "visible");
  controls.changePauseIconToPaused();
}

/**
 * Resumes the game by calling the world's resume function and updating UI elements.
 *
 * This function:
 * - Calls `world.resumeGame()` to continue the game logic.
 * - Hides the pause screen.
 * - Changes the pause icon to indicate the game is running.
 *
 * @function
 */
function resumeGame() {
  world.resumeGame();
  changeElementVisibility(pauseScreen, "hide");
  controls.changePauseIconToResume();
}

/**
 * Displays the help screen.
 *
 * This function makes the help screen visible to provide guidance to the player.
 *
 * @function
 */
function showHelpScreen() {
  changeElementVisibility(helpScreen, "visible");
}

/**
 * Hides the help screen.
 *
 * This function hides the help screen when it is no longer needed.
 *
 * @function
 */
function hideHelpScreen() {
  changeElementVisibility(helpScreen, "hide");
}

/**
 * Displays the imprint (legal information) page.
 *
 * This function makes the imprint screen visible.
 *
 * @function
 */
function showImprintPage() {
  changeElementVisibility(imprintScreen, "visible");
}

/**
 * Hides the imprint (legal information) page.
 *
 * This function hides the imprint screen.
 *
 * @function
 */
function hideImprintPage() {
  changeElementVisibility(imprintScreen, "hide");
}

/**
 * Toggles the game's background sound and updates the mute control UI.
 *
 * This function:
 * - Calls `world.toggleBackgroundSound()` to toggle sound on or off.
 * - Updates the mute control UI.
 * - Saves the mute status in local storage (`epl-mute`).
 *
 * @function
 */
function toggleMuteSound() {
  world.toggleBackgroundSound();
  controls.toggleMuteControl();
  localStorage.setItem("epl-mute", JSON.parse(localStorage.getItem("epl-mute")) ? false : true);
}

/**
 * Changes the visibility of a given element.
 *
 * This function:
 * - Removes the "d-none" class if `status` is "visible", making the element appear.
 * - Adds the "d-none" class if `status` is "hide", hiding the element.
 *
 * @param {HTMLElement} element - The DOM element to modify.
 * @param {string} status - The visibility status ("visible" or "hide").
 *
 * @function
 */
function changeElementVisibility(element, status) {
  if (status === "visible") {
    element.classList.remove("d-none");
  }
  if (status === "hide") {
    element.classList.add("d-none");
  }
}

/**
 * Toggles fullscreen mode for the game.
 *
 * This function:
 * - Exits fullscreen if it is currently active.
 * - Enters fullscreen mode using `gameWrapper` if it is not active.
 *
 * @function
 */
function toggleFullScreen() {
  if (controls.isFullScreen) {
    controls.closeFullscreen();
  } else {
    controls.enterFullscreen(gameWrapper);
  }
}

/**
 * Toggles the touchscreen controls.
 *
 * This function:
 * - Hides touchscreen controls if they are enabled.
 * - Shows touchscreen controls if they are disabled.
 *
 * @function
 */
function toggleTouchscreenControls() {
  if (controls.isTouchScreenEnable) {
    controls.hideTouchscreenControls();
  } else {
    controls.showTouchscreenControls();
  }
}
