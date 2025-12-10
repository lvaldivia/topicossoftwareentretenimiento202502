class PreloadGame extends Phaser.Scene {
    constructor() {
        super("PreloadGame");
    }
    preload() {
        this.cameras.main.setBackgroundColor(window.gameOptions.skyColor);
        this.load.image("floor", "assets/floor.png");
        this.load.image("hero", "assets/hero.png");
        this.load.image("ladder", "assets/ladder.png");
        this.load.image("diamond", "assets/diamond.png");
        this.load.image("diamondparticle", "assets/diamondparticle.png");
        this.load.image("spike", "assets/spike.png");
        this.load.image("cloud", "assets/cloud.png");
        this.load.image("tap", "assets/tap.png");
        this.load.bitmapFont("font", "assets/font.png", "assets/font.fnt");
    }

    create() {
        this.scene.start("PlayGame");
    }
}

export default PreloadGame;