class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    } 
    setDefault(){
        this.gameOver = false;
        this.canJump = true;
        this.isClimbing = false;
        this.reachedFloor = 0;
        this.collecDiamonds = 0;
        this.floorGroup = this.add.group();
        this.ladderGroup = this.add.group();
        this.diamondGroup = this.add.group();
        this.spikedGroup = this.add.group();
        this.overlayGroup = this.add.group();
        this.menuGroup = this.add.group();
        this.flooPool = [];
        this.ladderPool = [];
        this.diamondPool = [];
        this.spikePool = [];
        this.gameGroup = this.add.container(0,0);
    }
    create(){
        this.setDefault();
        this.defineEmitters();
        this.drawLevel();
        this.defineScrolllTween();
        this.createMenu();
        this.createOverlay();
        this.input.on("pointerdown", this.handleJump, this);
    }
    handleJump(){

    }
    defineEmitters(){
        /*this.emitManager = this.add.particles("diamondparticle");
        this.emitter = this.emitManager.createEmitter({
            x : 0,
            y:0,
            quantity: 20,
            lifeSpan: 700,
            scale: { start: 0.6, end: 0.2},
            alpha: { start: 0.7, end: 0 },
            on: false
        });
        this.gameGroup.add(this.emitter);*/
    }
    createMenu(){
        this.tap = this.add.sprite(this.game.config.width / 2,
                 this.game.config.height -150, "tap").setOrigin(0.5);
        this.menuGroup.add(this.tap);
        this.tweens.add({
            targets: this.tap,
            alpha: 0,
            duration: 200,
            yoyo:true,
            repeat: -1
        });
        this.tapText = this.add.bitmapText(this.game.config.width / 2,
            this.tap.y-120,'font', 'TAP TO JUMP', 45).setOrigin(0.5);
        this.tileText = this.add.bitmapText(this.game.config.width / 2,
            this.tap.y - 200, 'font', 'LADDERZ', 90).setOrigin(0.5);
        this.menuGroup.add(this.tapText);
        this.menuGroup.add(this.tileText);
    }
    drawLevel(){
        this.currentFloor = 0;
        this.highestFloorY = this.game.config.height * window.gameOptions.floorStart;
        this.floorsBeforeDisappear = 
         Math.ceil(
            (this.game.config.height  - this.game.config.height * window.gameOptions.floorStart)
                /window.gameOptions.floorGap
         ) + 1;
        while(this.highestFloorY > -2 * window.gameOptions.floorGap){
            this.addFloor();
            if(this.currentFloor > 0){
                this.addLadder();
                this.addDiamond();
                this.addSpike();
            }
            this.highestFloorY -= window.gameOptions.floorGap;
            this.currentFloor++;
        }
        this.highestFloorY += window.gameOptions.floorGap; 
        this.currentFloor= 0;
        this.addHero();
    }
    addFloor(){
        let floor;
        if(this.flooPool.length){
            floor = this.flooPool.pop();
            floor.y = tjhis.highestFloorY;
            floor.active = true;
            floor.visible = true;
        }else{
            floor = this.physics.add.sprite(0,this.highestFloorY,'floor').setOrigin(0,0);
            floor.body.immovable = true;
            floor.body.allowGravity = false;
            this.floorGroup.add(floor);
        }
    }
    addLadder(){
        let x = Phaser.Math.Between(50, this.game.config.width - 50);
        let ladder;
        if(this.ladderPool.length){
            ladder = this.ladderPool.pop();
            ladder.y = this.highestFloorY;
            ladder.x = x;
            ladder.active = true;
            ladder.visible = true;
        }else{
            ladder = this.physics.add.sprite(0,this.highestFloorY,'ladder').setOrigin(0.5,0);
            ladder.body.immovable = true;
            ladder.body.allowGravity = false;
            this.ladderGroup.add(ladder);
        }
    }
    addDiamond(){
        if(Phaser.Math.Between(0,window.gameOptions.diamondRatio) !=0)return;
        let x = Phaser.Math.Between(50, this.game.config.width - 50);
        let y = this.highestFloorY - window.gameOptions.floorGap/2;
        let d;
        if(this.diamondPool.length){
            d = this.diamondPool.pop();
            d.x = x;
            d.y = y;
            d.active = true;
            d.visible = true;
        }else{
            d = this.physics.add.sprite(x,y,'diamond').setOrigin(0.5);
            d.body.immovable = true;
            d.body.allowGravity = false;
            this.diamondGroup.add(d);
        }
    }
    addSpike(){
        let spikes = Phaser.Math.Between(0,window.gameOptions.doubleSpikeRatio) == 0 ? 2 : 1;
        for(let i = 0; i < spikes; i++){
            let x = this.findSpikePosition();
            if(!x) continue;
            let spike;
            if(this.spikePool.length){
                spike = this.spikePool.pop();
                spike.x = x;
                spike.y = this.highestFloorY - 20;
                spike.active = true;
                spike.visible = true;
            }else{
                spike = this.physics.add.sprite(x,this.highestFloorY - 20,'spike').setOrigin(0.5,0);
                spike.body.immovable = true;
                spike.body.allowGravity = false;
                this.spikedGroup.add(spike);
            }
        }
    }
    findSpikePosition(){

    }
    addHero(){

    }
    defineScrolllTween(){

    }
    createOverlay (){
        this.cloud = this.add.sprite(0,this.game.config.height,"cloud")
                .setOrigin(0,1).setTint(window.gameOptions.skyColor.skyColor);
        this.overlayGroup.add(this.cloud)
    }

}
export default PlayGame;