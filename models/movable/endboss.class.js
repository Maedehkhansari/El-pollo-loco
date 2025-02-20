class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;

  IMAGES_ALERTING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACKING = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  HURT_SOUND = new Audio("audio/big-chicken.mp3");

  walking = false;
  attack = false;
  died = false;
  intervals;

  constructor() {
    super().loadImage(this.IMAGES_ALERTING[0]);
    this.loadImages(this.IMAGES_ALERTING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACKING);
    this.intervals = [];
    this.speed = 2;
  }

  setWorld(world) {
    this.world = world;
    this.x = this.world.level.levelEnd_x;
  }

  hit() {
    this.energy -= 15;
    this.hurt = true;
    if (this.energy < 0) {
      this.energy = 0;
    }
    setTimeout(() => {
      this.hurt = false;
    }, 500);
  }

  startAttacking() {
    this.attack = true;
  }

  endAttacking() {
    this.attack = false;
  }

  isWalking() {
    return this.walking;
  }

  isAttacking() {
    return this.attack;
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
    this.moveEndBoss();
    this.playEndBoss();
  }

  moveEndBoss() {
    this.intervals.push(
      setInterval(() => {
        this.canStartWalking();
        this.moveLeftAndRight();
      }, 1000 / 60)
    );
  }

  canStartWalking() {
    if (this.world.character.x >= this.world.level.levelEnd_x - 600) {
      this.walking = true;
    }
  }

  moveLeftAndRight() {
    if (!this.isDead() && this.isWalking() && !this.isAttacking()) {
      if (this.world.character.x + this.world.character.width > this.x + this.width) {
        this.moveRight();
        this.otherDirection = true;
      } else {
        this.moveLeft();
        this.otherDirection = false;
      }
    }
  }

  playEndBoss() {
    this.intervals.push(
      setInterval(() => {
        switch (true) {
          case this.isDead():
            this.playDeadAnimation();
            break;

          case this.isHurt():
            this.playHurtAnimation();
            break;

          case this.isAttacking():
            this.playAttackingAnimation();
            break;

          case this.isWalking():
            this.playWalkingAnimation();
            break;

          default:
            this.playAlertingAnimation();
            break;
        }
      }, 1000 / 5)
    );
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y += 40;
    setTimeout(() => (this.died = true), 2000);
  }

  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.toggleHurtSound();
  }

  playAttackingAnimation() {
    this.playAnimation(this.IMAGES_ATTACKING);
  }

  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  playAlertingAnimation() {
    this.playAnimation(this.IMAGES_ALERTING);
  }
}
