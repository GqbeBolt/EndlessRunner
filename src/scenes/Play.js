class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        
        // game stats
        this.runnerX = 150;
        this.moveSpeed = 200;
        this.spawnPlat = undefined;
        this.particleSpeedMax = -430; 

        // global colors
        this.redHex = 0xFF153F;
        this.blueHex = 0X00FFF7;
        this.pinkHex = 0xFACADE;
        this.cameras.main.setBackgroundColor(0x2E242A);

        // global keybinds
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // space bg
        this.bg = this.add.tileSprite(0, 0, width, height, "spaceBG").setOrigin(0);
        this.bg.alpha = 0.08;

        // star particles
        let startLine = new Phaser.Geom.Line(width, 0, width, height)  
        const deathBox = new Phaser.Geom.Rectangle(-1, 0, 1, height);
        this.starEmitter = this.add.particles(0, 0, "smallStar", {
            alpha: 1,
            speedX: 0,
            frequency: 80,
            lifespan: 100000,
            deathZone: deathBox,
            tint: [ 0xffffff, this.pinkHex ],
            emitZone: { 
                type: 'random', 
                source: startLine
            },
            blendMode: 'ADD',
            emitCallback: (particle) => {
                let a = Phaser.Math.FloatBetween(0.2, 0.7);

                particle.alpha = a;
                particle.velocityX = a * this.particleSpeedMax;
            }
        })

        this.bigStarEmitter = this.add.particles(0, 0, "bigStar", {
            alpha: 1,
            speedX: 0,
            frequency: 120,
            lifespan: 100000,
            deathZone: deathBox,
            tint: [ 0xffffff, this.pinkHex ],
            emitZone: { 
                type: 'random', 
                source: startLine
            },
            blendMode: 'ADD',
            emitCallback: (particle) => {
                let a = Phaser.Math.FloatBetween(0.05, 1);

                particle.alpha = a;
                particle.velocityX = a * this.particleSpeedMax;
            }
        })

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

        //  checking to destroy
        this.platforms.children.each( (plat) => {
            if (this.conRightMost(plat) < 0) plat.destroy();
        })

        // checking to spawn new platforms
        if (this.spawnPlat.container.x + this.spawnPlat.container.width < width) {
            this.platSpawner.spawnNew(this.moveSpeed);
        }

        this.bg.tilePositionX += 0.5;

    }

    shakeCamera(duration, intensity) {
        this.cameras.main.shake(duration, intensity);
    }

    conRightMost(container) {
        return container.x + container.width;
    }
    
}