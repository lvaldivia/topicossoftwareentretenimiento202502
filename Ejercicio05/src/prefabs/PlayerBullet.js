class PlayerBullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'bullet');
        this.setOrigin(0.5);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    update(){
        if(this.y < 0){
            this.kill();
        }
    }
    kill(){
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
    }

}

export default PlayerBullet;