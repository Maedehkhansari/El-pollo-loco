/**
 * Represents a chicken enemy object in the game.
 * It extends from `MovableObject` and includes walking and death animations, as well as movement logic.
 */
class Chicken extends MovableObject {
  IMAGES_WALKING = [];
  IMAGES_DEAD = [];
  intervals;

  /**
   * Creates a new instance of a chicken enemy.
   * Initializes the walking and dead image arrays, and sets the movement speed.
   *
   * @param {Array<string>} IMAGES_WALKING - The array of image paths for the walking animation.
   * @param {Array<string>} IMAGES_DEAD - The array of image paths for the dead animation.
   */
  constructor(IMAGES_WALKING, IMAGES_DEAD) {
    super().loadImage(IMAGES_WALKING[0]);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGES_DEAD);

    this.IMAGES_WALKING = IMAGES_WALKING;
    this.IMAGES_DEAD = IMAGES_DEAD;

    // Randomly determine the chicken's speed
    this.speed = 0.15 + Math.random() * 0.25;
    this.intervals = [];
  }

  /**
   * Sets the world in which the chicken exists and initializes its position.
   * The chicken's X position is randomly placed within a defined range.
   *
   * @param {Object} world - The world object that contains the level information.
   */
  setWorld(world) {
    this.world = world;
    this.x = this.world.level.levelStart_enemy + Math.random() * this.world.level.levelEnd_enemy;
  }

  /**
   * Main animation loop for the chicken. It moves the chicken and updates its animation.
   * This method is called continuously to update the chicken's behavior.
   */
  animate() {
    this.moveChicken();
    this.playChicken();
  }

  /**
   * Handles the movement of the chicken. The chicken moves left continuously until it is dead.
   * Once the chicken dies, it moves off-screen after a short delay.
   */
  moveChicken() {
    this.intervals.push(
      setInterval(() => {
        if (!this.isDead()) {
          this.moveLeft();
        }
        if (this.isDead()) {
          setTimeout(() => {
            this.y = 3000; // Moves the chicken off-screen after death
          }, 2000);
        }
        this.otherDirection = false;
      }, 1000 / 60) // Runs at 60 frames per second
    );
  }

  /**
   * Plays the appropriate animation for the chicken based on its current state (dead or walking).
   * Continuously updates the animation at a set interval.
   */
  playChicken() {
    this.intervals.push(
      setInterval(() => {
        switch (true) {
          case this.isDead():
            this.playAnimation(this.IMAGES_DEAD);
            break;

          default:
            this.playAnimation(this.IMAGES_WALKING);
            break;
        }
      }, 200) // Updates animation every 200ms
    );
  }
}
