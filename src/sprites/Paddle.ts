import CursorKeys = Phaser.Input.Keyboard.CursorKeys;

export default class Paddle extends Phaser.GameObjects.Sprite {
    private cursors:CursorKeys
    private speed
    private ratio
    constructor(config) {
        super(config.scene, config.x, config.y,config.texture ,config.key);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.cursors=config.cursors;
        this.body.immovable = true;
        this.speed=1200;

    }

    update(time, delta) {

        // let distance=Math.abs(this.scene.input.mousePointer.x - this.x)
        // if ( distance> this.speed) {
        //     this.body.setVelocityX(this.scene.input.mousePointer.x > this.x?this.speed:-this.speed)

        // }else if(distance > 3){
        //     this.body.setVelocityX(this.scene.input.mousePointer.x > this.x?distance*this.ratio:-distance*this.ratio)
            
        // }
        
        if(this.cursors.left.isDown){
            this.body.setVelocityX(-this.speed)
        }else if(this.cursors.right.isDown){
            this.body.setVelocityX(this.speed)
        }
        else
            this.body.setVelocityX(0)


    }




}
