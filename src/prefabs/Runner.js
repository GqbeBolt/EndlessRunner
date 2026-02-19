class Runner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        //this.body.setCollideWorldBounds(true);
        
        scene.runnerState = new StateMachine("running", {
            running: new RunningState(),
            jumping: new JumpState(),
            falling: new FallingState()
        }, [scene, this]);

        scene.runnerColor = new StateMachine("blue", {
            red: new RedState(),
            blue: new BlueState()
        }, [scene, this])
    
        // jump / gravity
        this.jumpStrength = 650;
        this.jumpRecoil = 4;    // higher number = faster the runner stops when letting go of space
        this.gravity = 1650;
        this.coyoteTime = 80; // in ms

        // grav switching
        this.gravCooldownTime = 1000;  
        this.numFlashes = 2;    
        this.gravCooldown = false;

        // colors
        this.redTint = scene.redHex;
        this.blueTint = scene.blueHex;
        this.flashTint = scene.pinkHex;

        // other
        this.justSpawned = true;
    }

    initGravCooldown(prevTint, scene) {
        this.gravCooldown = true;
        this.cooldownTimer = scene.time.delayedCall(this.gravCooldownTime, () => {
            this.gravCooldown = false;
        }, null, this);
        this.flashingTimer = scene.time.addEvent({
            delay: this.gravCooldownTime / (this.numFlashes*2),
            callback: () => {
                if (this.tintTopLeft == prevTint) {
                    this.setTint(this.flashTint);
                } else {
                    this.setTint(prevTint);
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
    }

    execute(scene, runner) {
        // handle transitions
        
        if (Phaser.Input.Keyboard.JustDown(scene.keySPACE)) {
            this.stateMachine.transition("jumping");
            return;
        }

        if (Math.abs(runner.body.velocity.y) > 0.01) {
            scene.time.delayedCall(runner.coyoteTime, () => {
                this.stateMachine.transition("falling");
            }, null, this);
            
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
        
        scene.sound.play("jump", {rate: Phaser.Math.FloatBetween(0.9, 1.2)});
    }

    execute(scene, runner) {
        if (Phaser.Input.Keyboard.JustUp(scene.keySPACE)) {
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

class RedState extends State {
    enter(scene, runner) {
        runner.body.setGravityY(-Math.abs(runner.gravity));
        runner.setTint(runner.redTint);
        runner.initGravCooldown(runner.redTint, scene);
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
        runner.setTint(runner.blueTint);
        if (!runner.justSpawned) {
            runner.initGravCooldown(runner.blueTint, scene);
        } else {
            runner.justSpawned = false;
        }
         
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