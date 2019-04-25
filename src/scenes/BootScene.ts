import {SceneNames} from "../helper/SceneNames";
import {SoundEffects} from "../helper/SoundEffects";

export class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: SceneNames.BootScene
        });
    }

    preload() {
        console.log("Booting")

        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, +this.game.config.height / 2, +this.game.config.width * value, 60);
        });


        this.load.atlas('sprites', './assets/images/spritesheet.png', './assets/images/sprites.json');
        this.load.atlasXML('icons', './assets/images/sheet_white1x.png', './assets/images/sheet_white1x.xml');
        this.load.spritesheet("explosion",'./assets/images/Explosion.png',{ frameWidth: 34, frameHeight: 34, endFrame: 12 })
        let audioBasePath = 'assets/audio/sfx/';
        this.load.audio(SoundEffects.BallHitting, audioBasePath + 'ballHitting.ogg');
        this.load.audio(SoundEffects.Explosion, audioBasePath + 'explosion.wav');
        this.load.audio(SoundEffects.BallCrashing, audioBasePath + 'ballCrashing.ogg');
        this.load.audio(SoundEffects.PaddleHit, audioBasePath + 'paddleHit.ogg');


        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            // makeAnimations(this);
            progress.destroy();
            this.scene.start(SceneNames.MenuScene);
        });
    }
}
