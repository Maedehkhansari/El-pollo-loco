class Cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 250;

    constructor(position, imageNumber) {
        super().loadImage(`img/5_background/layers/4_clouds/${imageNumber}.png`);

        this.x = position;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

}