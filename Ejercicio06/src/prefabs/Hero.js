
class Hero extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key){
        super(scene,x,y,key);
        this.setOrigin(0.5);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('player',{
                frames:[0,1,2,3,2,1]
            }),
            frameRate:15,
            repeat:-1
        });
        this.anims.play('running');
        this.body.setSize(38,60);

    }
}

export default Hero;