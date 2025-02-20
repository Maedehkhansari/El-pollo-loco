class BigChecken extends Chicken {
  y = 380;
  height = 55;
  width = 70;
  KILLED_SOUND = new Audio("audio/chicken-crushed.mp3");

  constructor() {
    const IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    const IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    super(IMAGES_WALKING, IMAGES_DEAD);
  }

  toggleChickenKilledSound() {
    if (this.world.isMute) {
      this.KILLED_SOUND.pause();
    } else {
      this.KILLED_SOUND.volume = 0.06;
      this.KILLED_SOUND.play();
    }
  }
}
