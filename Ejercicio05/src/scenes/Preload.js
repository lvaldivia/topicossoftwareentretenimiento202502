import Phaser from "phaser"

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){
        this.load.image('space', 'assets/images/space.png');    
        this.load.image('player', 'assets/images/player.png');    
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('enemyParticle', 'assets/images/enemyParticle.png');
        this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 
            { frameWidth: 50, frameHeight: 46 });
        this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 
            { frameWidth: 50, frameHeight: 46 });
        this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 
            { frameWidth: 50, frameHeight: 46 });
        this.load.text('level1','assets/data/level1.json');
        this.load.text('level2','assets/data/level2.json');
        this.load.text('level3','assets/data/level3.json');
        this.load.audio('loop','assets/audio/8bit-orchestra.mp3');
    }
    create(){
        this.scene.start('GameScene');
    }
}
export default PreloadScene