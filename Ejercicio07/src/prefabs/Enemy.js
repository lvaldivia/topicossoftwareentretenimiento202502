class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,key,position,tilemap){
        super(scene,position.x,position.y,key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.tilemap = tilemap;
        this.setOrigin(0.5,0.5);
        this.body.setCollideWorldBounds(true);
        this.body.bounce.set(1,0);
        this.body.velocity.x = position.properties.velocity/2;
    }
    update(){
        let direction;
        if(this.body.velocity.x > 0){
            this.setFlipX(true);
            direction = 1;
        }else{
            this.setFlipX(false);
            direction = -1;
        }
        if(this.body.velocity.y == 0){

        }
        let nextX = this.x + direction * (Math.abs(this.width)/2+1);
        let nextY = this.y + (this.height/2)+1;
        let nextTile = this.tilemap.getTileAtWorldXY(
            nextX,nextY,true,this.scene.cameras.main,'collisionLayer'
        );
        if((!nextTile || nextTile.index == -1) && this.body.blocked.down){
            this.body.velocity.x *= -1;
        }
    }
}
export default Enemy;