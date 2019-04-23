import "phaser";
import {BootScene} from "./scenes/BootScene";
import {GameScene} from "./scenes/GameScene";
import {TitleScene} from "./scenes/TitleScene";

// main game configuration
const config: GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [BootScene,TitleScene, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0}
        }
    }
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});
