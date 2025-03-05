/**
 * Represents the game world including the character, enemies, level, and sounds.
 */
class World {
  canvas;
  ctx;
  keyboard;
  intervals;
  animationFrame;

  character;
  endboss;
  level;

  healthStatusBar;
  coinStatusBar;
  bottleStatusBar;
  endbossStatusBar;

  startGameBackGround;

  BACKGROUND_SOUND;
  GAMEOVER_SOUND;
  WINGAME_SOUND;
  PAUSEGAME_SOUND;
  UNPAUSEGAME_SOUND;

  start = false;
  isMute = false;
  isPaused = false;
  camera_x = 0;
  throwableObjects = [];

  /**
   * Creates an instance of the World class.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {Keyboard} keyboard - The keyboard object for handling user input.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.intervals = [];
    this.animationFrame = null;
    this.character = new Character();
    this.endboss = new Endboss();
    this.level = new LevelOne();
    this.startGameBackGround = new StartGameBackground();
    this.setStatusBar();
    this.setWorld();
    this.setGameSounds();
    this.draw();
    this.setGameIntervals();
    this.playGameAnimation();
    this.startGame();
  }

  /**
   * Starts the game after a delay.
   */
  startGame() {
    setTimeout(() => {
      this.start = true;
      controls.showControlWrapper();
    }, 2000);
  }

  /**
   * Sets up the status bars for the game.
   */
  setStatusBar() {
    this.healthStatusBar = new HealthStatusBar();
    this.coinStatusBar = new CoinStatusBar();
    this.bottleStatusBar = new BottleStatusBar();
    this.endbossStatusBar = new EndbossStatusBar();
  }

  /**
   * Initializes the game world objects like character, endboss, and level.
   */
  setWorld() {
    this.character.setWorld(this);
    this.endboss.setWorld(this);
    this.level.enemies.forEach((enemy) => {
      enemy.setWorld(this);
    });
    this.level.coins.forEach((coin) => {
      coin.setWorld(this);
    });
    this.level.bottles.forEach((bottle) => {
      bottle.setWorld(this);
    });
  }

  /**
   * Sets the background music and other game sounds.
   */
  setGameSounds() {
    this.BACKGROUND_SOUND = new Audio("assets/audio/background-music.mp3");
    this.BACKGROUND_SOUND.volume = 0.02;
    this.BACKGROUND_SOUND.play();

    this.GAMEOVER_SOUND = new Audio("assets/audio/game-over.mp3");
    this.GAMEOVER_SOUND.volume = 0.2;

    this.WINGAME_SOUND = new Audio("assets/audio/win-game.mp3");
    this.WINGAME_SOUND.volume = 0.2;

    this.PAUSEGAME_SOUND = new Audio("assets/audio/pause.mp3");
    this.PAUSEGAME_SOUND.volume = 0.2;

    this.UNPAUSEGAME_SOUND = new Audio("assets/audio/unpause.mp3");
    this.UNPAUSEGAME_SOUND.volume = 0.2;
  }

  /**
   * Starts the game animation by animating enemies, clouds, coins, and other objects.
   */
  playGameAnimation() {
    this.level.animateEnemies();
    this.level.animateClouds();
    this.level.animateCoins();
    this.character.animate();
    this.endboss.animate();
  }

  /**
   * Checks for collisions between various game objects.
   */
  checkCollisions() {
    this.character.checkCollisionsWithEndboss();
    this.character.checkCollisionsWithEnemies();
    this.character.checkCollisionsWithCoins();
    this.character.checkCollisionsWithBottles();
    this.endboss.checkCollisionsWithThrowableObjects();
  }

  /**
   * Determines if the game is over.
   *
   * @returns {boolean} - True if the game is over, false otherwise.
   */
  isGameOver() {
    return this.character.died;
  }

  /**
   * Determines if the game has been won.
   *
   * @returns {boolean} - True if the game is won, false otherwise.
   */
  isGameWin() {
    return this.endboss.died;
  }

  /**
   * Determines if the game has started.
   *
   * @returns {boolean} - True if the game has started, false otherwise.
   */
  isGameStart() {
    return this.start;
  }

  /**
   * Determines if the game is paused.
   *
   * @returns {boolean} - True if the game is paused, false otherwise.
   */
  isGamePaused() {
    return this.isPaused;
  }

  /**
   * Toggles the background music on or off.
   */
  toggleBackgroundSound() {
    if (this.isMute) {
      this.playBackgroundSound();
      this.isMute = false;
    } else {
      this.pauseBackgroundSound();
      this.isMute = true;
    }
  }

  /**
   * Mutes the background sound.
   */
  muteBackgroundSound() {
    this.pauseBackgroundSound();
    this.isMute = true;
  }

  /**
   * Plays the background music.
   */
  playBackgroundSound() {
    this.BACKGROUND_SOUND.play();
  }

  /**
   * Pauses the background music.
   */
  pauseBackgroundSound() {
    this.BACKGROUND_SOUND.pause();
  }

  /**
   * Stops the background music and resets its state.
   */
  stopBackgroundSound() {
    if (this.BACKGROUND_SOUND) {
      this.BACKGROUND_SOUND.pause();
      this.BACKGROUND_SOUND.currentTime = 0;
      this.BACKGROUND_SOUND = null;
    }
  }

  /**
   * Starts the game over sound.
   */
  startGameOverSound() {
    if (this.GAMEOVER_SOUND) {
      this.GAMEOVER_SOUND.play();
      this.GAMEOVER_SOUND.currentTime = 0;
      this.GAMEOVER_SOUND = null;
    }
  }

  /**
   * Starts the win game sound.
   */
  startWinGameSound() {
    if (this.WINGAME_SOUND) {
      this.WINGAME_SOUND.play();
      this.WINGAME_SOUND.currentTime = 0;
      this.WINGAME_SOUND = null;
    }
  }

  /**
   * Draws the game scene, including all objects and screens.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawStartScreen();
    this.drawPlayGame();
    this.drawPauseGame();
    this.drawGameOverScreen();
    this.drawGameWinScreen();
    this.ctx.translate(-this.camera_x, 0);
    this.setRequestAnimationFrame();
  }

  /**
   * Draws the start screen.
   */
  drawStartScreen() {
    if (!this.isGameStart()) {
      this.addToMap(this.startGameBackGround);
      this.ctx.translate(this.camera_x, 0);
    }
  }

  /**
   * Draws the play game scene.
   */
  drawPlayGame() {
    if (this.isGameStart() && !this.isGameOver() && !this.isGameWin()) {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObject);
      this.addObjectsToMap(this.level.clouds);
      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.healthStatusBar);
      this.addToMap(this.coinStatusBar);
      this.addToMap(this.bottleStatusBar);
      this.addToMap(this.endbossStatusBar);
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.addToMap(this.endboss);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.enemies);
    }
  }

  /**
   * Draws the paused game scene.
   */
  drawPauseGame() {
    if (this.isGamePaused()) {
      this.addObjectsToMap(this.level.pauseBackgroundObject);
    }
  }

  /**
   * Draws the game over screen.
   */
  drawGameOverScreen() {
    if (this.isGameOver()) {
      this.addObjectsToMap(this.level.backgroundObject);
      this.ctx.translate(this.camera_x, 0);
      hideGame();
      showLoseScreen();
      if (!this.isMute) {
        this.startGameOverSound();
      }
      this.cleanUp();
    }
  }

  /**
   * Draws the win game screen.
   */
  drawGameWinScreen() {
    if (this.isGameWin()) {
      this.addObjectsToMap(this.level.backgroundObject);
      this.ctx.translate(this.camera_x, 0);
      hideGame();
      showWinScreen();
      if (!this.isMute) {
        this.startWinGameSound();
      }
      this.cleanUp();
    }
  }

  /**
   * Sets the animation frame for the game drawing loop.
   */
  setRequestAnimationFrame() {
    if (!this.isGameOver() && !this.isGameWin()) {
      let self = this;
      this.animationFrame = requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * Adds a list of objects to the game map.
   *
   * @param {Array} objects - The list of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the game map.
   *
   * @param {Object} mo - The object to add to the map.
   */
  addToMap(mo) {
    this.flipImage(mo);
    mo.draw(this.ctx);
    this.flipImageBack(mo);
  }

  /**
   * Flips the image horizontally based on the object's direction.
   *
   * @param {Object} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  }

  /**
   * Restores the flipped image after it is drawn.
   *
   * @param {Object} mo - The object whose flipped image is to be restored.
   */
  flipImageBack(mo) {
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  /**
   * Resets the game over and win status.
   */
  resetGameOverAndWinStatus() {
    this.character.died = false;
    this.endboss.died = false;
  }

  /**
   * Cleans up resources such as stopping sounds and clearing intervals.
   */
  cleanUp() {
    this.stopBackgroundSound();

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    this.clearAllIntervals();
  }

  /**
   * Sets the game intervals for checking collisions and other game actions.
   */
  setGameIntervals() {
    this.intervals.push(
      setInterval(() => {
        this.checkCollisions();
      }, 100)
    );
    this.intervals.push(
      setInterval(() => {
        this.character.checkThrowableObjects();
      }, 70)
    );
    this.intervals.push(
      setInterval(() => {
        this.character.checkKillEnemy();
      }, 10)
    );
  }

  /**
   * Clears all game intervals.
   */
  clearAllIntervals() {
    // Clean World intervals
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];

    this.character.clearAllInterval();
    this.endboss.clearAllInterval();
    this.level.clearEnemiesInterval();
    this.level.clearCloudsInterval();
    this.level.clearCoinsInterval();
  }

  /**
   * Pauses the game, including stopping sounds and clearing intervals.
   */
  pauseGame() {
    this.isPaused = true;
    this.pauseBackgroundSound();
    if (!this.isMute) {
      this.playPauseGameSound();
    }
    this.clearAllIntervals();
  }

  /**
   * Resumes the game, including restarting sounds and setting up intervals.
   */
  resumeGame() {
    this.isPaused = false;
    if (!this.isMute) {
      this.playBackgroundSound();
      this.playUnPauseGameSound();
    }
    this.setGameIntervals();
    this.playGameAnimation();
  }

  /**
   * Plays the pause game sound.
   */
  playPauseGameSound() {
    this.PAUSEGAME_SOUND.play();
    this.PAUSEGAME_SOUND.currentTime = 0;
  }

  /**
   * Plays the unpause game sound.
   */
  playUnPauseGameSound() {
    this.UNPAUSEGAME_SOUND.play();
    this.UNPAUSEGAME_SOUND.currentTime = 0;
  }
}
