/**
 * Manages game controls, including UI elements for muting, pausing,
 * touchscreen controls, and fullscreen mode.
 *
 * The `Controls` class initializes and manipulates various control elements
 * used in the game interface.
 *
 * @class
 */
class Controls {
  control;
  muteControl;
  pauseControl;
  touchControl;
  fullScreenControl;
  touchscreenControls;
  isFullScreen = false;
  isTouchScreenEnable = false;

  /**
   * Creates an instance of the `Controls` class and assigns DOM elements.
   *
   * The constructor retrieves control-related elements from the DOM, including:
   * - `control`: The main control wrapper.
   * - `muteControl`: The mute button.
   * - `pauseControl`: The pause button.
   * - `fullScreenControl`: The fullscreen button.
   * - `touchControl`: The button for enabling touchscreen controls.
   * - `touchscreenControls`: The container for touchscreen controls.
   */
  constructor() {
    this.control = document.getElementById("control");
    this.muteControl = document.getElementById("mute-control");
    this.pauseControl = document.getElementById("pause-control");
    this.fullScreenControl = document.getElementById("full-control");
    this.touchControl = document.getElementById("touch-control");
    this.touchscreenControls = document.getElementById("touchscreen-controls");
  }

  /**
   * Hides the main control wrapper.
   *
   * @function
   */
  hideControlWrapper() {
    this.control.classList.add("d-none");
  }

  /**
   * Shows the main control wrapper.
   *
   * @function
   */
  showControlWrapper() {
    this.control.classList.remove("d-none");
  }

  /**
   * Toggles the mute control button UI.
   *
   * @function
   */
  toggleMuteControl() {
    this.muteControl.classList.toggle("muted");
  }

  /**
   * Ensures the mute control is in the muted state.
   *
   * @function
   */
  mutedMuteControle() {
    this.muteControl.classList.add("muted");
  }

  /**
   * Shows the touchscreen controls and enables them.
   *
   * @function
   */
  showTouchscreenControls() {
    this.touchControl.classList.add("touched");
    this.touchscreenControls.classList.remove("d-none");
    this.isTouchScreenEnable = true;
  }

  /**
   * Hides the touchscreen controls and disables them.
   *
   * @function
   */
  hideTouchscreenControls() {
    this.touchControl.classList.remove("touched");
    this.touchscreenControls.classList.add("d-none");
    this.isTouchScreenEnable = false;
  }

  /**
   * Displays the fullscreen control button.
   *
   * @function
   */
  showFullScreenControl() {
    this.fullScreenControl.classList.remove("d-none");
  }

  /**
   * Changes the pause button to indicate the game is paused.
   *
   * @function
   */
  changePauseIconToPaused() {
    this.pauseControl.classList.add("paused");
  }

  /**
   * Changes the pause button to indicate the game is running.
   *
   * @function
   */
  changePauseIconToResume() {
    this.pauseControl.classList.remove("paused");
  }

  /**
   * Enters fullscreen mode for the given element.
   *
   * This function:
   * - Requests fullscreen mode on the provided `element`.
   * - Adds a "fullscreen" class to the game canvas.
   * - Updates the fullscreen control button UI.
   *
   * @param {HTMLElement} element - The DOM element to enter fullscreen mode.
   * @function
   */
  enterFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    canvas.classList.add("fullscreen");
    this.fullScreenControl.classList.add("fulled");
    this.isFullScreen = true;
  }

  /**
   * Exits fullscreen mode.
   *
   * This function:
   * - Checks if the document is in fullscreen mode.
   * - Exits fullscreen mode using the appropriate method.
   * - Removes the "fullscreen" class from the game canvas.
   * - Updates the fullscreen control button UI.
   *
   * @function
   */
  closeFullscreen() {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    canvas.classList.remove("fullscreen");
    this.fullScreenControl.classList.remove("fulled");
    this.isFullScreen = false;
  }
}
