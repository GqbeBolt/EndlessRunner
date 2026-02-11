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
        }
    }
}

class JumpState extends State {
    enter(scene, runner) {
        runner.setVelocity(0, -1000);
        console.log("jump");
    }

    execute(scene, runner) {
        
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