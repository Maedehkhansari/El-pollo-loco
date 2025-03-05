/**
 * Represents the first level of the game, including enemies, clouds, backgrounds, and other objects.
 *
 * The `LevelOne` class contains all the necessary objects and animations for the first level of the game. It initializes the enemies, coins, bottles, clouds, backgrounds, and pause backgrounds, and handles animations for these objects during gameplay.
 *
 * @class LevelOne
 */
class LevelOne {
  /**
   * The array of enemies in the level.
   * @type {Array}
   */
  enemies;

  /**
   * The array of clouds in the level.
   * @type {Array}
   */
  clouds;

  /**
   * The array of background objects in the level.
   * @type {Array}
   */
  backgroundObject;

  /**
   * The array of background objects used during the pause screen.
   * @type {Array}
   */
  pauseBackgroundObject;

  /**
   * The array of coins in the level.
   * @type {Array}
   */
  coins;

  /**
   * The array of bottles in the level.
   * @type {Array}
   */
  bottles;

  /**
   * The starting x-coordinate of the level.
   * @type {number}
   */
  levelStart_x = 2 * -719;

  /**
   * The ending x-coordinate of the level.
   * @type {number}
   */
  levelEnd_x = 5 * 719;

  /**
   * The starting x-coordinate for enemies.
   * @type {number}
   */
  levelStart_enemy = 500;

  /**
   * The ending x-coordinate for enemies.
   * @type {number}
   */
  levelEnd_enemy = 4 * 719;

  oddLayers = [
    { path: "assets/img/5_background/layers/air.png", height: 480 },
    { path: "assets/img/5_background/layers/3_third_layer/2.png", height: null },
    { path: "assets/img/5_background/layers/2_second_layer/2.png", height: null },
    { path: "assets/img/5_background/layers/1_first_layer/1.png", height: null },
  ];

  evenLayers = [
    { path: "assets/img/5_background/layers/air.png", height: 480 },
    { path: "assets/img/5_background/layers/3_third_layer/1.png", height: null },
    { path: "assets/img/5_background/layers/2_second_layer/1.png", height: null },
    { path: "assets/img/5_background/layers/1_first_layer/2.png", height: null },
  ];

  /**
   * Creates an instance of `LevelOne` and initializes all the game objects.
   */
  constructor() {
    this.setEnemies();
    this.setClouds();
    this.setBackgrounds();
    this.setPauseBackgrounds();
    this.setCoins();
    this.setBottles();
  }

  /**
   * Initializes the enemies in the level.
   * @private
   */
  setEnemies() {
    this.enemies = [
      ...Array(10)
        .fill()
        .map(() => new BigChecken()),
      ...Array(10)
        .fill()
        .map(() => new SmallChecken()),
    ];
  }

  /**
   * Initializes the coins in the level.
   * @private
   */
  setCoins() {
    this.coins = [
      ...Array(10)
        .fill()
        .map(() => new Coin()),
    ];
  }

  /**
   * Initializes the bottles in the level.
   * @private
   */
  setBottles() {
    this.bottles = [
      ...Array(15)
        .fill()
        .map(() => new Bottle()),
    ];
  }

  /**
   * Initializes the clouds in the level.
   * @private
   */
  setClouds() {
    this.clouds = [
      new Cloud(-1000, 1),
      new Cloud(-300, 1),
      new Cloud(500, 1),
      new Cloud(1200, 2),
      new Cloud(2000, 1),
      new Cloud(2700, 2),
      new Cloud(3500, 1),
      new Cloud(4500, 2),
    ];
  }

  /**
   * Initializes the background objects for the level.
   * @private
   */
  setBackgrounds() {
    this.backgroundObject = [];

    for (let i = -3; i <= 5; i++) {
      let x = i * 719;

      if (i % 2 === 0) {
        this.evenLayers.forEach((layer) => {
          this.backgroundObject.push(new BackgroundObject(layer.path, x, layer.height));
        });
      } else {
        this.oddLayers.forEach((layer) => {
          this.backgroundObject.push(new BackgroundObject(layer.path, x, layer.height));
        });
      }
    }
  }

  /**
   * Initializes the background objects for the pause screen.
   * @private
   */
  setPauseBackgrounds() {
    this.pauseBackgroundObject = [];

    for (let i = -3; i <= 5; i++) {
      let x = i * 720;
      this.pauseBackgroundObject.push(new BackgroundObject("assets/img/9_intro_outro_screens/pause/pause.png", x, 480));
    }
  }

  /**
   * Animates all the enemies in the level.
   */
  animateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.animate();
    });
  }

  /**
   * Clears the intervals set for all the enemies in the level.
   */
  clearEnemiesInterval() {
    this.enemies.forEach((enemy) => {
      enemy.intervals.forEach((id) => clearInterval(id));
      enemy.intervals = [];
    });
  }

  /**
   * Animates all the clouds in the level.
   */
  animateClouds() {
    this.clouds.forEach((cloud) => {
      cloud.animate();
    });
  }

  /**
   * Clears the intervals set for all the clouds in the level.
   */
  clearCloudsInterval() {
    this.clouds.forEach((cloud) => {
      cloud.intervals.forEach((id) => clearInterval(id));
      cloud.intervals = [];
    });
  }

  /**
   * Animates all the coins in the level.
   */
  animateCoins() {
    this.coins.forEach((coin) => {
      coin.animate();
    });
  }

  /**
   * Clears the intervals set for all the coins in the level.
   */
  clearCoinsInterval() {
    this.coins.forEach((coin) => {
      coin.intervals.forEach((id) => clearInterval(id));
      coin.intervals = [];
    });
  }
}
