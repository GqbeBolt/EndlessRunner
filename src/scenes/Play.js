class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        
        // game stats
        this.runnerX = 150;
        this.moveSpeed = 10;

        // global colors
        this.redHex = 0xFF153F;
        this.blueHex = 0X00FFF7;
        this.pinkHex = 0xFACADE;

        // global keybinds
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.runner = new Runner(this, this.runnerX, 500, "runner", 0);
        this.plat = new Platform(this, 100, 100, 100, 100, "red");

        for (let i=0;i<=600;i+=50) {
            this.add.rectangle(50, i, 5, 5, 0xFFFFFF).setOrigin(0, 0);
        }

        // this.platforms = this.add.group();
        // this.platforms.add(this.plat);

        // set up colliders
        this.physics.add.collider(this.runner, this.platforms);

    }

    update() {
        // updating runner state machines
        this.runnerState.step();
        this.runnerColor.step();
    }
    
}