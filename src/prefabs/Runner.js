class Runner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.setCollideWorldBounds(true);
        
        scene.runnerState = new StateMachine("running", {
            running: new RunningState(),
            jumping: new JumpState(),
            falling: new FallingState()
        }, [scene, this]);

        scene.colorState = new StateMachine("blue", {
            red: new RedState(),
            blue: new BlueState()
        }, [scene, this])
    
        this.jumpStrength = 1000;
        this.jumpRecoil = 3;
        this.gravity = 2000;
    }
}

class RunningState extends State {
    enter(scene, runner) {
        runner.setVelocity(0);
        console.log("run")
    }

    execute(scene, runner) {
        // handle transitions
        
        if (Phaser.Input.Keyboard.JustDown(scene.keySPACE)) {
            this.stateMachine.transition("jumping");
        }
    }
}

class JumpState extends State {
    enter(scene, runner) {
        if (scene.colorState.state == "blue") {
            runner.setVelocity(0, -runner.jumpStrength);
        } else {
            runner.setVelocity(0, runner.jumpStrength);
        }
        
        console.log("jump");
    }

    execute(scene, runner) {
        if (Phaser.Input.Keyboard.JustUp(scene.keySPACE)) {
            runner.setVelocityY(runner.body.velocity.y / runner.jumpRecoil);
            this.stateMachine.transition("falling");
            return;
        }

        if (scene.colorState.state == "blue") {
            // alt way to get into falling, separate if statement so there isnt weird behavior 
            // with the setVelocityY func
            if (runner.body.velocity.y >= 0) {
                this.stateMachine.transition("falling");
                return;
            }

            // low chance this will happen, but small chance
            if (runner.body.onFloor()) {    
                this.stateMachine.transition("running");
            }
        } else {
            // alt way to get into falling, separate if statement so there isnt weird behavior 
            // with the setVelocityY func
            if (runner.body.velocity.y <= 0) {
                this.stateMachine.transition("falling");
                return;
            }

            // low chance this will happen, but small chance
            if (runner.body.onCeiling()) {    
                this.stateMachine.transition("running");
            }
        }

        
    }
}

class FallingState extends State {
    enter(scene, runner) {
        console.log("fall");
    }

    execute(scene, runner) {
        if (scene.colorState.state == "blue") {
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
        runner.setTint(0xFF0000);
    }

    execute(scene, runner) {
        if (Phaser.Input.Keyboard.JustDown(scene.keyE)) {
            this.stateMachine.transition("blue");
        }
    }
}

class BlueState extends State {
    enter(scene, runner) {
        runner.body.setGravityY(Math.abs(runner.gravity));
        runner.setTint(0x0000FF);
    }

    execute(scene, runner) {
        if (Phaser.Input.Keyboard.JustDown(scene.keyE)) {
            this.stateMachine.transition("red");
        }
    }
}