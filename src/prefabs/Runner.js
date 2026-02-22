class Runner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(28, 28);
        this.body.setOffset(2, 6);

        // other vars
        this.justSpawned = true;
        this.color = "blue";

        scene.runnerColor = new StateMachine("blue", {
            red: new RedState(),
            blue: new BlueState()
        }, [scene, this])
        
        scene.runnerState = new StateMachine("running", {
            running: new RunningState(),
            jumping: new JumpState(),
            falling: new FallingState(),
            coyote: new CoyoteState()
        }, [scene, this]);

        // jump / gravity
        this.jumpStrength = 600;
        this.jumpRecoil = 4;    // higher number = faster the runner stops when letting go of space
        this.gravity = 1300;
        this.coyoteTime = 80; // in ms

        // grav switching
        this.gravCooldownTime = 1000;  
        this.numFlashes = 2;    
        this.gravCooldown = false;

        // colors
        this.redTint = scene.redHex;
        this.blueTint = scene.blueHex;
        this.flashTint = 0xc4628b;

        
    }

    initGravCooldown(scene) {
        this.gravCooldown = true;
        this.cooldownTimer = scene.time.delayedCall(this.gravCooldownTime, () => {
            this.gravCooldown = false;
        }, null, this);
        this.flashingTimer = scene.time.addEvent({
            delay: this.gravCooldownTime / (this.numFlashes*2),
            callback: () => {
                if (this.tintTopLeft == 0xFFFFFF) {
                    this.setTint(this.flashTint);
                } else {
                    this.setTint(0xFFFFFF);
                }
            },
            callbackScope: this,
            repeat: (this.numFlashes*2)-1
        })

    }
}

class RunningState extends State {
    enter(scene, runner) {
        runner.setVelocity(0);
        runner.anims.play(`${runner.color}-run`)
    }

    execute(scene, runner) {
        // handle transitions
        if (Phaser.Input.Keyboard.JustDown(scene.keySPACE)) {
            this.stateMachine.transition("jumping");
            return;
        }

        if (Math.abs(runner.body.velocity.y) > 0.01) {
            this.stateMachine.transition("coyote");
            return;
        }
    }
}

class JumpState extends State {
    enter(scene, runner) {
        if (scene.runnerColor.state == "blue") {
            runner.setVelocity(0, -runner.jumpStrength);
        } else {
            runner.setVelocity(0, runner.jumpStrength);
        }
        runner.anims.play(`${runner.color}-jump`)
        scene.sound.play("jump", {rate: Phaser.Math.FloatBetween(0.9, 1.2)});
    }

    execute(scene, runner) {
        if (scene.keySPACE.isUp) {
            runner.setVelocityY(runner.body.velocity.y / runner.jumpRecoil);
            this.stateMachine.transition("falling");
            return;
        }

        if (scene.runnerColor.state == "blue") {
            if (runner.body.velocity.y >= 0) {
                this.stateMachine.transition("falling");
                return;
            }
        } else {
            if (runner.body.velocity.y <= 0) {
                this.stateMachine.transition("falling");
                return;
            }
        } 
    }
}

class FallingState extends State {
    enter(scene, runner) {
        runner.anims.play(`${runner.color}-fall`)
    }

    execute(scene, runner) {
        if (scene.runnerColor.state == "blue") {
            if (runner.body.onFloor()) {
                this.stateMachine.transition("running");
            }
        } else {
            if (runner.body.onCeiling()) {
                this.stateMachine.transition("running");
            }
        }
        
    }
}

class CoyoteState extends State {
    enter(scene, runner) {
        scene.time.delayedCall(runner.coyoteTime, () => {
            if (this.stateMachine.state != "jumping") this.stateMachine.transition("falling");
        }, null, this);
    }

    execute(scene, runner) {
        if (Phaser.Input.Keyboard.JustDown(scene.keySPACE)) {
            this.stateMachine.transition("jumping");
            return;
        }
    }
}

class RedState extends State {
    enter(scene, runner) {
        runner.body.setGravityY(-Math.abs(runner.gravity));
        runner.initGravCooldown(scene);
        runner.setFlipY(true);
        runner.body.setOffset(2, 0);
        runner.color = "red";
    }

    execute(scene, runner) {
        if (!runner.gravCooldown && Phaser.Input.Keyboard.JustDown(scene.keyE)) {
            this.stateMachine.transition("blue");
            scene.sound.play("switch", {rate: Phaser.Math.FloatBetween(0.9, 1.2)});
        } else if (runner.gravCooldown && Phaser.Input.Keyboard.JustDown(scene.keyE)) {
            scene.shakeCamera(75, 0.005);
            scene.sound.play("glassBreak", {rate: Phaser.Math.FloatBetween(0.9, 1.2)});
        }
    }
}

class BlueState extends State {
    enter(scene, runner) {
        runner.body.setGravityY(Math.abs(runner.gravity));
        runner.setFlipY(false);
        runner.body.setOffset(2, 6);
        if (!runner.justSpawned) {
            runner.initGravCooldown(scene);
        } else {
            runner.justSpawned = false;
        }
        runner.color = "blue";
    }

    execute(scene, runner) {
        if (!runner.gravCooldown && Phaser.Input.Keyboard.JustDown(scene.keyE)) {
            this.stateMachine.transition("red");
            scene.sound.play("switch", {rate: Phaser.Math.FloatBetween(0.9, 1.2)});
        } else if (runner.gravCooldown && Phaser.Input.Keyboard.JustDown(scene.keyE)) {
            scene.shakeCamera(75, 0.005);
            scene.sound.play("glassBreak", {rate: Phaser.Math.FloatBetween(0.9, 1.2)});
        }
    }
}