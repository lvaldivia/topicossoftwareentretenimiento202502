class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene,carColors,obstacleSpeed){
        let position = Phaser.Math.Between(0,3);
        let x = scene.game.config.width * (position*2 +1) /8;
        super(scene, x, -20, 'obstacle');
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);
        this.tint = carColors[Math.floor(position/2)];
        this.body.setVelocityY(obstacleSpeed);
    }

    update(){
        if(this.y > this.scene.game.config.height){
            this.destroy();
        }
    }
}
export default Obstacle;
