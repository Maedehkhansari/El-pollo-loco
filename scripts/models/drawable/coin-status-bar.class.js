/**
 * Represents the coin status bar in the game.
 *
 * The `CoinStatusBar` class extends `DrawableObject` and is responsible for displaying
 * the player's coin collection progress. It updates the displayed image based on the
 * percentage of coins collected.
 *
 * @class CoinStatusBar
 * @extends DrawableObject
 */
class CoinStatusBar extends DrawableObject {
  /**
   * Array of image paths representing different states of the coin status bar.
   * @type {string[]}
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * The percentage of coins collected.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of `CoinStatusBar` and initializes its properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 40;
    this.width = 160;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Updates the status bar image based on the given percentage.
   *
   * @param {number} percentage - The percentage of coins collected.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to display based on the current percentage.
   *
   * @returns {number} The index of the image to use.
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
