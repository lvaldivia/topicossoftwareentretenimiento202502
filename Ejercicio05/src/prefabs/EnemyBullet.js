class EnemyBullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'bullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);
    }
    update(){
        if(this.y > this.scene.game.config.height){
            this.setActive(false);
            this.setVisible(false);
            this.body.stop();
        }
    }
}

export default EnemyBullet;