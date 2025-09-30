import Phaser  from "phaser";
class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene')
    }
    create(){
        this.ground = this.physics.add.sprite(0,0,'ground');
        this.ground.setOrigin(0,0);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.ground.y = this.game.config.height- this.ground.height;
        this.levelData = JSON.parse(this.cache.text.get("level"));
        this.platforms = this.physics.add.group({
            allowGravity:false,
            immovable:true
        });
        this.fires = this.physics.add.group();
        this.barrels = this.physics.add.group();
        this.createPlatfoms();
        this.createPlayer();
        this.createFire();
        this.createGorilla();
        this.createButtons();
        this.elapsed = 0;
        this.barrelFrequency = this.levelData.barrelFrequency * 1000;
        this.barrelSpeed = this.levelData.barrelSpeed;
        this.physics.add.collider(this.player,this.ground);
        this.physics.add.collider(this.player,this.fires);
        this.physics.add.collider(this.platforms,this.fires);
        this.physics.add.collider(this.platforms,this.barrels);
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.gorilla,this.platforms);
    }
    createButtons(){
        this.playerLeft = false;
        this.playerRight = false;
        this.playerJump = false;
        this.actionButton = this.add.sprite(0,0,'actionButton');
        this.actionButton.setInteractive();
        this.actionButton.x = this.game.config.width - this.actionButton.width;
        this.actionButton.y = this.game.config.height - this.actionButton.height;
        this.actionButton.on('pointerdown',this.jump,this);
        this.actionButton.on('pointerup',this.cancelJump,this);
        this.leftButton = this.add.sprite(0,0,'arrowButton');
        this.leftButton.x = this.leftButton.width;
        this.leftButton.y = this.actionButton.y;
        this.leftButton.setInteractive();
        this.leftButton.on('pointerdown',this.moveLeft,this);
        this.leftButton.on('pointerup',this.cancelLeft,this);

        this.rightButton = this.add.sprite(0,0,'arrowButton');
        this.rightButton.x = this.leftButton.x + this.leftButton.width + 25;
        this.rightButton.y = this.actionButton.y;
        this.rightButton.setInteractive();
        this.rightButton.on('pointerdown',this.moveRight,this);
        this.rightButton.on('pointerup',this.cancelRight,this);
    }
    moveRight(){
        this.playerRight = true;
    }
    cancelRight(){
        this.playerRight = false;
    }
    moveLeft(){
        this.playerLeft = true;
    }
    cancelLeft(){
        this.playerLeft = false;
    }
    jump(){
        this.playerJump = true;
    }
    cancelJump(){
        this.playerJump = false;
    }
    createGorilla(){
        this.gorilla = this.physics.add.sprite(0,0,'gorilla');
        this.gorilla.setOrigin(0,0);
    }
    createFire(){
        this.levelData.fireData.forEach(element => {
            this.fires.create(element.x,element.y,'fire');
        });
        this.fires.children.iterate((child)=>{
            child.setOrigin(0,0);
        });
    }
    createPlatfoms(){
        this.levelData.platformData.forEach(element => {
            //let platform = this.add.sprite(element.x,element.y,'platform')
            this.platforms.create(element.x,element.y,'platform');
        });

        this.platforms.children.iterate((child)=>{
            child.setOrigin(0,0);
        });
    }
    createPlayer(){
        this.player = this.physics.add.sprite(
            this.levelData.playerStart.x,
            this.levelData.playerStart.y,
            'player'
        );
        this.anims.create({
            key:'run',
            frames:this.anims.generateFrameNames('player',{
                start:0,end:1
            }),
            frameRate:8,
            repeat: -1
        });
        this.anims.create({
            key:'jump',
            frames:[{key:'player',frame:2}],
            frameRate:1,
            repeat: 0
        });
        this.anims.create({
            key:'idle',
            frames:[{key:'player',frame:3}],
            frameRate:1,
            repeat: 0
        });
       
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(time,delta){
        this.elapsed += delta;
        if(this.elapsed >= this.barrelFrequency){
            this.elapsed = 0;
            this.createBarrel();
        }
        if((this.cursors.up.isDown || this.playerJump) &&
            this.player.body.touching.down
        ){
            this.player.setVelocityY(-700);
            this.player.play("jump");
        }
        if(this.cursors.left.isDown || this.playerLeft){
            this.player.setVelocityX(-160);
            this.player.setScale(1,1);
            this.player.body.setOffset(0,0);
            this.player.play("run");
        }else if(this.cursors.right.isDown || this.playerRight){
            this.player.setVelocityX(160);
            this.player.setScale(-1,1);
            this.player.body.setOffset(this.player.width,0);
            this.player.play("run");
        }else{
            this.player.setVelocityX(0);
            this.player.play("idle");
        }
        this.barrels.children.iterate((item)=>{
            if(item.y > 600){
                item.disableBody(true,true);
            }
        })
    }

    createBarrel(){
        let barrel = this.barrels.getFirstDead();
        if(!barrel){
            barrel = this.physics.add.sprite(
                this.levelData.goal.x,
                this.levelData.goal.y,
                'barrel'
            );
            this.barrels.add(barrel);
        }else{
            barrel.setActive(true);
            barrel.setVisible(true);
            barrel.body.enable = true;
            barrel.setPosition(this.levelData.goal.x,
                this.levelData.goal.y);
        }
        
        barrel.setCollideWorldBounds(true);
        barrel.body.bounce.setTo(1,0.5);
        barrel.body.setVelocityX(this.barrelSpeed);
    }
}
export default GameScene;