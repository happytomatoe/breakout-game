export default class Brick extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y,config.texture, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        // this.displayWidth=200;
        // this.displayHeight=20;
        
    }

    update(keys, time, delta) {



    }




}
