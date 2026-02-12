class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        
        //player starting pos
        this.runnerX = 150;

        // global colors
        this.redHex = 0xFF153F;
        this.blueHex = 0X00FFF7;
        this.pinkHex = 0xFACADE;

        // global keybinds
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.runner = new Runner(this, this.runnerX, 500, "runner", 0);
        this.plat = new Platform(this, this.runnerX, height/2, "platform", 0, "red");

        this.platforms = this.add.group();
        this.platforms.add(this.plat);

        // set up colliders
        this.physics.add.collider(this.runner, this.platforms);

    }

    update() {
        this.runnerState.step();
        this.runnerColor.step();
    }
    
}