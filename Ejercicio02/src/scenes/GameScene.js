import Phaser from "phaser";
class GameScene extends Phaser.Scene {
    constructor(){
        super("GameScene");
    }
    create(){
        this.currentKey = "";
        this.tweenComplete = true;
        this.background = this.add.sprite(0,0,'background');
        this.background.setOrigin(0,0);
        this.keys = ["apple","candy","rubber_duck","rotate"];
        this.keys.forEach((element,key)=>{
            let sprite = this.add.sprite(0,0,element);
            sprite.setOrigin(0,0);
            sprite.x = key*sprite.width*2;
            sprite.y = this.game.config.height - (sprite.height*1.5);
            sprite.setInteractive();
            sprite.on('pointerdown',()=>{
               this.clickElement(sprite.texture.key);
            });
        })
        this.character = this.add.sprite(0,0,'pet');
        this.character.x = this.game.config.width* 0.5;
        this.character.y = this.game.config.height* 0.5;
        this.anims.create({
            key: "animation",
            frames:this.anims.generateFrameNumbers(
                'pet',
                {frames:[0,1,2,1,0]}
            ),
            frameRate: 3,
            repeat: 1
        })
        this.background.setInteractive();
        this.background.on("pointerdown",this.cloneElement,this)
    }
    cloneElement(event){
        if(this.currentKey!="" && this.currentKey != 'rotate'){
            console.log(this.currentKey);
            let clone = this.add.sprite(0,0,this.currentKey)
            clone.x = event.downX;
            clone.y = event.downY;
            this.tweens.add({
                targets:this.character,
                x: clone.x,
                y:clone.y,
                duration: 1000,
                onComplete:()=>{
                    this.character.play("animation");
                    clone.destroy();
                    this.tweenComplete = true;
                }
            })
            this.currentKey = "";
        }
    }
    clickElement(key){
        if(!this.tweenComplete)return;
        this.currentKey = key;
        this.tweenComplete = false;
        if(this.currentKey == "rotate"){
            this.tweens.add({
                targets:this.character,
                angle:this.character.angle + 360,
                duration: 500,
                onComplete:()=>{
                    this.currentKey = "";
                    this.character.play("animation");
                    this.tweenComplete = true;
                }
            })
        }
    }
}
export default GameScene