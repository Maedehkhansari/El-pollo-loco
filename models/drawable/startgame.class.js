class StartGame extends DrawableObject {
    width = 740;
    height = 480;
    x = 0
    y = 0

    IMAGE = 'img/9_intro_outro_screens/start/startscreen_1.png';
    
    constructor() {
        super().loadImage(this.IMAGE);
    }
}