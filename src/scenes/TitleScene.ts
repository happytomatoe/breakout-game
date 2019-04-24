import {SceneNames} from "../helper/SceneNames";

export class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: SceneNames.TitleScene
        });
    }
    preload() {
    }
    create() {
     
        
        
        this.startGame();
    }

    update(time, delta) {
        
    }

    startGame() {
        this.scene.stop('GameScene');
        this.registry.set('attractMode', false);
        this.scene.start('GameScene');
        console.log(
            "Starting game scene")
    }

    restartScene() {
        //        this.attractMode.stop();
        this.scene.stop('GameScene');
        this.scene.launch('GameScene');
        this.scene.bringToTop();

        this.registry.set('restartScene', false);
    }
}

