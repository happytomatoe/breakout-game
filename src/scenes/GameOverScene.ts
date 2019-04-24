import {SceneNames} from "../helper/SceneNames";
import {GameScene} from "./GameScene";

export class GameOverScene extends Phaser.Scene {


    constructor(test) {
        super({
            key: SceneNames.GameOverScene
        });
    }


    create() {

        let t=this.createText(+this.game.config.width/2,+this.game.config.height/2,"Game Over!");
        this.createText(+this.game.config.width/2,+this.game.config.height/2+t.height,"Press R to try again");

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).on('down', (key, event) => {
            this.scene.stop()
            this.game.scene.getScene(SceneNames.GameScene).scene.restart()
        })


    }
    createText(x,y,text){
        let t=this.add.text(x,y,text,
            { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' ,boundsAlignH: "center", boundsAlignV: "middle"});
        t.setColor('white')
        t.setOrigin(0.5)
        t.setFontSize(48);
        return t;
    }

}
