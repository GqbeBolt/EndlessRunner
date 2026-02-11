class Runner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(2000);
        
        scene.runnerState = new StateMachine("running", {
            running: new RunningState(),
            jumping: new JumpState(),
            falling: new FallingState()
        }, [scene, this]);

        // scene.colorState = new StateMachine("red", {
        //     red: new RedState(),
        //     blue: new BlueState()
        // }, [scene, this])
    
        this.jumpStrength = 1000;
        this.jumpRecoil = 5;
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
        runner.setVelocity(0, -runner.jumpStrength);
        console.log("jump");
    }

    execute(scene, runner) {
        if (Phaser.Input.Keyboard.JustUp(scene.keySPACE)) {
            runner.setVelocityY(runner.body.velocity.y / runner.jumpRecoil);
            this.stateMachine.transition("falling");
            return;
        }

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
    }
}

class FallingState extends State {
    enter(scene, runner) {
        console.log("fall");
    }

    execute(scene, runner) {
        if (runner.body.onFloor()) {
            this.stateMachine.transition("running");
        }
    }
}

class RedState extends State {
    enter(scene, runner) {

    }

    execute(scene, runner) {
        // handle transitions
    }
}

class BlueState extends State {
    enter(scene, runner) {

    }

    execute(scene, runner) {
        // handle transitions
    }
}