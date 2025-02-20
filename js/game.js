let canvans;
let gameMenu;
let world;
let keyboard;
let controls;

function init() {
  keyboard = new Keyboard();
  controls = new Controls();
  assignGameElements();
}

function assignGameElements() {
  gameWrapper = document.getElementById("game-wrapper");
  pauseWrapper = document.getElementById("pause-wrapper");
  canvans = document.getElementById("canvas");
  help = document.getElementById("help");
  gameMenu = document.getElementById("game-menu");
  restart = document.getElementById("restart");
  backToMenu = document.getElementById("back-to-menu");
}

function startTheGame() {
  world = new World(canvans, keyboard);
  canvans.classList.remove("d-none");
  gameMenu.classList.add("d-none");
  if (window.innerWidth < 990) {
    controls.showTouchscreenControls();
    controls.showFullScreenControl();
  }
}

function hideGame() {
  hidePauseElement();
  hideHelpPage();
  canvans.classList.add("d-none");
  gameMenu.classList.remove("d-none");
  controls.hideControlWrapper();
  controls.hideTouchscreenControls();
  controls.closeFullscreen();
}

function restartGame() {
  world.resetGameOverAndWinStatus();
  hideRestartAndBackToMenu();
  hidePauseElement();
  world = null;
  startTheGame();
}

function backToMainMenu() {
  world.resetGameOverAndWinStatus();
  hideRestartAndBackToMenu();
  world = null;
  hideGame();
}

function hideRestartAndBackToMenu() {
  restart.classList.add("d-none");
  backToMenu.classList.add("d-none");
}

function showRestartAndBackToMenu() {
  restart.classList.remove("d-none");
  backToMenu.classList.remove("d-none");
}

function pauseGame() {
  world.pauseGame();
  showPauseElement();
}

function resumeGame() {
  world.resumeGame();
  hidePauseElement();
}

function showPauseElement() {
  pauseWrapper.classList.remove("d-none");
  controls.changePauseIconToPaused();
}

function hidePauseElement() {
  pauseWrapper.classList.add("d-none");
  controls.changePauseIconToResume();
}

function showHelpPage() {
  help.classList.remove("d-none");
}

function hideHelpPage() {
  help.classList.add("d-none");
}

function toggleMuteSound() {
  world.toggleBackgroundSound();
  controls.toggleMuteControl();
}

function toggleFullScreen() {
  if (controls.isFullScreen) {
    controls.closeFullscreen();
  } else {
    controls.enterFullscreen(gameWrapper);
  }
}

function toggleTouchscreenControls() {
  if (controls.isTouchScreenEnable) {
    controls.hideTouchscreenControls();
  } else {
    controls.showTouchscreenControls();
  }
}
