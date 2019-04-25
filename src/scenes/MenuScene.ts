import {SceneNames} from "../helper/SceneNames";
import {GameScene} from "./GameScene";

export class MenuScene extends Phaser.Scene {


    constructor(test) {
        super({
            key: SceneNames.MenuScene
        });
    }


    create() {
        if(this.registry.get('test'))this.start()
        let startButton = this.createButton(+this.game.config.width / 2, 300, "Start")
        startButton.on('pointerdown', function (pointer) {
            startButton.setFrame('buttonSelected')
            this.start();

        }, this);
        startButton.on('pointerup', function (pointer) {
            startButton.setFrame('buttonDefault')

        })

    }

    private start() {
        this.scene.run(SceneNames.TitleScene)
        this.scene.stop()
    }

    createButton(x, y, text) {
        let starButton = this.add.image(x, y, 'sprites', 'buttonDefault')
        starButton.setInteractive()
        let t = this.add.text(100, 100, text)
        t.setColor('black')
        Phaser.Display.Align.In.Center(t, starButton);
        return starButton;
    }

}
