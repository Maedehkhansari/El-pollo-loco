class GameOver extends DrawableObject {
    width = 740;
    height = 480;
    x = 0
    y = 0

    IMAGE = 'img/9_intro_outro_screens/game_over/game_over.png';
    
    constructor() {
        super().loadImage(this.IMAGE);
    }
}