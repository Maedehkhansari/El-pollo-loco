class Chicken extends MovableObject {
    IMAGES_WALKING = [];
    IMAGES_DEAD = [];

    constructor(IMAGES_WALKING, IMAGES_DEAD) {
        super().loadImage(IMAGES_WALKING[0]);
        this.loadImages(IMAGES_WALKING);
        this.loadImages(IMAGES_DEAD);

        this.IMAGES_WALKING = IMAGES_WALKING;
        this.IMAGES_DEAD = IMAGES_DEAD;

        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    setWorld(world){
        this.world = world;
        this.x = this.world.level.levelStart_enemy + Math.random() * this.world.level.levelEnd_enemy;
    }

    animate() {
        setInterval(() => {
            if(!this.isDead()){
                this.moveLeft();
            }
            if(this.isDead()){
                setTimeout(() => {
                    this.y = 3000;
                }, 2000);
            }
            this.otherDirection = false;
        }, 1000 / 60);

        setInterval(() => {
            switch (true) {
                case this.isDead():
                    this.playAnimation(this.IMAGES_DEAD);
                    break;

                default:
                    this.playAnimation(this.IMAGES_WALKING);
                    break;
            }
        }, 200);
    }

}