/* globals __DEV__ */
import Paddle from '../sprites/Paddle'
import Ball from '../sprites/Ball'
import CursorKeys = Phaser.Input.Keyboard.CursorKeys;
import {SceneNames} from "../helper/SceneNames";
import {SoundEffects} from "../helper/SoundEffects";


export class GameScene extends Phaser.Scene {
    private cursors: CursorKeys;
    private paddle: Paddle;
    private bricks: Phaser.Physics.Arcade.StaticGroup;
    private ball: Ball;
    private brickCount: integer;
    private keys;
    private sfxs;
    private updatable;

    constructor(test) {
        super({
            key: SceneNames.GameScene
        });
    }


    create() {
        this.updatable=true;
        this.configureInput();
        this.createGameObjects();
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
        this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this);

        this.sfxs = {
            ballCrashing: this.sound.add(SoundEffects.BallCrashing),
            paddleHit: this.sound.add(SoundEffects.PaddleHit),
            ballHit: this.sound.add(SoundEffects.BallHitting),

        };
    }

    private configureInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('R,P');
        if (this.game.registry.get('test')) {
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P).on('down', function (key, event) {
                this.scene.pause();
                this.scene.launch(SceneNames.PauseScene)

            }, this);
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G).on('down', function (key, event) {
                this.gameover();
            }, this)
        }
    }

    private createGameObjects() {
        this.paddle = new Paddle({
            scene: this,
            x: +this.game.config.width / 2,
            y: +this.game.config.height - 5,
            texture: 'sprites',
            key: 'paddleBlu',
            cursors: this.cursors
        }).setScale(1.5);
        this.createBricks();

        this.ball = new Ball({
            scene: this,
            x: this.paddle.x,
            y: this.paddle.y - this.paddle.height - 20,
            texture: 'sprites',
            key: 'ballBlue',
        }).setScale(1.3)
    }

    private createBricks() {
        this.bricks = this.physics.add.staticGroup();
        let bricksColors = ['element_yellow_rectangle', 'element_blue_rectangle', 'element_green_rectangle',
            'element_purple_rectangle', 'element_grey_rectangle'];
        var yCount=7,xCount=10;
        for (let i = 0; i < yCount ; i++) {
            let t = i;
            if (t >= bricksColors.length) t %= bricksColors.length
            for (let j = 0; j < xCount; j++) {
                this.bricks.create(
                    110 + j * 65,
                    100 + i * 35,
                    'sprites',
                    bricksColors[t]
                )

            }
        }
        this.brickCount = this.bricks.getLength()
    }

    hitBrick(ball, brick) {
        this.sfxs.ballHit.play();
        brick.disableBody(true, true);
        this.brickCount--;
        if (this.brickCount == 0) {
            this.scene.pause();
        }
    }

    hitPaddle(paddle, ball) {
        let sfx = this.sfxs.paddleHit;
        if (!sfx.isPlaying) sfx.play()
        let v = paddle.body.velocity.x === 0 ? ball.body.velocity.x : (paddle.body.velocity.x + ball.body.velocity.x) / 2;
        ball.body.setVelocity(v, Math.max(-400, ball.body.velocity.y))
    }


    update(time, delta) {
        if(this.updatable) {
            this.paddle.update(time, delta)
            if (this.cursors.space.isDown) {
                this.ball.start()
            }
            let bodyOnFloor = this.ball.y + this.ball.height > this.game.config.height;
            if (this.ball.body.onFloor() && bodyOnFloor) {
                this.gameover();
            }
        }
        if (this.keys.R.isDown) {
            this.scene.restart();
        }


    }

    gameover() {
        this.ball.body.setVelocity(0,0);
        this.paddle.body.setVelocity(0,0);
        this.updatable=false;

        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.scene.pause()
            console.log("Launching gameover")
            this.sound.play(SoundEffects.BallCrashing, {volume: 0.4})
            this.scene.launch(SceneNames.GameOverScene);

        }, this);

    }


}

