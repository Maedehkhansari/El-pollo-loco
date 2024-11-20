class Bottle extends DrawableObject {
    y = 368;
    height = 65;
    width = 65;
    IMAGES = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];
    isCatched = false;
    PICKUP_SOUND = new Audio("audio/pickup-bottle.mp3");

    constructor() {
        const randomNumber = Math.floor(Math.random() * 2);
        super().loadImage(this.IMAGES[randomNumber]);
        this.loadImages(this.IMAGES);
    }

    setWorld(world) {
        this.world = world;
        this.x = this.world.level.levelStart_enemy + Math.random() * this.world.level.levelEnd_enemy;
    }

    catched() {
        this.PICKUP_SOUND.currentTime = 0.3;
        this.PICKUP_SOUND.play();
        this.isCatched = true;
        this.y = 3000;
    }
}
