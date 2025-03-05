/**
 * Represents the health status bar in the game.
 *
 * The `HealthStatusBar` class is a subclass of `DrawableObject` that handles the
 * visual representation of the player's health. It updates the health status bar
 * based on the percentage of health remaining and loads corresponding images for
 * each health level.
 *
 * @class HealthStatusBar
 * @extends DrawableObject
 */
class HealthStatusBar extends DrawableObject {
  /**
   * An array of image paths representing different levels of the player's health.
   * @type {string[]}
   */
  IMAGES = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * The current health percentage of the player.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of `HealthStatusBar` and loads the appropriate images.
   * Initializes the position, dimensions, and sets the initial health percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
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
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
