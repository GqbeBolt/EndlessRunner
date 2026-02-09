class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        
        scene.runnerState = new StateMachine("running", {
            running: new RunningState(),
            jumping: new JumpState()
        }, [scene, this]);
    
    }

    update() {
        
    }

    
}

class RunningState extends State {
    enter(scene, runner) {

    }

    execute(scene, runner) {
        // handle transitions
    }
}

class JumpState extends State {
    enter(scene, runner) {

    }

    execute(scene, runner) {
        // handle transitions
    }
}