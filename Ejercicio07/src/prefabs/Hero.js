
class Hero extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,position,key){
        super(scene,position.x,position.y,key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.setOrigin(0.5,0.5);
        this.body.setCollideWorldBounds(true);
        this.anims.create({
            key:'walking',
            frames:this.anims.generateFrameNumbers('player',{
                frames:[0,1,2,1]
            }),
            frameRate: 6,
            repeat:-1
        });
    }
}

export default Hero;