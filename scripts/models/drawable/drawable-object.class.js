/**
 * Represents a drawable object in the game.
 *
 * The `DrawableObject` class serves as a base class for all objects that need to
 * be rendered on the canvas. It provides methods for loading images, drawing the
 * object on the canvas, and caching images for reuse.
 *
 * @class DrawableObject
 */
class DrawableObject {
  /**
   * The image representing the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * A cache for storing loaded images by their paths.
   * @type {Object<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * The index of the current image in use.
   * @type {number}
   */
  currentImage = 0;

  /**
   * The x-coordinate position of the object.
   * @type {number}
   */
  x = 120;

  /**
   * The y-coordinate position of the object.
   * @type {number}
   */
  y = 280;

  /**
   * The world that the object belongs to.
   * @type {Object}
   */
  world;

  /**
   * Sets the world instance for the object.
   *
   * @param {Object} world - The game world instance.
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Loads an image for the object from the given path.
   *
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and caches them in the `imageCache`.
   *
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the provided canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object for debugging purposes.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "green";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
