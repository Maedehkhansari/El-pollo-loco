/**
 * Represents a bottle object in the game.
 *
 * The `Bottle` class extends `DrawableObject` and represents collectible bottles
 * that the player can pick up. It includes logic for random selection of bottle images,
 * world positioning, and pickup sound effects.
 *
 * @class Bottle
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
  /**
   * The y-coordinate position of the bottle.
   * @type {number}
   */
  y = 368;

  /**
   * The height of the bottle.
   * @type {number}
   */
  height = 65;

  /**
   * The width of the bottle.
   * @type {number}
   */
  width = 65;

  /**
   * Array of image paths representing different bottle appearances.
   * @type {string[]}
   */
  IMAGES = ["assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  /**
   * Indicates whether the bottle has been collected.
   * @type {boolean}
   */
  isCatched = false;

  /**
   * The sound effect played when the bottle is picked up.
   * @type {HTMLAudioElement}
   */
  PICKUP_SOUND = new Audio("assets/audio/pickup-bottle.mp3");

  /**
   * Creates an instance of `Bottle` with a randomly selected image.
   */
  constructor() {
    const randomNumber = Math.floor(Math.random() * 2);
    super().loadImage(this.IMAGES[randomNumber]);
    this.loadImages(this.IMAGES);
  }

  /**
   * Assigns the world instance to the bottle and sets its x-coordinate position.
   *
   * @param {Object} world - The game world instance.
   */
  setWorld(world) {
    this.world = world;
    this.x = this.world.level.levelStart_enemy + Math.random() * this.world.level.levelEnd_enemy;
  }

  /**
   * Toggles the bottle pickup sound based on the world's mute status.
   */
  togglePickupSound() {
    if (this.world.isMute) {
      this.PICKUP_SOUND.pause();
    } else {
      this.PICKUP_SOUND.currentTime = 0.3;
      this.PICKUP_SOUND.volume = 0.2;
      this.PICKUP_SOUND.play();
    }
  }

  /**
   * Marks the bottle as collected, plays the pickup sound, and moves it off-screen.
   */
  catched() {
    this.togglePickupSound();
    this.isCatched = true;
    this.y = 3000;
  }
}
