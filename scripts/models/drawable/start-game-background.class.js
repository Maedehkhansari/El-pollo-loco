/**
 * Represents the background for the start game screen.
 *
 * The `StartGameBackground` class is a subclass of `DrawableObject` that handles
 * the visual representation of the start screen's background image. It loads the
 * start screen background image and initializes its position and dimensions.
 *
 * @class StartGameBackground
 * @extends DrawableObject
 */
class StartGameBackground extends DrawableObject {
  /**
   * The width of the start game background.
   * @type {number}
   */
  width = 740;

  /**
   * The height of the start game background.
   * @type {number}
   */
  height = 480;

  /**
   * The x-coordinate of the start game background.
   * @type {number}
   */
  x = 0;

  /**
   * The y-coordinate of the start game background.
   * @type {number}
   */
  y = 0;

  /**
   * The path to the start game background image.
   * @type {string}
   */
  IMAGE = "assets/img/9_intro_outro_screens/start/startscreen_1.png";

  /**
   * Creates an instance of `StartGameBackground` and loads the start screen image.
   */
  constructor() {
    super().loadImage(this.IMAGE);
  }
}
