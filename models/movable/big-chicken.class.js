class BigChecken extends Chicken {
    y = 380;
    height = 55;
    width = 70;
    
    constructor() {
        const IMAGES_WALKING = [
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ];
    
        const IMAGES_DEAD = [
            'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
        ];

        super(IMAGES_WALKING, IMAGES_DEAD)
    }

}