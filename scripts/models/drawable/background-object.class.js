/**
 * Represents a background object in the game.
 *
 * This class extends `DrawableObject` and is used to create
 * background images that can be positioned at different locations in the game world.
 *
 * @class BackgroundObject
 * @extends DrawableObject
 */
class BackgroundObject extends DrawableObject {
  /** @type {number} The width of the background object. */
  width = 720;

  /** @type {number} The height of the background object. */
  height = 400;

  /**
   * Creates an instance of BackgroundObject.
   *
   * @param {string} imagePath - The file path of the background image.
   * @param {number} x - The x-coordinate position of the background object.
   * @param {number} [height=400] - (Optional) The height of the background object. Default is 400.
   */
  constructor(imagePath, x, height = 400) {
    super().loadImage(imagePath);
    this.x = x;
    this.height = height ?? 400;
    this.y = 480 - this.height;
  }
}
