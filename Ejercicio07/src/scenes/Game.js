import Phaser from "phaser";
import Hero from "../prefabs/Hero";
import Enemy from "../prefabs/Enemy";
class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(data){
        this.setDefaults(data);
    }
    setDefaults(data){
        this.level = 0;
        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 500;
        this.BOUNCING_SPEED = 150;
        this.score = 0;
        this.dead = 0;
        this.originalX = 0;
        this.originalY = 0;
        this.mapName = 'level'+this.level;
    }
    create(){
        this.loadLevel();
        this.initPlayer();
        this.initEnemy();
    }

    loadLevel(){
        this.map = this.make.tilemap({key:this.mapName});
        this.tileSet = 
                this.map.addTilesetImage('tiles_spritesheet','tiles');
        this.collisionLayer = 
            this.map.createLayer('collisionLayer',this.tileSet);
        this.backgroundLayer = 
            this.map.createLayer('backgroundLayer',this.tileSet);
        this.physics.world.setBounds(0,0,this.map.widthInPixels,
            this.map.heightInPixels);
        this.backgroundLayer.setDepth(-1);
        this.collisionLayer.setCollisionBetween(1,156);
    }

    initPlayer(){
        let playerData 
            = this.findObjectsByType('player',this.map,'objectsLayer');
        this.hero = new Hero(this,playerData[0],'player');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.hero,this.collisionLayer);
        this.cameras.main.startFollow(this.hero);
    }

    initEnemy(){
        this.enemies = this.add.group({runChildUpdate:true});
        let enemyData = this.findObjectsByType('enemy',this.map,'objectsLayer');
        let enemy;
        enemyData.forEach(element=>{
            enemy = new Enemy(this,'slime',element,this.map);
            this.enemies.add(enemy);
        });
        this.physics.add.collider(this.enemies,this.collisionLayer);
    }

    findObjectsByType(targetType,tilemap,layer){
        let result = [];
        let objectsLayer = tilemap.getObjectLayer(layer);
        if(objectsLayer){
            objectsLayer.objects.forEach(element=>{
                if(element.properties.type == targetType){
                    result.push(element);
                }
            });
        }
        return result;
    }
    
    update(){
        this.hero.body.setVelocityX(0);
        if (this.cursors.left.isDown) {
            this.hero.setVelocityX(-200);
            this.hero.play('walking',true);
            this.hero.setFlipX(false);
        } else if (this.cursors.right.isDown) {
            this.hero.setVelocityX(200);
            this.hero.setFlipX(true);
            this.hero.anims.play('walking',true);
        }else{
            this.hero.anims.stop();
        }
    }
}
export default GameScene