import Phaser from "phaser"
import PlayerBullet from "../prefabs/PlayerBullet";
import Enemy from "../prefabs/Enemy"

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene')
    }
    create(){
        this.background = this.add.tileSprite(
            0,0,this.game.config.width,
            this.game.config.height,'space'
        );
        this.background.setOrigin(0,0);
        this.player_speed = 200;
        this.bullet_speed = -400;
        this.initPlayer();
        this.loadLevel();
        this.iniEnemies();
        this.loop = this.sound.add('loop',{
            loop:true,
            volume: 0.5
        });
        this.loop.play();
        this.physics.add.overlap(this.playerBullets,this.enemies,
            this.hitEnemy,null,this);
    }
    initPlayer(){
        this.player = 
            this.physics.add.sprite(this.game.config.width*0.5,
                this.game.config.height*0.85,
                'player'
            );
        this.player.setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
        this.playerBullets = this.add.group({runChildUpdate:true});
        this.shootingTimer = this.time.addEvent({
            delay:200,
            callback:this.createPlayerBullet,
            callbackScope:this,
            loop: true
        });
    }
    loadLevel(){
        this.currentLevel = 1;
        this.currentIndexEnemy = 0;
        this.levelData 
            = JSON.parse(this.cache.text.get('level'+this.currentLevel));
        this.scheduleNextEnemy();
    }
    iniEnemies(){
        this.enemies = this.add.group({runChildUpdate:true});
        this.enemyBullets = this.add.group();
    }
    createPlayerBullet(){
        let bullet = this.playerBullets.getFirstDead();
        if(!bullet){
            bullet 
                = new PlayerBullet(this,this.player.x,this.player.y-20);
            this.playerBullets.add(bullet);
        }else{
            bullet.setPosition(this.player.x,this.player.y-20);
            bullet.setActive(true);
            bullet.setVisible(true);
        }
        bullet.body.velocity.y = this.bullet_speed;
    }
    update(){
        this.background.tilePositionY += 1.5;
        this.player.body.setVelocityX(0);
        if(this.input.activePointer.isDown)
        {
            this.targetX = this.input.activePointer.position.x;
            this.direction = 
            this.targetX > this.game.config.width/ 2  ? 1 : -1;
            this.player.body.setVelocityX(this.direction* this.player_speed);
        }
    }

    scheduleNextEnemy(){
        let nextEnemy = this.levelData.enemies[this.currentIndexEnemy];
        if(nextEnemy){
            let nextTime = 1000 * (nextEnemy.time -
                (this.currentIndexEnemy == 0) ? 0 :
                this.levelData.enemies[this.currentIndexEnemy].time
            );
            this.nextEnemyTimer = this.time.addEvent({
                delay:nextTime,
                callbackScope:this,
                callback:()=>{
                    this.createEnemy(
                        nextEnemy.x*this.game.config.width,
                    -100,nextEnemy.key,nextEnemy);
                    this.currentIndexEnemy++;
                    this.scheduleNextEnemy();
                }
            })
        }
    }
    createEnemy(x,y,key,config){
        let enemy = new Enemy(this,x,y,key,config);
        this.enemies.add(enemy);
    }
    hitEnemy(bullet,enemy){
        bullet.destroy();
        enemy.getHit(1);
    }
}
export default GameScene