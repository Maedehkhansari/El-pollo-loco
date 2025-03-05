/**
 * Represents a movable object in the game.
 * This class provides basic movement, collision detection, and gravity handling.
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  hurt = false;

  /**
   * Checks if this object is colliding with another object.
   * @param {MovableObject} mo - The other object to check collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return this.x + this.width - 20 > mo.x && this.y + this.height > mo.y && this.x < mo.x + mo.width && this.y < mo.y + mo.height;
  }

  /**
   * Checks if the object is currently in a hurt state.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    return this.hurt;
  }

  /**
   * Checks if the object is dead (energy depleted).
   * @returns {boolean} True if the object's energy is zero, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Applies gravity to the object, making it fall unless on the ground.
   * @param {number} [groundY=300] - The Y-coordinate representing the ground level.
   */
  applyGravity(groundY = 300) {
    setInterval(() => {
      if (this.isAboveGround(groundY) || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 24);
  }

  /**
   * Checks if the object is above the ground.
   * @param {number} [groundY=300] - The Y-coordinate representing the ground level.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround(groundY = 300) {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < groundY;
    }
  }

  /**
   * Plays an animation by cycling through an array of images.
   * @param {string[]} images - An array of image paths for the animation.
   * @returns {number} The current image index in the animation cycle.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    return i;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30;
  }
}
