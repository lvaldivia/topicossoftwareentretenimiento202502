import 'phaser'

class PlayGame extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayGame' });
    }
    preload() {
        this.load.image("background","assets/images/background.png");
        this.load.image("arrow","assets/images/arrow.png");
        this.load.spritesheet("chicken","assets/images/chicken_spritesheet.png",
                {frameWidth: 131, frameHeight: 200}
            );
        this.load.spritesheet("sheep", "assets/images/sheep_spritesheet.png",
             {frameWidth: 244, frameHeight: 200} ); 
        this.load.spritesheet("horse", "assets/images/horse_spritesheet.png", 
            {frameWidth: 212, frameHeight: 200} );
        this.load.spritesheet("pig", "assets/images/pig_spritesheet.png", 
            {frameWidth: 297, frameHeight: 200} );
        this.load.audio("chicken_sound","assets/audio/chicken.ogg");
        this.load.audio("sheep_sound","assets/audio/sheep.ogg");
        this.load.audio("horse_sound","assets/audio/horse.ogg");
        this.load.audio("pig_sound","assets/audio/pig.ogg");
    }
    create() {
        this.animals = ["chicken","sheep","horse","pig"];
        this.index = 0;
        this.firstTime = true;
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.rightArrow = this.add.sprite(0,0,"arrow");
        this.rightArrow.x = this.game.config.width
                        - (this.rightArrow.width * 0.5);
        this.rightArrow.y = this.game.config.height * 0.5;
        this.leftArrow = this.add.sprite(0,0,"arrow");
        this.leftArrow.x = this.leftArrow.width * 0.5;
        this.leftArrow.y = this.rightArrow.y;
        this.leftArrow.setScale(-1);
        this.rightArrow.setInteractive();
        this.leftArrow.setInteractive();
        this.createAnimal();
        this.rightArrow.on("pointerdown",()=>{
            this.moveAnimal("right");
        });
        this.leftArrow.on("pointerdown",()=>{
            this.moveAnimal("left");
        });
        this.tweenComplete = false;
    }
    createAnimal(){
        this.currentAnimal = this.add.sprite(100,200,this.animals[this.index]);
        /*if(this.firstTime){
            this.firstTime = false;
            this.anims.create({
                key : "animation",
                frames: this.anims.generateFrameNumbers(this.animals[this.index],
                    {frames:[0,1,2,1,0]}
                ),
                frameRate:3,
                repeat:1
            });
        }*/
        this.currentAnimal.x = this.game.config.width * 0.5;
        this.currentAnimal.y = this.game.config.height * 0.5;
        this.currentAnimal.play("animation");
    }
    moveAnimal(direction){
        if(this.tweenComplete){
            return
        }
        this.tweenComplete = true;
        if(direction == "right"){
            this.index = 
                this.index == this.animals.length - 1 ? 0 : this.index + 1;
            this.newAnimal = this.add.sprite(0,0,this.animals[this.index]);
            this.newAnimal.x = -this.newAnimal.width;
            this.newAnimal.y = this.game.config.height * 0.5;
            this.tweens.add({
                targets:this.newAnimal,
                x: this.game.config.width * 0.5,
                duration: 500
            });
            this.tweens.add({
                targets:this.currentAnimal,
                x: this.game.config.width + this.currentAnimal.width,
                duration: 500,
                onComplete:()=>{
                    this.completeTween();
                }
            });
        }else {
            this.index = 
                this.index == 0 ? this.animals.length - 1 : this.index - 1;
            this.newAnimal = this.add.sprite(0,0,this.animals[this.index]);
            this.newAnimal.x = this.game.config.width + this.newAnimal.width;
            this.newAnimal.y = this.game.config.height * 0.5;
            this.tweens.add({
                targets:this.newAnimal,
                x: this.game.config.width * 0.5,
                duration: 500
            });
            this.tweens.add({
                targets:this.currentAnimal,
                x:-this.currentAnimal.width,
                duration: 500,
                onComplete:()=>{
                    this.completeTween();
                }
            });
        }
    }
    completeTween(){
        this.tweenComplete = false;
        this.currentAnimal = this.newAnimal;
        this.newAnimal = null;
        this.animalSound = this.sound.add(this.animals[this.index]+"_sound");
        this.animalSound.play();
    }
}
const config = {
    //Phaser.AUTO = Detect WebGL, if not available, use Canvas
    //Phaser.CANVAS = Force Canvas rendering
    //Phaser.WEBGL = Force WebGL rendering
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: PlayGame,
    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
    //parent:"game_container"
}
new Phaser.Game(config);
