import PreloadScene from "./scenes/Preload";
import GameScene from "./scenes/Game";

let config ={
    width : 800,
    height : 600,
    pixelArt:true,
    antiAlias:false,
    scene:[PreloadScene,GameScene],
    scale:{
        mode:Phaser.Scale.FIT,
        autocentter:Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true,
        roundPixels: true,
    },
    physics:{
        default:'arcade',
        round: true, 
        arcade:{
            gravity:{
                y:200
            }
        }
    }
};
new Phaser.Game(config);