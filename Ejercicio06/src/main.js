import PreloadScene from "./scenes/Preload";
import GameScene from "./scenes/Game";

let config ={
    width : 480,
    height : 320,
    scene:[PreloadScene,GameScene],
    scale:{
        mode:Phaser.Scale.FIT,
        autocentter:Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:1000
            }
        }
    }
};
new Phaser.Game(config);