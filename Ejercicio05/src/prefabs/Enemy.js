class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,config){
        super(scene,x,y,key);
        this.setOrigin(0.5);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scale = config.scale;
        this.speedX = config.speedX;
        this.speedY = config.speedY;
        this.health = config.health;
        this.body.setVelocity(this.speedX,this.speedY);
        this.startShooting();
    }
    startShooting(){
        this.shoot();
    }
    shoot(){
        //dispara bullet
    }
    update(){
        if(this.x < 0.05 * this.scene.game.config.width){
            this.x = 0.05 * this.scene.game.config.width + 2;
            this.body.velocity.x *=-1;
        }else if(this.x > 0.95 * this.scene.game.config.width){
            this.x = 0.95 * this.scene.game.config.width - 2;
            this.body.velocity.x *=-1;
        }
    }
    getHit(damage){
        this.health-=damage;
        if(this.health<=0){
            this.createExplosion();
            this.destroyEnemy();
        }
    }
    createExplosion(){
        let particle = this.scene.add.particles(
            0,0,'enemyParticle',{
                x :this.x,
                y: this.y,
                speed: {min:-100,max:100},
                gravityY:0,
                quantity:100,
                frame:2,
                duration:500
            }
        );
    }
    destroyEnemy(){
        this.destroy();
    }
}
export default Enemy;