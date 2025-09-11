import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }
    create() {
        //alert('HOLA desde MenuScene');
        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);
        this.title = this.add.text(0,0,'BIENVENIDA',{
            font: '40px Arial',
            fill: '#000000'
        });
        this.title.x = this.game.config.width/2 - this.title.width/2;
        this.title.setInteractive();
        this.title.on('pointerdown',()=>{
            this.scene.start("GameScene");
        });
        this.logo = this.add.image(0,0,'logo');
        this.logo.x = this.game.config.width*0.5;
        this.logo.y = this.game.config.height * 0.5;
        this.logo.setScale(5)
    }
}
export default MenuScene;
