import Phaser  from "phaser";
class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene')
    }
    create(){
        this.background = this.add.tileSprite(0,0,
            this.game.config.width,
            this.game.config.height,
            'background'
        );
        this.spawnWall = 0;
        this.background.setOrigin(0,0);
        this.walls = this.add.group();
        this.createPlayer();
        this.createHUD();
    }
    createHUD(){
        this.score = 0;
        this.scoreText = this.add.text(0,0,'Score '+ this.score,{
            font: '64px Arial',
            fill : '#FFFFFF'
        });
        this.scoreText.setDepth(9999);
        if(localStorage.hasOwnProperty('score')){
            this.maxScoreText = this.add.text(0,0,'Max Score '+ localStorage.score,{
                font: '64px Arial',
                fill : '#FFFFFF'
            });
            this.maxScoreText.x = this.game.config.width - this.maxScoreText.width;
            this.maxScoreText.setDepth(9999);
        }
        
    }
    createPlayer(){
        this.player = this.physics.add.sprite(0,0,'player');
        this.jumpForce = -400;
        this.player.x = this.game.config.width * 0.5;
        this.player.xy = this.game.config.height * 0.5;
        this.anims.create({
            key:'fly',
            frames:this.anims.generateFrameNumbers('player',{start:0,end:3}),
            frameRate:10,
            repeat: -1
        });
        this.spaceBar 
            = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down',this.flap,this);
        this.input.on('pointerdown',this.flap,this);
        this.physics.add.collider(this.player,this.walls,this.hitWall,null,this);
    }
    hitWall(object1,object2){
        object1.disableBody(true,true);
        this.walls.children.iterate((wall)=>{
            if(wall.active){
                wall.disableBody(true,true);
            }
        });
        if(this.score > 0){
            localStorage.score = this.score;
        }
        this.gameOverText = this.add.text(0,0,'Game Over, click to continue',{
            font: '64px Arial',
            fill : '#FFFFFF'
        });
        this.gameOverText.setOrigin(0.5,0.5);
        this.gameOverText.x = this.game.config.width*0.5;
        this.gameOverText.y = this.game.config.height*0.5;
        this.gameOverText.setInteractive();
        this.gameOverText.on('pointerdown',this.restart,this);
    }
    restart(){
        this.scene.start('GameScene');
    }
    flap(){
        this.player.setVelocityY(this.jumpForce);
    }
    update(time,delta){
        if(!this.player.active && !this.player.visible){
            return;
        }
        this.background.tilePositionX -= 1;
        if(this.player.body.velocity.y > -20){
            this.player.setFrame(3);
        }else{
            this.player.play('fly');
        }
        this.spawnWall+=delta;
        if(this.spawnWall> 3000){
            this.spawnWall = 0;
            this.createWall();
        }
        this.walls.children.iterate((wall)=>{
            if(wall.active){
                if(wall.x + wall.width < 0){
                    wall.disableBody(true,true);
                }else{
                    if(this.player.x >= wall.x){
                        if(!wall.scored){
                            wall.scored = true;
                            this.score+=0.5;
                            this.scoreText.text = 'Score '+this.score;
                        }
                    }
                }
            }
            
        });
    }
    createWall(){
        let wallY = Phaser.Math.Between(this.game.config.height*0.3,
            this.game.config.height*0.7
        );
        this.generateWall(wallY);
        this.generateWall(wallY,true);
    }
    generateWall(wallY,flipped){
        let opening = 200;
        if(flipped){
            wallY = wallY - (opening*0.5);
        }else{
            wallY = wallY + (opening*0.5);
        }
        let wall = this.walls.getFirstDead();
        if(wall){
            wall.setPosition(this.game.config.width,wallY);
            wall.setActive(true);
            wall.setVisible(true);
            wall.body.enable = true;
            
        }else{
            wall = this.physics.add.sprite(this.game.config.width,wallY,'wall');
            wall.setOrigin(0,0);
            this.walls.add(wall);
        }
        wall.scored = false;
        wall.body.setVelocityX(-200);
        wall.body.allowGravity = false;
        wall.body.setImmovable(true);
        if(flipped){
            wall.scaleY = -1;
            wall.body.setOffset(0,wall.height);
        }else{
            wall.scaleY = 1;
            wall.body.setOffset(0,0);
        }
     }
}
export default GameScene;