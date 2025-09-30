import PreloadScene from "./scenes/PreloadScene.js";
import GameScene from "./scenes/GameScene.js";

let config = {
    width: 360,
    height: 700,
    scene:[PreloadScene,GameScene],
    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y:1000},
            //debug: true
        }
    }
}

new Phaser.Game(config);