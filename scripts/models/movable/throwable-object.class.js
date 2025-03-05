/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * The object can rotate while flying and display a splash animation when it hits a target.
 */
class ThrowableObject extends MovableObject {
  /** Image arrays for rotation and splash animations */
  IMAGES_ROTATION = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /** Indicates whether the throwable object has hit a target */
  isHited = false;

  /** Sound effect played when the object splashes */
  SPLASH_SOUND = new Audio("assets/audio/throw-bottle.mp3");

  /**
   * Creates a new throwable object at the given position.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.trow();
  }

  /**
   * Sets the game world reference for the throwable object.
   * @param {Object} world - The game world object.
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Initiates the throw animation and movement.
   */
  trow() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (this.isHited) {
        this.playAnimation(this.IMAGES_SPLASH);
      } else {
        this.playAnimation(this.IMAGES_ROTATION);
        if (this.world.character.x < this.world.endboss.x) {
          this.x += 10;
        } else {
          this.x -= 10;
        }
      }
    }, 25);
  }

  /**
   * Toggles the splash sound effect when the object hits a target.
   */
  toggleSplashSound() {
    if (this.world.isMute) {
      this.SPLASH_SOUND.pause();
    } else {
      this.SPLASH_SOUND.currentTime = 0.3;
      this.SPLASH_SOUND.volume = 0.06;
      this.SPLASH_SOUND.play();
    }
  }

  /**
   * Marks the throwable object as hit and triggers the splash sound.
   */
  hited() {
    this.isHited = true;
    this.toggleSplashSound();
  }
}
