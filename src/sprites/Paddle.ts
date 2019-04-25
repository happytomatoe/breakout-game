import CursorKeys = Phaser.Input.Keyboard.CursorKeys;

export default class Paddle extends Phaser.GameObjects.Sprite {
    private cursors:CursorKeys
    readonly speed
    private ratio
    private spriteBody:Phaser.Physics.Arcade.Body
    constructor(config) {
        super(config.scene, config.x, config.y,config.texture ,config.key);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.cursors=config.cursors;
        this.body.immovable = true;
        this.speed=1200;
        this.spriteBody=this.body
    }

    update(time, delta) {
        if(this.spriteBody.onWall()){
            console.log("On wall")
        }
        if(this.cursors.left.isDown){
            this.body.setVelocityX(-this.speed)
        }else if(this.cursors.right.isDown){
            this.body.setVelocityX(this.speed)
        }
        else
            this.body.setVelocityX(0)
    }




}
