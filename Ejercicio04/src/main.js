import PreloadScene from "./scenes/PreloadScene.js";
import GameScene from "./scenes/GameScene.js";

let config = {
    width: 1280,
    height: 720,
    scene:[PreloadScene,GameScene],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y:500},
        }
    }
}

new Phaser.Game(config);