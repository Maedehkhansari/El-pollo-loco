/**
 * Endboss class representing a boss enemy in the game.
 * Inherits from MovableObject.
 * Handles movement, animation, attack, and damage for the endboss.
 */
class Endboss extends MovableObject {
  /**
   * Height of the endboss.
   * @type {number}
   */
  height = 400;

  /**
   * Width of the endboss.
   * @type {number}
   */
  width = 250;

  /**
   * Y position of the endboss.
   * @type {number}
   */
  y = 55;

  /**
   * Array of images representing the alerting state of the endboss.
   * @type {string[]}
   */
  IMAGES_ALERTING = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * Array of images representing the walking state of the endboss.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Array of images representing the attacking state of the endboss.
   * @type {string[]}
   */
  IMAGES_ATTACKING = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Array of images representing the dead state of the endboss.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Array of images representing the hurt state of the endboss.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Sound played when the endboss is hurt.
   * @type {HTMLAudioElement}
   */
  HURT_SOUND = new Audio("assets/audio/big-chicken.mp3");

  /**
   * State indicating whether the endboss is walking.
   * @type {boolean}
   */
  walking = false;

  /**
   * State indicating whether the endboss is attacking.
   * @type {boolean}
   */
  attack = false;

  /**
   * State indicating whether the endboss is dead.
   * @type {boolean}
   */
  died = false;

  /**
   * Array of intervals for various animations and behaviors.
   * @type {number[]}
   */
  intervals;

  /**
   * Creates an instance of the Endboss class.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERTING[0]);
    this.loadImages(this.IMAGES_ALERTING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACKING);
    this.intervals = [];
    this.speed = 2;
  }

  /**
   * Sets the world object and initializes the endboss position.
   * @param {Object} world - The world object to set.
   */
  setWorld(world) {
    this.world = world;
    this.x = this.world.level.levelEnd_x;
  }

  /**
   * Reduces the energy of the endboss when hit and triggers the hurt animation.
   */
  hit() {
    this.energy -= 15;
    this.hurt = true;
    if (this.energy < 0) {
      this.energy = 0;
    }
    setTimeout(() => {
      this.hurt = false;
    }, 500);
  }

  /**
   * Starts the attacking state of the endboss.
   */
  startAttacking() {
    this.attack = true;
  }

  /**
   * Ends the attacking state of the endboss.
   */
  endAttacking() {
    this.attack = false;
  }

  /**
   * Checks if the endboss is walking.
   * @returns {boolean} True if walking, otherwise false.
   */
  isWalking() {
    return this.walking;
  }

  /**
   * Checks if the endboss is attacking.
   * @returns {boolean} True if attacking, otherwise false.
   */
  isAttacking() {
    return this.attack;
  }

  /**
   * Toggles the hurt sound based on the mute state of the world.
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
   * Animates the endboss by moving and playing the appropriate animation.
   */
  animate() {
    this.moveEndBoss();
    this.playEndBoss();
  }

  /**
   * Moves the endboss left and right within the game world.
   */
  moveEndBoss() {
    this.intervals.push(
      setInterval(() => {
        this.canStartWalking();
        this.moveLeftAndRight();
      }, 1000 / 60)
    );
  }

  /**
   * Determines whether the endboss can start walking.
   */
  canStartWalking() {
    if (this.world.character.x >= this.world.level.levelEnd_x - 600) {
      this.walking = true;
    }
  }

  /**
   * Moves the endboss left or right depending on the character's position.
   */
  moveLeftAndRight() {
    if (!this.isDead() && this.isWalking() && !this.isAttacking()) {
      if (this.world.character.x + this.world.character.width > this.x + this.width) {
        this.moveRight();
        this.otherDirection = true;
      } else {
        this.moveLeft();
        this.otherDirection = false;
      }
    }
  }

  /**
   * Plays the appropriate animation based on the current state of the endboss.
   */
  playEndBoss() {
    this.intervals.push(
      setInterval(() => {
        switch (true) {
          case this.isDead():
            this.playDeadAnimation();
            break;

          case this.isHurt():
            this.playHurtAnimation();
            break;

          case this.isAttacking():
            this.playAttackingAnimation();
            break;

          case this.isWalking():
            this.playWalkingAnimation();
            break;

          default:
            this.playAlertingAnimation();
            break;
        }
      }, 1000 / 5)
    );
  }

  /**
   * Plays the dead animation for the endboss.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y += 40;
    setTimeout(() => (this.died = true), 2000);
  }

  /**
   * Plays the hurt animation for the endboss.
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.toggleHurtSound();
  }

  /**
   * Plays the attacking animation for the endboss.
   */
  playAttackingAnimation() {
    this.playAnimation(this.IMAGES_ATTACKING);
  }

  /**
   * Plays the walking animation for the endboss.
   */
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Plays the alerting animation for the endboss.
   */
  playAlertingAnimation() {
    this.playAnimation(this.IMAGES_ALERTING);
  }

  /**
   * Checks for collisions between the endboss and throwable objects.
   */
  checkCollisionsWithThrowableObjects() {
    this.world.throwableObjects.forEach((throwableObject) => {
      if (this.isColliding(throwableObject) && !throwableObject.isHited) {
        throwableObject.hited();
        this.hit();
        this.world.endbossStatusBar.setPercentage(this.energy);
      }
    });
  }

  /**
   * Clears all active intervals.
   */
  clearAllInterval() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }
}
