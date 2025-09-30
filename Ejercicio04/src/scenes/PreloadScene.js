import Phaser from 'phaser'

class PreloadScene extends Phaser.Scene{
    constructor(){
        super('PreloadScene');
    }
    preload(){
        this.load.image("background","assets/background-texture.png");
        this.load.image("wall","assets/wall.png");
        this.load.spritesheet("player",
            "assets/player.png",{
                frameWidth : 48,
                frameHeight : 48
            });
    }
    create(){
        this.scene.start("GameScene");
    }
}
export default PreloadScene;
