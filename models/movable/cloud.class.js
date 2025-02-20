class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;
  intervals;

  constructor(position, imageNumber) {
    super().loadImage(`img/5_background/layers/4_clouds/${imageNumber}.png`);
    this.x = position;
    this.intervals = [];
  }

  animate() {
    this.intervals.push(
      setInterval(() => {
        this.moveLeft();
        this.otherDirection = false;
      }, 1000 / 60)
    );
  }
}
