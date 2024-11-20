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

    intervals;
    walking = false;
    attack = false;
    died = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERTING[0]);
        this.loadImages(this.IMAGES_ALERTING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.intervals = [];
        this.speed = 2;
        this.animate();
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

    animate() {
        this.intervals.push(
            setInterval(() => {
                if (this.world.character.x >= this.world.level.levelEnd_x - 600) {
                    this.walking = true;
                }

                if (!this.isDead() && this.isWalking() && !this.isAttacking()) {
                    if (this.world.character.x + this.world.character.width > this.x + this.width) {
                        this.moveRight();
                        this.otherDirection = true;
                    } else {
                        this.moveLeft();
                        this.otherDirection = false;
                    }
                }
            }, 1000 / 60)
        );

        this.intervals.push(
            setInterval(() => {
                switch (true) {
                    case this.isDead():
                        this.playAnimation(this.IMAGES_DEAD);
                        this.y += 40;
                        setTimeout(() => {
                            this.died = true;
                        }, 2000);
                        break;

                    case this.isHurt():
                        this.playAnimation(this.IMAGES_HURT);
                        break;

                    case this.isAttacking():
                        this.playAnimation(this.IMAGES_ATTACKING);
                        break;

                    case this.isWalking():
                        this.playAnimation(this.IMAGES_WALKING);
                        break;

                    default:
                        this.playAnimation(this.IMAGES_ALERTING);
                        break;
                }
            }, 1000 / 5)
        );
    }
}
