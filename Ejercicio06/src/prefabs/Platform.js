class Platform extends Phaser.Physics.Arcade.Group{
    constructor(scene,floorPool,numTiles,x,y,speed,coinsPool,firstTime){
        super(scene.physics.world,scene);
        scene.add.existing(this);
        this.tileSize = 40;
        this.scene = scene;
        this.coinsPool = coinsPool;
        this.floorPool = floorPool;
        this.prepare(numTiles,x,y,speed,firstTime);
    }
    prepare(numTiles,x,y,speed,firstTime){
        this.alive = true;
        let i = 0;
        while(i<numTiles){
            let floorTile = this.floorPool.getFirstDead();
            if(!floorTile){
                floorTile = this.scene.physics.add.sprite(
                    x + i*this.tileSize,y,'floor'
                );
            }else{
                floorTile.setPosition(x + i*this.tileSize,y);
                floorTile.setActive(true);
                floorTile.setVisible(true);
                this.scene.physics.world.enable(floorTile);
            }
            this.add(floorTile);
            floorTile.body.setImmovable(true);
            floorTile.body.setAllowGravity(false);
            i++;
        }
        this.getChildren().forEach(tile=>{
            tile.body.velocity.x = speed;
        });
        if(!firstTime){

        }
    }
    kill(){
        this.alive = false;
        this.getChildren().forEach(tile=>{
            tile.setActive(false);
            tile.setVisible(false);
            this.floorPool.add(tile);
        })
    }
}
export default Platform;