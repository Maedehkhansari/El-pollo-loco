class BackgroundObject extends DrawableObject {
    width = 720;
    height = 400;
    
    constructor(imagePath, x, height = 400) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = height
        this.y = 480 - this.height;
    }
}