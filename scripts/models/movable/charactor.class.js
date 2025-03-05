/**
 * Represents the player character in the game.
 * Handles movement, animations, collisions, and interactions with other game entities.
 */
class Character extends MovableObject {
  height = 140;
  y = 300;
  speed = 10;

  /**
   * Array of images for idle animation.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Array of images for sleep animation.
   * @type {string[]}
   */
  IMAGES_SLEEP = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Array of images for walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Array of images for throwing animation.
   * @type {string[]}
   */
  IMAGES_THROWING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
  ];

  /**
   * Array of images for jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Array of images for dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
  ];

  /**
   * Array of images for hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Sound played when the character is walking.
   * @type {Audio}
   */
  WALKING_SOUND = new Audio("assets/audio/walking.mp3");

  /**
   * Sound played when the character is sleeping.
   * @type {Audio}
   */
  SLEEP_SOUND = new Audio("assets/audio/sleep.mp3");

  /**
   * Sound played when the character is hurt.
   * @type {Audio}
   */
  HURT_SOUND = new Audio("assets/audio/hurt.mp3");

  isJumping = false;
  isThrowBottle = false;
  waitingTime = 0;
  bottlesCount = 0;
  died = false;
  canThrowBottle = true;
  intervals = [];

  /**
   * Creates an instance of the character.
   */
  constructor() {
    super().loadImage(this.IMAGES_JUMPING[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_THROWING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.intervals = [];
  }

  /**
   * Checks if the character can kill an enemy based on collision and vertical position.
   * @param {MovableObject} mo - The enemy object.
   * @returns {boolean} True if the enemy can be killed, false otherwise.
   */
  isKillEnemy(mo) {
    const horizontalOverlap = this.x + this.width > mo.x && this.x < mo.x + mo.width;
    const heightDifferent = mo.y + mo.height - (this.y + this.height);
    const isPushing = heightDifferent < 60 && heightDifferent > 0;
    return horizontalOverlap && isPushing && !this.world.keyboard.SPACE;
  }

  /**
   * Checks if the character is walking (moving horizontally).
   * @returns {boolean} True if walking, false otherwise.
   */
  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character is Throwing bottle.
   * @returns {boolean}
   */
  isThrowing() {
    return this.isThrowBottle;
  }

  /**
   * Reduces the character's energy and plays hurt animation.
   */
  hit() {
    this.energy -= 2;
    this.hurt = true;
    if (this.energy < 0) {
      this.energy = 0;
    }
    setTimeout(() => {
      this.hurt = false;
    }, 150);
  }

  /**
   * Resets the waiting time and stops the sleep sound.
   */
  resetWaitTime() {
    this.waitingTime = 0;
    this.SLEEP_SOUND.pause();
  }

  /**
   * Toggles the walking sound depending on the game's mute state.
   */
  toggleWalkSound() {
    if (this.world.isMute) {
      this.WALKING_SOUND.pause();
    } else {
      this.WALKING_SOUND.volume = 0.04;
      this.WALKING_SOUND.play();
    }
  }

  /**
   * Toggles the sleep sound depending on the game's mute or paused state.
   */
  toggleSleepSound() {
    if (this.world.isMute || this.world.isPaused) {
      this.SLEEP_SOUND.pause();
    } else {
      this.SLEEP_SOUND.volume = 0.015;
      this.SLEEP_SOUND.play();
    }
  }

  /**
   * Toggles the hurt sound depending on the game's mute state.
   */
  toggleHurtSound() {
    if (this.world.isMute) {
      this.HURT_SOUND.pause();
    } else {
      this.HURT_SOUND.volume = 0.03;
      this.HURT_SOUND.play();
    }
  }

  /**
   * Handles character animation and movement.
   */
  animate() {
    this.moveCharactor();
    this.playCharactor();
  }

  /**
   * Starts the movement logic, checking for user input (left, right, jump).
   */
  moveCharactor() {
    this.intervals.push(
      setInterval(() => {
        if (this.canMoveRight()) {
          this.moveRight();
        }

        if (this.canMoveLeft()) {
          this.moveLeft();
        }

        if (this.canJump()) {
          this.jump();
          this.isJumping = false;
        }

        this.world.camera_x = -this.x + 130;
      }, 1000 / 60)
    );
  }

  /**
   * Checks if the character can move right.
   * @returns {boolean} True if the character can move right, false otherwise.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x;
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean} True if the character can move left, false otherwise.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > this.world.level.levelStart_x;
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} True if the character can jump, false otherwise.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Handles character animation based on current state (walking, jumping, idle, etc.).
   */
  playCharactor() {
    this.intervals.push(
      setInterval(() => {
        switch (true) {
          case this.isDead():
            this.playDeadAnimation();
            break;

          case this.isHurt():
            this.playHurtAnimation();
            break;

          case this.isAboveGround():
            this.playJumpAnimation();
            break;

          case this.isWalking():
            this.playWalkingAnimation();
            break;
            break;

          case this.isThrowing():
            this.playThrowingAnimation();
            break;

          default:
            this.playIdleAnimation();
            break;
        }
      }, 150)
    );
  }

  /**
   * Plays the dead animation and performs post-death actions.
   */
  playDeadAnimation() {
    let i = this.playAnimation(this.IMAGES_DEAD);
    if (i === this.IMAGES_DEAD.length - 1) {
      setInterval(() => {
        this.y += 10;
        this.speedY -= this.acceleration;
      }, 1000 / 24);
    }
    setTimeout(() => {
      this.died = true;
    }, 2000);
    this.resetWaitTime();
  }

  /**
   * Plays the hurt animation and handles the character being hurt.
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.toggleHurtSound();
    this.resetWaitTime();
  }

  /**
   * Plays the jump animation.
   */
  playJumpAnimation() {
    if (!this.isJumping) {
      let i = this.playAnimation(this.IMAGES_JUMPING);
      if (i === this.IMAGES_JUMPING.length - 1) {
        this.isJumping = true;
      }
    }
    this.resetWaitTime();
  }

  /**
   * Plays the walking animation.
   */
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.toggleWalkSound();
    this.resetWaitTime();
  }

  /**
   * Plays the throwing animation.
   */
  playThrowingAnimation() {
    this.playAnimation(this.IMAGES_THROWING);
    this.resetWaitTime();
  }

  /**
   * Plays the idle animation.
   */
  playIdleAnimation() {
    this.waitingTime += 150;

    if (this.waitingTime > 10000) {
      this.playAnimation(this.IMAGES_SLEEP);
      this.toggleSleepSound();
    } else if (this.waitingTime > 2000) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.currentImage = 0;
      this.loadImage(this.IMAGES_IDLE[0]);
    }
  }

  /**
   * Checks for collisions with the endboss and triggers the corresponding reactions.
   */
  checkCollisionsWithEndboss() {
    if (this.isColliding(this.world.endboss) && !this.world.endboss.isDead()) {
      this.hit();
      this.world.endboss.startAttacking();
      this.world.healthStatusBar.setPercentage(this.energy);
    } else {
      this.world.endboss.endAttacking();
    }
  }

  /**
   * Checks for collisions with enemies and reacts accordingly.
   */
  checkCollisionsWithEnemies() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.isColliding(enemy) && !enemy.isDead()) {
        this.hit();
        this.world.healthStatusBar.setPercentage(this.energy);
      }
    });
  }

  /**
   * Checks for collisions with coins and collects them.
   */
  checkCollisionsWithCoins() {
    this.world.level.coins.forEach((coin) => {
      if (this.isColliding(coin) && !coin.isCatched) {
        coin.catched();
        let catchedCoins = this.world.level.coins.filter((coin) => coin.isCatched === true);
        let coinPercent = (catchedCoins.length * 100) / this.world.level.coins.length;
        this.world.coinStatusBar.setPercentage(coinPercent);
      }
    });
  }

  /**
   * Checks for collisions with bottles and collects them.
   */
  checkCollisionsWithBottles() {
    this.world.level.bottles.forEach((bottle) => {
      if (this.isColliding(bottle) && !bottle.isCatched) {
        bottle.catched();
        this.bottlesCount++;
        let bottlePercent = (this.bottlesCount * 100) / this.world.level.bottles.length;
        this.world.bottleStatusBar.setPercentage(bottlePercent);
      }
    });
  }

  /**
   * Checks if the character can kill any enemy.
   */
  checkKillEnemy() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.isKillEnemy(enemy)) {
        enemy.energy = 0;
        if (enemy instanceof BigChecken) {
          enemy.toggleChickenKilledSound();
        }

        if (enemy instanceof SmallChecken) {
          enemy.toggleSmallChickenKilledSound();
          setTimeout(() => {
            enemy.KILLED_SOUND.pause();
          }, 1000);
        }
      }
    });
  }

  /**
   * Checks if the player can throw a bottle and updates the game state accordingly.
   * This method decreases the number of bottles, updates the bottle status bar,
   * and creates a new `ThrowableObject` to be thrown by the character.
   *
   * If the player has no bottles or the throw action is disabled, nothing happens.
   */
  checkThrowableObjects() {
    if (this.world.keyboard.D && this.bottlesCount > 0 && this.canThrowBottle) {
      this.canThrowBottle = false;
      this.isThrowBottle = true;
      this.bottlesCount--;
      let bottlePercent = (this.bottlesCount * 100) / this.world.level.bottles.length;
      this.world.bottleStatusBar.setPercentage(bottlePercent);

      this.resetWaitTime();
      let bottle = new ThrowableObject(this.x + 100, this.y);
      bottle.setWorld(world);
      this.world.throwableObjects.push(bottle);
      setTimeout(() => {
        this.isThrowBottle = false;
      }, 100);
      setTimeout(() => {
        this.canThrowBottle = true;
      }, 1000);
    }
  }

  /**
   * Clears all active intervals associated with this character.
   * This is useful for stopping animations or other interval-based behavior when the character
   * is no longer needed or when the game is paused/stopped.
   */
  clearAllInterval() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }
}
