/**
 * Represents the status bar for the end boss in the game.
 *
 * The `EndbossStatusBar` class is a subclass of `DrawableObject` that handles the
 * visual representation of the end boss's health status. It updates the status bar
 * based on the percentage of health remaining and loads corresponding images for
 * each health level.
 *
 * @class EndbossStatusBar
 * @extends DrawableObject
 */
class EndbossStatusBar extends DrawableObject {
  /**
   * An array of image paths representing different levels of the endboss's health.
   * @type {string[]}
   */
  IMAGES = [
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * The current health percentage of the endboss.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of `EndbossStatusBar` and loads the appropriate images.
   * Initializes the position, dimensions, and sets the initial health percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 540;
    this.y = 40;
    this.width = 160;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage and updates the corresponding image.
   *
   * @param {number} percentage - The new health percentage to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current health percentage.
   *
   * @returns {number} - The index of the image corresponding to the health percentage.
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
