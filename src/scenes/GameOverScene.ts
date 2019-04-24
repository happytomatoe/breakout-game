import {SceneNames} from "../helper/SceneNames";
import {GameScene} from "./GameScene";

export class GameOverScene extends Phaser.Scene {


    constructor(test) {
        super({
            key: SceneNames.GameOverScene
        });
    }


    create() {

        let t=this.add.text(+this.game.config.width/2,+this.game.config.height/2,"Game Over! Press R to try again",
            { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
        t.setColor('white')
        t.setFontSize(48)
        t.setOrigin(0.5,0.5)
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).on('down', (key, event) => {
            this.scene.stop()
            this.game.scene.getScene(SceneNames.GameScene).scene.restart()
        })


    }

}
