class World {
    canvas;
    ctx;
    keyboard;
    intervals;
    animationFrame;

    character;
    endboss;
    level;

    healthStatusBar;
    coinStatusBar;
    bottleStatusBar;
    endbossStatusBar;

    gameOverBackGround;
    startGameBackGround;
    winGameBackGround;

    BACKGROUND_SOUND;
    CHICKEN_KILLED_SOUND = new Audio("audio/chicken-crushed.mp3");
    SMALL_CHICKEN_KILLED_SOUND = new Audio("audio/small-chicken.mp3");

    start = false;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.intervals = [];
        this.animationFrame = null;
        this.character = new Character();
        this.endboss = new Endboss();
        this.level = new LevelOne();
        this.setStatusBar();
        this.setGameStatusBackground();
        this.setWorld();
        this.draw();
        this.run();
        this.setBackgroundSound();

        setTimeout(() => {
            this.start = true;
        }, 2000);
    }

    setStatusBar() {
        this.healthStatusBar = new HealthStatusBar();
        this.coinStatusBar = new CoinStatusBar();
        this.bottleStatusBar = new BottleStatusBar();
        this.endbossStatusBar = new EndbossStatusBar();
    }

    setGameStatusBackground() {
        this.gameOverBackGround = new GameOver();
        this.startGameBackGround = new StartGame();
        this.winGameBackGround = new WinGame();
    }

    setBackgroundSound() {
        this.BACKGROUND_SOUND = new Audio("audio/background-music.mp3");
        this.BACKGROUND_SOUND.volume = 0.02;
        this.BACKGROUND_SOUND.play();
    }

    setWorld() {
        this.character.setWorld(this);
        this.endboss.setWorld(this);
        this.level.enemies.forEach((enemy) => {
            enemy.setWorld(this);
        });
        this.level.coins.forEach((coin) => {
            coin.setWorld(this);
        });
        this.level.bottles.forEach((bottle) => {
            bottle.setWorld(this);
        });
    }

    run() {
        this.intervals.push(
            setInterval(() => {
                this.checkCollisions();
            }, 100)
        );
        this.intervals.push(
            setInterval(() => {
                this.checkThrowableObjects();
            }, 70)
        );
        this.intervals.push(
            setInterval(() => {
                this.checkKillEnemy();
            }, 10)
        );
    }

    checkThrowableObjects() {
        if (this.keyboard.D && this.character.bottlesCount > 0) {
            this.character.bottlesCount--;
            let bottlePercent = (this.character.bottlesCount * 100) / this.level.bottles.length;
            this.bottleStatusBar.setPercentage(bottlePercent);

            this.character.resetWaitTime();
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bottle.setWorld(this);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        if (this.character.isColliding(this.endboss) && !this.endboss.isDead()) {
            this.character.hit();
            this.endboss.startAttacking();
            this.healthStatusBar.setPercentage(this.character.energy);
        } else {
            this.endboss.endAttacking();
        }

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        });

        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.isCatched) {
                coin.catched();
                let catchedCoins = this.level.coins.filter((coin) => coin.isCatched === true);
                let coinPercent = (catchedCoins.length * 100) / this.level.coins.length;
                this.coinStatusBar.setPercentage(coinPercent);
            }
        });

        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && !bottle.isCatched) {
                bottle.catched();
                this.character.bottlesCount++;
                let bottlePercent = (this.character.bottlesCount * 100) / this.level.bottles.length;
                this.bottleStatusBar.setPercentage(bottlePercent);
            }
        });

        this.throwableObjects.forEach((throwableObject) => {
            if (this.endboss.isColliding(throwableObject) && !throwableObject.isHited) {
                throwableObject.hited();
                this.endboss.hit();
                this.endbossStatusBar.setPercentage(this.endboss.energy);
            }
        });
    }

    checkKillEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isKillEnemy(enemy)) {
                enemy.energy = 0;
                if (enemy instanceof BigChecken) {
                    this.CHICKEN_KILLED_SOUND.play();
                }

                if (enemy instanceof SmallChecken) {
                    this.SMALL_CHICKEN_KILLED_SOUND.currentTime = 0.4;
                    this.SMALL_CHICKEN_KILLED_SOUND.play();
                    setTimeout(() => {
                        this.SMALL_CHICKEN_KILLED_SOUND.pause();
                    }, 1000);
                }
            }
        });
    }

    isGameOver() {
        return this.character.gameover;
    }

    isGameWin() {
        return this.endboss.died;
    }

    isGameStart() {
        return this.start;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.isGameStart() && !this.isGameOver() && !this.isGameWin()) {
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObject);
            this.addObjectsToMap(this.level.clouds);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.healthStatusBar);
            this.addToMap(this.coinStatusBar);
            this.addToMap(this.bottleStatusBar);
            this.addToMap(this.endbossStatusBar);
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addToMap(this.endboss);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
        }

        if (this.isGameOver()) {
            this.addObjectsToMap(this.level.backgroundObject);
            this.addToMap(this.gameOverBackGround);
            this.ctx.translate(this.camera_x, 0);
            setTimeout(() => {
                this.character.gameover = false;
                resetGame();
            }, 2000);
        }

        if (!this.isGameStart()) {
            this.addToMap(this.startGameBackGround);
            this.ctx.translate(this.camera_x, 0);
        }

        if (this.isGameWin()) {
            this.addToMap(this.winGameBackGround);
            this.ctx.translate(this.camera_x, 0);
            setTimeout(() => {
                this.endboss.died = false;
                resetGame();
            }, 2000);
        }

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        this.animationFrame = requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        this.flipImageBack(mo);
    }

    flipImage(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
    }

    flipImageBack(mo) {
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    cleanUp() {
        if (this.BACKGROUND_SOUND) {
            this.BACKGROUND_SOUND.pause();
            this.BACKGROUND_SOUND.currentTime = 0;
            this.BACKGROUND_SOUND = null;
        }

        // Clean World intervals
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals = [];

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        // Clean Character intervals
        this.character.intervals.forEach((id) => clearInterval(id));
        this.character.intervals = [];

        // Clean Endboss intervals
        this.endboss.intervals.forEach((id) => clearInterval(id));
        this.endboss.intervals = [];
    }
}
