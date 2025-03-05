/**
 * Represents a Big Chicken, a type of chicken enemy.
 *
 * The `BigChecken` class extends the `Chicken` class and adds specific properties and behaviors for a "Big" version of the chicken enemy. This includes the chicken's walking animation, its death animation, and a sound effect that plays when the chicken is killed.
 *
 * @class BigChecken
 * @extends Chicken
 */
class BigChecken extends Chicken {
  /**
   * The y-coordinate for the Big Chicken.
   * @type {number}
   */
  y = 380;

  /**
   * The height of the Big Chicken.
   * @type {number}
   */
  height = 55;

  /**
   * The width of the Big Chicken.
   * @type {number}
   */
  width = 70;

  /**
   * The sound effect played when the Big Chicken is killed.
   * @type {Audio}
   */
  KILLED_SOUND = new Audio("assets/audio/chicken-crushed.mp3");

  /**
   * Creates an instance of `BigChecken` with specific walking and dead images.
   */
  constructor() {
    // Array of images for the chicken's walking animation.
    const IMAGES_WALKING = [
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    // Array of images for the chicken's dead state.
    const IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    // Call the parent class constructor with the walking and dead images.
    super(IMAGES_WALKING, IMAGES_DEAD);
  }

  /**
   * Toggles the sound for the Big Chicken's death, considering whether the game is muted.
   */
  toggleChickenKilledSound() {
    if (this.world.isMute) {
      this.KILLED_SOUND.pause(); // Pause the sound if the game is muted.
    } else {
      this.KILLED_SOUND.volume = 0.06; // Set the sound volume.
      this.KILLED_SOUND.play(); // Play the sound.
    }
  }
}
