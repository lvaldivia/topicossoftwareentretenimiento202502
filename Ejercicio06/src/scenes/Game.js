import Phaser from "phaser"
import Hero from "../prefabs/Hero";
import Platform from "../prefabs/Platform";
class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        this.setDefaults();
    }
    setDefaults(){
        this.floorPool = this.add.group({ runChildUpdate: false });
        this.platformPool = this.add.group({ runChildUpdate: false });
        this.coinsPool = this.add.group({ runChildUpdate: false });
        this.maxJumpDistance = 120;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myCoins = 0;
        this.isJumping = false;
        this.jumpPeakead = false;
        this.isGameOver = false;
        this.startY = 0;
        this.levelSpeed = 200;
        this.coinSound = this.sound.add('coin');
    }
    create(){
        this.background = 
            this.add.tileSprite(
                this.game.config.width/2,
                this.game.config.height/2,
                this.game.config.width,
                this.textures.get('background').getSourceImage().height,
                'background'
            );
        this.background.setOrigin(0.5);
        this.background.setTileScale(2,1);
        this.water = this.add.tileSprite(
            0,
            this.game.config.height - 100,
            this.game.config.width,
            30,
            'water'
        )
        this.water.setOrigin(0,0);
        this.water.setTileScale(2,1);
        this.hero = new Hero(this,50,140,'player');
        this.currentPlatform = new Platform(
            this,this.floorPool,11,0,200,
            -this.levelSpeed,this.coinsPool
        );
        this.platformPool.add(this.currentPlatform);
        this.style = {
            font:'30px Arial',
            fill:"#fff"
        };
        this.scoreText = this.add.text(0,0,'Score: '+this.myCoins,this.style);
    }
    updateScore(){
        this.scoreText.text = 'Score '+this.myCoins;
    }
    update(){
        this.background.tilePositionX -= this.levelSpeed/100;
        this.physics.collide(this.hero, this.floorPool);
        this.physics.overlap(this.hero,this.coinsPool,this.collectCoins,null,this);
        if(this.cursors.up.isDown || this.input.activePointer.isDown){
            this.playerJump();
        }else if(this.cursors.up.isUp || !this.input.activePointer.isDown){
            this.isJumping = false;
        }

        if(this.currentPlatform && 
            this.currentPlatform.getLength()  &&
            this.currentPlatform.getLast(true).getRightCenter().x
             < this.game.config.width){
            this.createPlaform()
        }
        this.platformPool.getChildren().forEach(platform=>{
            let last = platform.getLast(true);
            if(last && last.getBounds().right < 0){
                platform.kill();
            }
        });
        if(this.hero.getBounds().top > this.game.config.height
        || this.hero.getBounds().left <=0){
            this.gameOver();
        }
    }
    collectCoins(hero,coin){
        coin.setActive(false);
        coin.setVisible(false);
        coin.disableBody(true,true);
        this.myCoins++;
        this.coinSound.play();
        this.updateScore();
    }
    playerJump(){
        if(this.hero.body.touching.down){
            this.startY = this.hero.y;
            this.isJumping = true;
            this.jumpPeakead = false;
            this.hero.body.velocity.y = -300;
        }
        else if(this.isJumping && !this.jumpPeakead){
            let distance = this.startY - this.hero.y;
            if(distance<= this.maxJumpDistance){
                this.hero.body.velocity.y = -300;
            }else{
                this.jumpPeakead = true;
            }
        }
    }
    createPlaform(){
        let nextPlatformData = this.generateRandomPlatform();
        if(nextPlatformData){
            this.currentPlatform = this.platformPool.getFirstDead();
            if(!this.currentPlatform){
                this.currentPlatform = new Platform(
                    this,
                    this.floorPool,nextPlatformData.numTiles,
                    this.game.config.width + nextPlatformData.separation,
                    nextPlatformData.y,-this.levelSpeed,this.coinsPool
                );
            }else{
                this.currentPlatform.prepare(
                    nextPlatformData.numTiles,
                    this.game.config.width + nextPlatformData.separation,
                    nextPlatformData.y,-this.levelSpeed,this.coinsPool
                )
            }
        }
        this.platformPool.add(this.currentPlatform);
    }
    generateRandomPlatform(){
        let data = {};
        let minSeparation = 60;
        let maxSeparation = 200;
        data.separation = minSeparation +
            Math.random() * (maxSeparation - minSeparation);
        let minDifY = -120;
        let maxDifY = 120;
        let previuosPlatformY= this.currentPlatform.getChildren()[0].y;
        data.y = previuosPlatformY + minDifY + Math.random() * (maxDifY - minDifY);
        data.y = Math.max(150,data.y);
        data.y = Math.min(this.game.config.height-50,data.y);
        let minTiles = 2;
        let maxTiles = 6;
        data.numTiles = Math.floor(minTiles + Math.random() * (maxTiles - minTiles));
        return data;
    }
    loadLevel(){
        this.createPlaform();
    }
    gameOver(){
        this.hero.setActive(false);
        this.hero.setVisible(false);
        this.hero.disableBody(true,true);
        this.showGameOver();
    }
    showGameOver(){
        this.overlay = this.add.rectangle(
            this.game.config.width / 2,
            this.game.config.height / 2,
            this.game.config.width,
            this.game.config.height,
            0x6C5CE7 ,
            0.1
        );
        this.overlay.setScrollFactor(0); 
        this.gameOverTexr = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 - 40,
            'Game Over',
            this.style
        ).setOrigin(0.5);

        this.restartText = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 +20,
            'Tap to restart',
            this.style
        ).setOrigin(0.5);

        this.restartText.setInteractive()
        this.restartText.on('pointerdown',()=>{
            this.scene.restart();
        })
    }
}
export default GameScene