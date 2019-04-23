/* globals __DEV__ */
import Paddle from '../sprites/Paddle'
import Ball from '../sprites/Ball'

import Brick from '../sprites/Brick'
import CursorKeys = Phaser.Input.Keyboard.CursorKeys;
export class GameScene extends Phaser.Scene {
    private cursors:CursorKeys;
    private paddle:Paddle;
    private bricks:Phaser.Physics.Arcade.StaticGroup;
    private ball:Ball;
    
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    create() {
        this.cursors=this.input.keyboard.createCursorKeys();
        this.paddle = new Paddle({
            scene: this,
            x: +this.game.config.width / 2,
            y: +this.game.config.height - 5,
            texture:'sprites',
            key: 'paddleBlu',
            cursors: this.cursors
        }).setScale(1.5);

        this.bricks = this.physics.add.staticGroup();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 10; j++) {
                this.bricks.create(
                    40 + j * 80,
                    70 + i * 48,
                    'sprites',
                    'element_blue_rectangle'
                )

            }
        }

        this.ball = new Ball({
            scene: this,
            x: this.paddle.x ,
            y: this.paddle.y - this.paddle.height - 20,
            texture:'sprites',
            key: 'ballBlue',
        })
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick)
        this.physics.add.overlap(this.paddle, this.ball, this.hitPaddle);

    }


    hitBrick(ball, brick) {
        brick.disableBody(true, true);
    }
    //TODO: fix bug with ball inside paddle
    hitPaddle(paddle, ball) {
        let v = paddle.body.velocity.x === 0 ? ball.body.velocity.x : (paddle.body.velocity.x + ball.body.velocity.x) / 2;
        ball.body.setVelocity(v, -ball.body.velocity.y)
    }


    update(time, delta) {
        this.paddle.update(time, delta)
        if(this.cursors.space.isDown){
            this.ball.start()
        }
        
    }
    render() {
        // if (__DEV__) {
        // this.game.debug.spriteInfo(this.paddle, 32, 32)
        // }
    }
}

