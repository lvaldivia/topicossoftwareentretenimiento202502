class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,index, color,carTurnSpeed) {
        super(scene, x, y, texture);
        this.carTurnSpeed =carTurnSpeed;
        this.scene = scene
        this.tint = color
        this.positions = [
            this.scene.game.config.width * (index*4 + 1) / 8,
            this.scene.game.config.width * (index*4 + 3) / 8,
        ]
        this.side = index;
        this.x = this.positions[this.side];
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.moves = false;
        this.canMove = true;
        this.body.setAllowRotation(false);
    }

    move() {
        if(this.canMove){
            this.canMove = false;
            this.side = 1 - this.side;
            this.scene.tweens.add({
                targets: this,
                x: this.positions[this.side],
                duration: this.carTurnSpeed,
                ease: 'Linear',
                onComplete: () => {
                    this.canMove = true;
                }
            });
        }
    }
}
export default Car;