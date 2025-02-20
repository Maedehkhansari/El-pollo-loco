class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.addKeydownMovement();
    this.addKeyupMovement();
    this.addTouchMovement();
    this.addTouchJump();
    this.addTouchThrow();
  }

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

      if (e.keyCode === 13) {
        if (world !== undefined) {
          world.isGamePaused() ? resumeGame() : pauseGame();
        }
      }
    });
  }

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
