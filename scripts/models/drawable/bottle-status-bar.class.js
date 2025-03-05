/**
 * Represents the status bar for bottles in the game.
 *
 * The `BottleStatusBar` class extends `DrawableObject` and visually indicates
 * the player's current bottle collection status using different images.
 *
 * @class BottleStatusBar
 * @extends DrawableObject
 */
class BottleStatusBar extends DrawableObject {
  /**
   * Array of image paths representing different bottle status levels.
   * @type {string[]}
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  /**
   * The current percentage of collected bottles.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of `BottleStatusBar`.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 80;
    this.width = 160;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of collected bottles and updates the status bar image.
   *
   * @param {number} percentage - The new bottle collection percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the correct image index based on the current percentage.
   *
   * @returns {number} The index of the image in the `IMAGES` array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
