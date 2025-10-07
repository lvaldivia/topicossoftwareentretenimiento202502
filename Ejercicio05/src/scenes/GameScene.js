import Phaser from "phaser"
import PlayerBullet from "../prefabs/PlayerBullet";
import Enemy from "../prefabs/Enemy"

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene')
    }
    init(level){
        console.log('level que viene '+level.level);
        this.currentLevel = level.level || 1;
        console.log('level que asgnamos y cargamos '+this.currentLevel);
        /*this.currentLevel = 1;
        if(localStorage.hasOwnProperty('currentLevel')){
            this.currentLevel = localStorage.currentLevel;
        }
        console.log(this.currentLevel);*/
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
        this.physics.add.overlap(this.player,this.enemyBullets,
            this.hitPlayer,null,this);
        this.createHUD();
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
    createHUD(){
        this.score = 0;
        let style = {
            fontFamily:'Arial',
            fontSize:'64px',
            color: '#FFFFFF'
        };
        this.enemyText = this.add.text(0,0,'Total Enemy',style);
        this.enemyText.text = 'Total Enemies '+this.totalEnemies;
        this.enemyText.setDepth(9999);
        this.scoreText = this.add.text(0,0,'Total Score '+this.score,style);
        this.scoreText.setDepth(9999);
        this.scoreText.x = this.game.config.width - this.scoreText.width;
    }
    loadLevel(){
        
        this.currentIndexEnemy = 0;
        this.levelData 
            = JSON.parse(this.cache.text.get('level'+this.currentLevel));
        this.totalEnemies = this.levelData.enemies.length;
        this.scheduleNextEnemy();
    }
    iniEnemies(){
        this.enemies = this.add.group({runChildUpdate:true});
        this.enemyBullets = this.add.group({runChildUpdate:true});
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
    updateHUD(){
        this.enemyText.text = 'Total Enemies '+this.totalEnemies;
        this.scoreText.x = this.game.config.width - this.scoreText.width;
        this.scoreText.text = 'Total Score '+this.score;
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
        let enemy = new Enemy(this,x,y,key,config,this.enemyBullets);
        this.enemies.add(enemy);
    }
    hitEnemy(bullet,enemy){
        bullet.kill();
        enemy.getHit(1);
        if(enemy.getHealth() <=0){
            this.totalEnemies--;
            this.score += enemy.getScale();
            this.updateHUD();
        }
        if(this.totalEnemies<=0){
            this.levelUp();
        }
    }
    levelUp(){
        this.currentLevel++;
        if(this.currentLevel >3){
            this.currentLevel = 1;
        }
        this.scene.stop('GameScene');
        this.scene.start('GameScene', { level: this.currentLevel });
        //localStorage.currentLevel = this.currentLevel;
        //this.scene.stop('GameScene');
        //this.scene.start('GameScene');
    }
    hitPlayer(player,bullet){
        bullet.kill();
    }
}
export default GameScene