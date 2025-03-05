/**
 * Represents a coin in the game.
 * Coins can be collected by the player and play an animation when picked up.
 */
class Coin extends MovableObject {
  y = 163;
  height = 100;
  width = 100;

  /** Array of images for the coin animation. */
  IMAGES = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

  /** Flag to check if the coin has been collected. */
  isCatched = false;

  /** Sound effect for picking up the coin. */
  PICKUP_SOUND = new Audio("assets/audio/pickup-coin.mp3");

  /** Array to store animation intervals. */
  intervals;

  /**
   * Creates an instance of a Coin.
   * Loads the coin images and applies gravity.
   */
  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.applyGravity(180);
    this.intervals = [];
  }

  /**
   * Sets the coin's position within the game world.
   *
   * @param {Object} world - The game world object.
   */
  setWorld(world) {
    this.world = world;
    this.x = this.world.level.levelStart_enemy + Math.random() * this.world.level.levelEnd_enemy;
  }

  /**
   * Starts the coin animation.
   * If the coin is not collected, it cycles through the coin images every 200ms.
   */
  animate() {
    this.intervals.push(
      setInterval(() => {
        if (!this.isCatched) {
          this.playAnimation(this.IMAGES);
        }
      }, 200)
    );
  }

  /**
   * Toggles the pickup sound when a coin is collected.
   * If the game is muted, the sound does not play.
   */
  togglePickupSound() {
    if (this.world.isMute) {
      this.PICKUP_SOUND.pause();
    } else {
      this.PICKUP_SOUND.currentTime = 2;
      this.PICKUP_SOUND.volume = 0.04;
      this.PICKUP_SOUND.play();
    }
  }

  /**
   * Handles the event when the coin is collected.
   * The coin jumps slightly and plays a shrinking animation.
   */
  catched() {
    this.isCatched = true;
    this.jump();
    this.togglePickupSound();
    this.catchCoinAnimation();
  }

  /**
   * Plays the animation when the coin is collected.
   * Shrinks the coin while flipping its direction.
   */
  catchCoinAnimation() {
    setTimeout(() => {
      setInterval(() => {
        if (this.width > 0) {
          this.loadImage(this.IMAGES[0]);
          this.otherDirection = !this.otherDirection;
          this.height -= 4;
          this.width -= 4;
          this.x += 2;
          this.y += 2;
        }
      }, 40);
      this.PICKUP_SOUND.pause();
    }, 500);
  }
}
