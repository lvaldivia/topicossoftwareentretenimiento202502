import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Game  from "./scenes/Game";

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 480,
    scene: [Preload, Game],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 120},
            debug: false
        }
    }
};

new Phaser.Game(config);