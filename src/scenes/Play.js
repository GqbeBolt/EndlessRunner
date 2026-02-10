class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.runner = new Runner(this, 100, 300, "runner", 0);

        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.on("worldbounds", (body, up, down, left, right) => {
            console.log("ahhhh");
            if (down) {
                console.log("ket");
            }
        })
    }

    update() {
        this.runnerState.step();
        //this.colorState.step();
    }
    
}