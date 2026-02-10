class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.runner = new Runner(this, 100, 300, "runner", 0);

        this.physics.world.gravity.y = 2000;
    }

    update() {

        
    }
    
}