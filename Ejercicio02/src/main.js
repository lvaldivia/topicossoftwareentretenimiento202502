import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/GameScene'

let config = {
    width: 360,
    height: 460,
    type: Phaser.AUTO,
    scene: [PreloadScene,MenuScene,GameScene]
};
let game = new Phaser.Game(config);