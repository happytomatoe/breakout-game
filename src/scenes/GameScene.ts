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
    private background: Phaser.GameObjects.Rectangle;
    private muteIcon: Phaser.GameObjects.Image;

    constructor(test) {
        super({
            key: SceneNames.GameScene
        });
    }


    create() {
        this.updatable = true;
        this.configureInput();
        this.createGameObjects();
        let v = this.add.image(+this.game.config.width - 50, 50, "icons", 'audioOn.png')
        v.setInteractive()
        v.setOrigin(0.5)
        this.muteIcon = v;
        v.on('pointerdown', () => {
            this.switchSoundMute();
        }, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this)
        this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this);
        this.sfxs = {
            ballCrashing: this.sound.add(SoundEffects.BallCrashing),
            paddleHit: this.sound.add(SoundEffects.PaddleHit),
            ballHit: this.sound.add(SoundEffects.BallHitting),

        };
    }

    private switchSoundMute() {
        this.muteIcon.setFrame(this.muteIcon.frame.name === 'audioOn.png' ? 'audioOff.png' : 'audioOn.png')
        this.sound.mute = !this.sound.mute;
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
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).on('down', function (key, event) {
                this.win();
            }, this)
        }

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M).on('down', function (key, event) {
            this.switchSoundMute();
        }, this);

    }

    private createGameObjects() {
        this.background = this.add.rectangle(0, 0, +this.game.config.width * 2, +this.game.config.height * 2, 0x2d2d8d, 1);
        this.paddle = new Paddle({
            scene: this,
            x: +this.game.config.width / 2,
            y: 0,
            texture: 'sprites',
            key: 'paddleBlu',
            cursors: this.cursors
        });
        this.paddle.setOrigin(0.5)
        this.paddle.setDisplaySize(250, 44)
        this.paddle.y = +this.game.config.height - this.paddle.height;

        this.createBricks();

        this.ball = new Ball({
            scene: this,
            x: this.paddle.x,
            y: this.paddle.y - this.paddle.height - 5,
            texture: 'sprites',
            key: 'ballBlue',
        }).setScale(1.3)
        this.ball.followPaddle(this.paddle);


    }

    private createBricks() {
        let bricksColors = ['element_yellow_rectangle', 'element_blue_rectangle', 'element_green_rectangle',
            'element_purple_rectangle', 'element_grey_rectangle'];
        var yCount = this.registry.get('brickRows'), xCount = this.registry.get('brickColumns');

        this.bricks = this.physics.add.staticGroup({
            key: 'sprites',
            frame: bricksColors,
            frameQuantity: xCount ,
            max:xCount*yCount,
            yoyo:true,
            gridAlign:{
                width: xCount,
                height: yCount,
                position: Phaser.Display.Align.CENTER,
                cellWidth: 64,
                cellHeight: 32,
                x: 110,
                y: 100
            }
        });
        this.brickCount = this.bricks.getLength()
    }

    hitBrick(ball, brick) {
        this.sfxs.ballHit.play();
        brick.disableBody(true, true);
        this.brickCount--;
        if (this.brickCount == 0) {
            this.win();
        }
    }

    hitPaddle(paddle, ball) {
        if (!this.ball.isStarted()) return;
        let sfx = this.sfxs.paddleHit;
        if (!sfx.isPlaying) sfx.play();
        let angle = Math.atan2(this.paddle.y - this.ball.y, this.paddle.x - this.ball.x);
        let v = -this.ball.getStartVelocity() * Math.cos(angle);

        ball.body.setVelocity(v, ball.body.velocity.y)
    }

    update(time, delta) {
        this.ball.update(time, delta)

        if (this.updatable) {

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

    win() {
        this.launchGameOverScene(false, "Congratulations!You won!\nPress R to restart");
    }

    gameover() {
        this.launchGameOverScene(true, "Game Over!\nPress R to restart");

    }

    private launchGameOverScene(explodeBall, text) {
        if (explodeBall) this.ball.explode();
        else this.ball.body.setVelocity(0);
        this.paddle.body.setVelocity(0, 0);
        this.updatable = false;

        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.scene.pause()
            this.scene.launch(SceneNames.GameOverScene, {text: text});

        }, this);
    }
}

