import "phaser";
import {BootScene} from "./scenes/BootScene";
import {GameScene} from "./scenes/GameScene";
import {TitleScene} from "./scenes/TitleScene";
import {PauseScene} from "./scenes/PauseScene";
import {GameOverScene} from "./scenes/GameOverScene";

// main game configuration
const config: GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: '#2d2d8d',
    scene: [BootScene,TitleScene, GameScene,PauseScene,GameOverScene],
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
        this.registry.set('test',true)
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});
