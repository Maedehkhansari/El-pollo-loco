class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  isHited = false;
  SPLASH_SOUND = new Audio("audio/throw-bottle.mp3");

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

  setWorld(world) {
    this.world = world;
  }

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

  toggleSplashSound() {
    if (this.world.isMute) {
      this.SPLASH_SOUND.pause();
    } else {
      this.SPLASH_SOUND.currentTime = 0.3;
      this.SPLASH_SOUND.volume = 0.06;
      this.SPLASH_SOUND.play();
    }
  }

  hited() {
    this.isHited = true;
    this.toggleSplashSound();
  }
}
