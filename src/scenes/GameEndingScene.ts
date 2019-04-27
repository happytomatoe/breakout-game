import {SceneNames} from "../helper/SceneNames";

export class GameEndingScene extends Phaser.Scene {

    private text:string

    constructor(test) {
        super({
            key: SceneNames.GameOverScene
        });
    }
    init(data)
    {
        this.text=data.text;
        console.log('init', data);
    }

    create() {
        let t=this.add.text(+this.game.config.width/2,+this.game.config.height/2,this.text,
            { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' ,align:'center'});
        t.setColor('white')
        t.setOrigin(0.5)
        t.setFontSize(48);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).on('down', (key, event) => {
            this.scene.stop()
            this.game.scene.getScene(SceneNames.GameScene).scene.restart()
        })


    }

}
