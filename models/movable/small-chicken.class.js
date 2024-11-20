class SmallChecken extends Chicken {
    y = 400;
    height = 35;
    width = 40;

    constructor() {
        const IMAGES_WALKING = [
            'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
        ];
    
        const IMAGES_DEAD = [
            'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
        ];

        super(IMAGES_WALKING, IMAGES_DEAD)
    }
}