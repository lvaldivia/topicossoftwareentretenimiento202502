import Car from "../prefabs/Car";
import Obstacle from "../prefabs/Obstacle";
class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    create() {
        this.add.image(0,0,'road').setOrigin(0,0);
        this.cars = this.physics.add.group();
        this.obstacles = this.physics.add.group({ runChildUpdate:true });
        this.obstacles.setDepth(10);
        this.list_cars = [];
        this.carColors = [0xff0000,0x0000ff];
        this.carTurnSpeed = 250;
        this.obstacleSpeed = 120;
        this.obstacleDelay = 1500;

        for (let i = 0; i < 2; i++) {
            let car = new Car
                (this, 0, this.game.config.height - 40, 
                    'car', i, this.carColors[i], this.carTurnSpeed);
            
            this.cars.add(car);
            this.list_cars.push(car);
        }
        this.input.on('pointerdown', this.moveCar, this);
        this.time.addEvent({
            delay:this.obstacleDelay,
            callback:()=>{
                let obstacle = new Obstacle(this,this.carColors,this.obstacleSpeed);
                this.obstacles.add(obstacle);
            },
            loop:true
        });
        this.physics.add.collider(this.cars,this.obstacles,this.checkGameOver,null,this);
    }
    checkGameOver(){
        this.scene.start("Game");
    }
    moveCar(pointer) {
        let laneWidth = this.game.config.width / 2;
        let carToMove  = Math.floor(pointer.x/laneWidth);
        let car = this.list_cars[carToMove];
        if(car){
            car.move(); 
        }
    }
}
export default Game;