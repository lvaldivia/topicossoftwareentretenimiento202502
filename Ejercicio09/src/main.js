import Phaser from "phaser";
import PreloadGame from "./scenes/Preload.js";
import PlayGame from "./scenes/Game.js";
window.gameOptions = {
    gameWidth: 800,
    floorStart: 1 / 8 * 5,
    floorGap: 250,
    playerGravity: 10000,
    playerSpeed: 450,
    climbSpeed: 450,
    playerJump: 1800,
    diamondRatio: 2,
    doubleSpikeRatio: 1,
    skyColor: 0xaaeaff,
    safeRadius: 180,
    localStorageName: "climbgame",
    versionNumber: "1.0"
};

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let height = windowWidth > windowHeight ? windowWidth * 1.8 : windowHeight;

let config = {
    type: Phaser.AUTO,
    width: windowWidth,
    height: height * window.gameOptions.gameWidth / windowWidth,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloadGame, PlayGame]
};
new Phaser.Game(config);