import Phaser from "phaser"
class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){
        this.load.image('playerDead', 'assets/images/player_dead.png');    
        this.load.image('floor', 'assets/images/floor.png');    
        this.load.image('water', 'assets/images/water.png');    
        this.load.image('coin', 'assets/images/coin.png');    
        this.load.image('background', 'assets/images/background.png'); 
        this.load.audio('coin',['assets/audio/coin.mp3','assets/audio/coin.ogg']);
        this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 
            { frameWidth: 54, frameHeight: 69 });
    }
    create(){
        this.scene.start('GameScene');
    }
}
export default PreloadScene