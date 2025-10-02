import PreloadScene from "./scenes/Preload";
import GameScene from  "./scenes/GameScene"

let config = {
    width: window.innerWidth,
    height: window.innerHeight,
    scene:[PreloadScene,GameScene],
    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default:'arcade'
    }
}
new Phaser.Game(config);