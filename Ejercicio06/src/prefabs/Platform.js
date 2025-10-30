class Platform extends Phaser.Physics.Arcade.Group {
    constructor(scene, floorPool, numTiles, x, y, speed, coinsPool, firstTime) {
        super(scene.physics.world, scene);
        scene.add.existing(this);

        this.tileSize = 40;
        this.scene = scene;
        this.coinsPool = coinsPool;
        this.floorPool = floorPool;

        this.prepare(numTiles, x, y, speed, firstTime);
    }

    prepare(numTiles, x, y, speed, firstTime) {
        this.setActive(true);
        this.setVisible(true);

        this.alive = true;

        let i = 0;
        while(i < numTiles) {
            let floorTile = this.floorPool.getFirstDead();

            if(!floorTile) {
                floorTile = this.scene.physics.add.sprite(
                    x + i * this.tileSize,
                    y,
                    'floor'
                );
                this.floorPool.add(floorTile);
            } else {
                floorTile.enableBody(true, x + i * this.tileSize, y, true, true);
                floorTile.setActive(true);
                floorTile.setVisible(true);
            }

            this.add(floorTile);
            floorTile.body.setImmovable(true);
            floorTile.body.setAllowGravity(false);
            floorTile.body.setVelocityX(speed);

            i++;
        }

        if(!firstTime){
            this.addCoins(speed);
        }
    }

    addCoins(speed){
        let coinsY = 90 + Math.random() * 110;

        this.getChildren().forEach(tile => {
            if(Math.random() <= 0.4){
                let coin = this.coinsPool.getFirstDead();

                if(!coin){
                    coin = this.scene.physics.add.sprite(
                        tile.x,
                        tile.y - coinsY,
                        'coin'
                    );
                    this.coinsPool.add(coin);
                } else {
                    coin.enableBody(true, tile.x, tile.y - coinsY, true, true);
                }

                coin.body.setVelocityX(speed);
                coin.body.setAllowGravity(false);
            }
        });
    }

    kill(){
        this.alive = false;

        this.getChildren().forEach(tile => {
            this.remove(tile);

            tile.disableBody(true, true);
            this.floorPool.add(tile);
        });

        this.setActive(false);
        this.setVisible(false);
    }

    getLength() {
        return this.countActive(true);
    }

    getLastActive() {
        const last = this.getLast(true);
        return last && last.active ? last : null;
    }
}

export default Platform;
