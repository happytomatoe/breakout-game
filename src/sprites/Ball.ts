export default class Ball extends Phaser.GameObjects.Sprite {
    private started:boolean

    constructor(config) {
        super(config.scene, config.x, config.y,config.texture, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        this.started = false;
        this.body.bounce.set(1)
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // this.displayWidth=20;
        // this.displayHeight=20;

    }

    update(keys, time, delta) {



    }

    start() {
        if (!this.started) {
            this.body.setVelocityY(-500)
            this.body.setVelocityX(10)

            this.started = true

        }
    }

}
