class Goal extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,position,key){
        super(scene,position.x,position.y,key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.nextLevel = position.properties.nextLevel;
    }
}