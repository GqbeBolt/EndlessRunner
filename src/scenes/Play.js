class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        
        // game stats
        this.runnerX = 150;
        this.moveSpeed = 50;

        // global colors
        this.redHex = 0xFF153F;
        this.blueHex = 0X00FFF7;
        this.pinkHex = 0xFACADE;
        this.cameras.main.setBackgroundColor(0x444444);

        // global keybinds
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.runner = new Runner(this, this.runnerX, height / 2, "runner", 0);
        this.plat = new Platform(this, 0, 300, 300, 150, "blue");

        this.platforms = this.add.group();
        this.platforms.add(this.plat.container);

        // set up colliders
        this.physics.add.collider(this.runner, this.platforms);

    }

    update() {
        // updating runner state machines
        this.runnerState.step();
        this.runnerColor.step();

        this.platforms.children.each( (plat) => {
            plat.body.setVelocity(-this.moveSpeed, 0);
        })
    }
    
}