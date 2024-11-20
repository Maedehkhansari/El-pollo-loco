class WinGame extends DrawableObject {
    width = 650;
    height = 480;
    x = 50
    y = 0

    IMAGE = 'img/9_intro_outro_screens/win/win_2.png';
    
    constructor() {
        super().loadImage(this.IMAGE);
    }
}