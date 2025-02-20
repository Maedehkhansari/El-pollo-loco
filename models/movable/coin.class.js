class Coin extends MovableObject {
  y = 163;
  height = 100;
  width = 100;
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  isCatched = false;
  PICKUP_SOUND = new Audio("audio/pickup-coin.mp3");
  intervals;

  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.applyGravity();
    this.intervals = [];
  }

  setWorld(world) {
    this.world = world;
    this.x = this.world.level.levelStart_enemy + Math.random() * this.world.level.levelEnd_enemy;
  }

  animate() {
    this.intervals.push(
      setInterval(() => {
        if (!this.isCatched) {
          this.playAnimation(this.IMAGES);
        }
      }, 200)
    );
  }

  togglePickupSound() {
    if (this.world.isMute) {
      this.PICKUP_SOUND.pause();
    } else {
      this.PICKUP_SOUND.currentTime = 2;
      this.PICKUP_SOUND.volume = 0.04;
      this.PICKUP_SOUND.play();
    }
  }

  catched() {
    this.isCatched = true;
    this.jump();
    this.togglePickupSound();
    this.catchCoinAnimation();
  }

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
