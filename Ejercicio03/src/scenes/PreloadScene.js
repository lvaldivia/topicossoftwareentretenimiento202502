import Phaser from 'phaser'

class PreloadScene extends Phaser.Scene{
    constructor(){
        super('PreloadScene');
    }
    preload(){
        this.load.image("actionButton","assets/images/actionButton.png");
        this.load.image("arrowButton","assets/images/arrowButton.png");
        this.load.image("barrel","assets/images/barrel.png");
        this.load.image("gorilla","assets/images/gorilla3.png");
        this.load.image("ground","assets/images/ground.png");
        this.load.image("platform","assets/images/platform.png");
        this.load.spritesheet("player",
            "assets/images/player_spritesheet.png",{
                frameWidth : 29,
                frameHeight : 30
            });
        this.load.spritesheet("fire",
            "assets/images/fire_spritesheet.png",{
                frameWidth : 20,
                frameHeight : 21
        });
        this.load.text("level","assets/data/level.json");
    }
    create(){
        this.scene.start("GameScene");
    }
}
export default PreloadScene;
