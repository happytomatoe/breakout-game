import {SceneNames} from "../helper/SceneNames";

export class PauseScene extends Phaser.Scene {


    constructor(test) {
        super({
            key: SceneNames.PauseScene
        });
    }


    create() {
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P).on('down', (key, event) => {
            this.scene.stop()
            this.scene.resume(SceneNames.GameScene);
        })


    }

}
