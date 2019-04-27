import "phaser";
import {BootScene} from "./scenes/BootScene";
import {GameScene} from "./scenes/GameScene";
import {TitleScene} from "./scenes/TitleScene";
import {PauseScene} from "./scenes/PauseScene";
import {GameEndingScene} from "./scenes/GameEndingScene";
import {MenuScene} from "./scenes/MenuScene";

// main game configuration
const config: GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [BootScene, TitleScene, GameScene, PauseScene, GameEndingScene, MenuScene],
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
        this.registry.set("brickColumns",10)
        this.registry.set("brickRows",5)
        this.registry.set('test',true)
        this.registry.set('startBallVelocity',400)
        this.registry.set('paddleSpeed', 1000)

    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});
