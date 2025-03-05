/**
 * Represents a cloud object in the game.
 * The cloud moves continuously from right to left across the screen.
 */
class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;
  intervals;

  /**
   * Creates an instance of a cloud.
   *
   * @param {number} position - The initial X position of the cloud.
   * @param {number} imageNumber - The number representing the cloud image file to be loaded.
   */
  constructor(position, imageNumber) {
    super().loadImage(`assets/img/5_background/layers/4_clouds/${imageNumber}.png`);
    this.x = position;
    this.intervals = [];
  }

  /**
   * Starts the cloud animation, making it move from right to left continuously.
   * Runs at 60 frames per second.
   */
  animate() {
    this.intervals.push(
      setInterval(() => {
        this.moveLeft();
        this.otherDirection = false;
      }, 1000 / 60) // Moves the cloud at 60 FPS
    );
  }
}
