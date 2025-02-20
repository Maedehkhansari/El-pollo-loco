class LevelOne {
    enemies;
    clouds;
    backgroundObject;
    pauseBackgroundObject;
    coins;
    bottles;

    levelStart_x = 2 * -719;
    levelEnd_x = 5 * 719;
    levelStart_enemy = 500;
    levelEnd_enemy = 4 * 719;

    constructor() {
        this.setEnemies();
        this.setClouds();
        this.setBackgrounds();
        this.setPauseBackgrounds();
        this.setCoins();
        this.setBottles();
    }

    setEnemies() {
        this.enemies = [
            new BigChecken(),
            new BigChecken(),
            new BigChecken(),
            new BigChecken(),
            new BigChecken(),
            new BigChecken(),
            new BigChecken(),
            new BigChecken(),
            new SmallChecken(),
            new SmallChecken(),
            new SmallChecken(),
            new SmallChecken(),
            new SmallChecken(),
            new SmallChecken(),
            new SmallChecken(),
            new SmallChecken(),
        ];
    }

    setCoins() {
        this.coins = [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ];
    }

    setBottles() {
        this.bottles = [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ];
    }

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

    setBackgrounds() {
        this.backgroundObject = [
            new BackgroundObject("img/5_background/layers/air.png", 3 * -719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 3 * -719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 3 * -719),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 3 * -719),

            new BackgroundObject("img/5_background/layers/air.png", 2 * -719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2 * -719),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 2 * -719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2 * -719),

            new BackgroundObject("img/5_background/layers/air.png", -719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", -719),
    
            new BackgroundObject("img/5_background/layers/air.png", 0, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 0),
    
            new BackgroundObject("img/5_background/layers/air.png", 719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719),
    
            new BackgroundObject("img/5_background/layers/air.png", 2 * 719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2 * 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 2 * 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2 * 719),
    
            new BackgroundObject("img/5_background/layers/air.png", 3 * 719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 3 * 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 3 * 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 3 * 719),
    
            new BackgroundObject("img/5_background/layers/air.png", 4 * 719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 4 * 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 4 * 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 4 * 719),
    
            new BackgroundObject("img/5_background/layers/air.png", 5 * 719, 480),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 5 * 719),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 5 * 719),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 5 * 719),
        ];
    }

    setPauseBackgrounds() {
        this.pauseBackgroundObject = [
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 3 * -720, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 2 * -720, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", -720, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 0, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 720, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 2 * 720, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 3 * 720, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 4 * 720, 480),
            new BackgroundObject("img/9_intro_outro_screens/pause/pause.png", 5 * 720, 480),
        ];
    }
}
