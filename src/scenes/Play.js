class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        
        // game stats
        this.runnerX = 150;
        this.moveSpeed = 100;
        this.spawnPlat = undefined;

        // global colors
        this.redHex = 0xFF153F;
        this.blueHex = 0X00FFF7;
        this.pinkHex = 0xFACADE;
        this.cameras.main.setBackgroundColor(0x160f21);

        // global keybinds
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // add main character
        this.runner = new Runner(this, this.runnerX, height / 2, "runner", 0);

        // platform spawning logic
        this.platforms = this.add.group();
        this.platSpawner = new PlatformSpawner(this, this.platforms);
        this.platSpawner.spawnStarting(this.moveSpeed);    // will also set spawnPlat

        // set up colliders
        this.physics.add.collider(this.runner, this.platforms);

    }

    update() {
        // updating runner state machines
        this.runnerState.step();
        this.runnerColor.step();

        // moving platforms
        this.platforms.children.each( (plat) => {
            plat.body.setVelocity(-this.moveSpeed, 0);
        })

        // if (this.spawnPlat.container.x + this.spawnPlat.container.width < width) {
        //     this.platSpawner.spawnNew(this.moveSpeed);
        // }
    }

    shakeCamera(duration, intensity) {
        this.cameras.main.shake(duration, intensity);
    }
    
}