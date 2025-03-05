/**
 * Handles keyboard and touch controls for player movement and actions.
 *
 * The `Keyboard` class listens for key presses and touch events
 * to update movement and action states.
 *
 * @class
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false; // Jump action
  D = false; // Throw action

  /**
   * Initializes the keyboard and touch event listeners.
   *
   * The constructor sets up:
   * - Keydown event listeners for movement and actions.
   * - Keyup event listeners to stop movement/actions.
   * - Touch event listeners for mobile support.
   */
  constructor() {
    this.addKeydownMovement();
    this.addKeyupMovement();
    this.addTouchMovement();
    this.addTouchJump();
    this.addTouchThrow();
  }

  /**
   * Adds event listeners for keydown actions.
   *
   * This function updates movement/action states when keys are pressed.
   *
   * - Arrow keys (`←`, `↑`, `→`, `↓`) control movement.
   * - Spacebar (`SPACE`) triggers a jump.
   * - `D` key triggers a throw action.
   */
  addKeydownMovement() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 37) {
        keyboard.LEFT = true;
      }
      if (e.keyCode === 38) {
        keyboard.UP = true;
      }
      if (e.keyCode === 39) {
        keyboard.RIGHT = true;
      }
      if (e.keyCode === 40) {
        keyboard.DOWN = true;
      }
      if (e.keyCode === 32) {
        keyboard.SPACE = true;
      }
      if (e.keyCode === 68) {
        keyboard.D = true;
      }
    });
  }

  /**
   * Adds event listeners for keyup actions.
   *
   * This function resets movement/action states when keys are released.
   * It also checks if the Enter key (`Enter`) is pressed to pause/resume the game.
   */
  addKeyupMovement() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 37) {
        keyboard.LEFT = false;
      }
      if (e.keyCode === 38) {
        keyboard.UP = false;
      }
      if (e.keyCode === 39) {
        keyboard.RIGHT = false;
      }
      if (e.keyCode === 40) {
        keyboard.DOWN = false;
      }
      if (e.keyCode === 32) {
        keyboard.SPACE = false;
      }
      if (e.keyCode === 68) {
        keyboard.D = false;
      }

      // Handle game pause/resume with the Enter key
      if (e.keyCode === 13) {
        if (world !== undefined) {
          world.isGamePaused() ? resumeGame() : pauseGame();
        }
      }
    });
  }

  /**
   * Adds touch event listeners for left and right movement controls.
   *
   * This function:
   * - Detects touch start and sets `LEFT` or `RIGHT` to `true`.
   * - Detects touch end and sets `LEFT` or `RIGHT` to `false`.
   */
  addTouchMovement() {
    let navLeft = document.getElementById("nav-left");
    let navRight = document.getElementById("nav-right");

    navLeft.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    navLeft.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    navRight.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    navRight.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
  }

  /**
   * Adds touch event listeners for the throw action (`D` key equivalent).
   *
   * This function:
   * - Detects touch start and sets `D` to `true`.
   * - Detects touch end and sets `D` to `false`.
   */
  addTouchJump() {
    let navThrow = document.getElementById("nav-throw");

    navThrow.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });
    navThrow.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.D = false;
    });
  }

  /**
   * Adds touch event listeners for the jump action (`SPACE` key equivalent).
   *
   * This function:
   * - Detects touch start and sets `SPACE` to `true`.
   * - Detects touch end and sets `SPACE` to `false`.
   */
  addTouchThrow() {
    let navJump = document.getElementById("nav-jump");

    navJump.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    navJump.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
  }
}
