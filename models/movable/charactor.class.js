class Character extends MovableObject {
  height = 250;
  y = 80;
  speed = 10;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];
  WALKING_SOUND = new Audio("audio/walking.mp3");
  SLEEP_SOUND = new Audio("audio/sleep.mp3");
  HURT_SOUND = new Audio("audio/hurt.mp3");
  isJumping = false;
  waitingTime = 0;
  bottlesCount = 0;
  died = false;
  canThrowBottle = true;
  intervals;

  constructor() {
    super().loadImage(this.IMAGES_JUMPING[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.intervals = [];
  }

  isKillEnemy(mo) {
    const horizontalOverlap = this.x + this.width > mo.x && this.x < mo.x + mo.width;
    const heightDifferent = mo.y + mo.height - (this.y + this.height);
    const isPushing = heightDifferent < 60 && heightDifferent > 0;
    return horizontalOverlap && isPushing && !this.world.keyboard.SPACE;
  }

  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  hit() {
    this.energy -= 2;
    this.hurt = true;
    if (this.energy < 0) {
      this.energy = 0;
    }
    setTimeout(() => {
      this.hurt = false;
    }, 150);
  }

  resetWaitTime() {
    this.waitingTime = 0;
    this.SLEEP_SOUND.pause();
  }

  toggleWalkSound() {
    if (this.world.isMute) {
      this.WALKING_SOUND.pause();
    } else {
      this.WALKING_SOUND.volume = 0.04;
      this.WALKING_SOUND.play();
    }
  }

  toggleSleepSound() {
    if (this.world.isMute || this.world.isPaused) {
      this.SLEEP_SOUND.pause();
    } else {
      this.SLEEP_SOUND.volume = 0.015;
      this.SLEEP_SOUND.play();
    }
  }

  toggleHurtSound() {
    if (this.world.isMute) {
      this.HURT_SOUND.pause();
    } else {
      this.HURT_SOUND.volume = 0.03;
      this.HURT_SOUND.play();
    }
  }

  animate() {
    this.moveCharactor();
    this.playCharactor();
  }

  moveCharactor() {
    this.intervals.push(
      setInterval(() => {
        if (this.canMoveRight()) {
          this.moveRight();
        }

        if (this.canMoveLeft()) {
          this.moveLeft();
        }

        if (this.canJump()) {
          this.jump();
          this.isJumping = false;
        }

        this.world.camera_x = -this.x + 130;
      }, 1000 / 60)
    );
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x;
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > this.world.level.levelStart_x;
  }

  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  playCharactor() {
    this.intervals.push(
      setInterval(() => {
        switch (true) {
          case this.isDead():
            this.playDeadAnimation();
            break;

          case this.isHurt():
            this.playHurtAnimation();
            break;

          case this.isAboveGround():
            this.playJumpAnimation();
            break;

          case this.isWalking():
            this.playWalkingAnimation();
            break;

          default:
            this.playIdleAnimation();
            break;
        }
      }, 150)
    );
  }

  playDeadAnimation() {
    let i = this.playAnimation(this.IMAGES_DEAD);
    if (i === this.IMAGES_DEAD.length - 1) {
      setInterval(() => {
        this.y += 10;
        this.speedY -= this.acceleration;
      }, 1000 / 24);
    }
    setTimeout(() => {
      this.died = true;
    }, 2000);
    this.resetWaitTime();
  }

  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.toggleHurtSound();
    this.resetWaitTime();
  }

  playJumpAnimation() {
    if (!this.isJumping) {
      let i = this.playAnimation(this.IMAGES_JUMPING);
      if (i === this.IMAGES_JUMPING.length - 1) {
        this.isJumping = true;
      }
    }
    this.resetWaitTime();
  }

  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.toggleWalkSound();
    this.resetWaitTime();
  }

  playIdleAnimation() {
    this.waitingTime += 150;

    if (this.waitingTime > 10000) {
      this.playAnimation(this.IMAGES_SLEEP);
      this.toggleSleepSound();
    } else if (this.waitingTime > 2000) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.currentImage = 0;
      this.loadImage(this.IMAGES_IDLE[0]);
    }
  }
}
