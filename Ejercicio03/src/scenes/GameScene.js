import Phaser  from "phaser";
class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene')
    }
    create(){
        this.ground = this.physics.add.sprite(0,0,'ground');
        this.ground.setOrigin(0,0);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.ground.y = this.game.config.height- this.ground.height;
        this.levelData = JSON.parse(this.cache.text.get("level"));
        console.log(this.levelData.playerStart);
        this.platforms = this.physics.add.group({
            allowGravity:false,
            immovable:true
        });
        this.createPlatfoms();
        this.createPlayer();
    }
    createPlatfoms(){
        this.levelData.platformData.forEach(element => {
            //let platform = this.add.sprite(element.x,element.y,'platform')
            this.platforms.create(element.x,element.y,'platform');
        });

        this.platforms.children.iterate((child)=>{
            child.setOrigin(0,0);
        });
    }
    createPlayer(){
        this.player = this.physics.add.sprite(
            this.levelData.playerStart.x,
            this.levelData.playerStart.y,
            'player'
        );
        this.physics.add.collider(this.player,this.ground);
        this.physics.add.collider(this.player,this.platforms);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if(this.cursors.up.isDown &&
            this.player.body.touching.down
        ){
            this.player.setVelocityY(-700);
        }
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setScale(1,1);
            this.player.body.setOffset(0,0);
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setScale(-1,1);
            this.player.body.setOffset(this.player.width,0);
        }else{
            this.player.setVelocityX(0);
        }
    }
}
export default GameScene;