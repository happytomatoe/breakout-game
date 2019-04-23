export class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        console.log(
            "Booting")

        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, +this.game.config.height / 2, +this.game.config.width * value, 60);
        });


        // this.load.image('paddleBlu', './assets/images/paddleBlu.png')
        // this.load.image('brick', './assets/images/element_yellow_rectangle.png')
        // this.load.image('ball', './assets/images/ballBlue.png')
        this.load.atlas('sprites', './src/assets/spritesheet.png', './src/assets/sprites.json');


        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            // makeAnimations(this);
            progress.destroy();
            this.scene.start('TitleScene');
        });
    }
}
