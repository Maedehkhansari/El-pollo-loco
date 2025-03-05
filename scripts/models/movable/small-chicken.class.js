/**
 * Represents a small chicken enemy in the game.
 * It inherits from the Chicken class and has unique properties and behaviors.
 */
class SmallChecken extends Chicken {
  /** The vertical position of the small chicken */
  y = 400;
  /** The height of the small chicken */
  height = 35;
  /** The width of the small chicken */
  width = 40;
  /** Sound effect played when the small chicken is killed */
  KILLED_SOUND = new Audio("assets/audio/small-chicken.mp3");

  /**
   * Creates an instance of SmallChecken.
   * Loads walking and dead images.
   */
  constructor() {
    const IMAGES_WALKING = [
      "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    const IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    super(IMAGES_WALKING, IMAGES_DEAD);
  }

  /**
   * Toggles the small chicken killed sound effect based on the game mute setting.
   */
  toggleSmallChickenKilledSound() {
    if (this.world.isMute) {
      this.KILLED_SOUND.pause();
    } else {
      this.KILLED_SOUND.currentTime = 0.4;
      this.KILLED_SOUND.volume = 0.02;
      this.KILLED_SOUND.play();
    }
  }
}
