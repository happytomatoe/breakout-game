import {SoundEffects} from "../helper/SoundEffects";
import Paddle from "./Paddle";

export default class Ball extends Phaser.GameObjects.Sprite {
    private started: boolean
    private spriteBody: Phaser.Physics.Arcade.Body
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    private following;
    private objectToFollow: Phaser.GameObjects.Sprite;

    constructor(config) {
        super(config.scene, config.x, config.y, config.texture, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        this.started = false;
        this.body.bounce.set(1)
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.spriteBody = this.body
        this.following = false;
        var config2 = {
            key: 'explosion',
            frames: this.scene.anims.generateFrameNumbers('explosion', {start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: 0
        };

        this.scene.anims.create(config2);

        var particles = this.scene.add.particles('sprites');
        this.emitter = particles.createEmitter({
            frame: 'ballBlue',
            speed: 0,
            gravityX: 0,
            gravityY: 200,
            alpha: 0.1,
            active: false,
            follow: this
        });


        this.on('animationcomplete', function (anim, frame) {
            this.emit('animationcomplete_' + anim.key, anim, frame);
        }, this);﻿
    }

    getStartVelocity() {
        return this.scene.registry.get("startBallVelocity");
    }

    followPaddle(object: Paddle) {
        this.objectToFollow = object;
        this.following = true;
    }

    update(time, delta) {

        if (this.following) {
            this.x = this.objectToFollow.x;
        }
    }

    start() {
        if (!this.started) {
            this.body.setVelocityY(-this.getStartVelocity())
            this.started = true;
            this.following = false;
        }
        this.emitter.active = true;
        this.emitter.start();
    }

    explode() {
        this.emitter.stop();
        this.on('animationcomplete_explosion',()=>{
            this.setVisible(false);
        },this)
        let t=this.scene.sound.add(SoundEffects.Explosion);
        t.play()
        this.play('explosion')
        this.spriteBody.setVelocity(0)
    }

    isStarted(){
        return this.started;
    }
}
