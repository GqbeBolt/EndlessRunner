class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init () {
        // player
        this.runnerX = 150;
        this.boundsLeeway = 50;

        // speed
        this.particleSpeedMax = -430; 
        this.moveSpeed = 250;
        this.speedFactor = 1;
        this.speedUpFrequency = 5;
        this.maxSpeedFactor = 2;
        this.speedInterval = 0.2;

        // platforms
        this.spawnPlat = undefined;
        this.totalPlatformPredefs = 0;
        
        // music
        this.musicFadeSpeed = 5000;     // in ms
        this.musicEaseIn = 100;
        this.maxVolume = 0.8;

        // global colors
        this.redHex = 0xFF153F;
        this.blueHex = 0X00FFF7;
        this.pinkHex = 0xFACADE;
        this.cameras.main.setBackgroundColor(0x2E242A);

        // global keybinds
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {
        this.gameMusic = this.sound.add("inGame");
        this.gameMusic.play({volume: 0, loop: true});

        this.volTimer = this.time.addEvent({
            delay: this.musicFadeSpeed / this.musicEaseIn,
            repeat: this.musicEaseIn,
            callback: () => { 
                    let point = (this.musicEaseIn - this.volTimer.getRepeatCount()) / this.musicEaseIn;
                    this.gameMusic.volume = this.square(point) * this.maxVolume; 

                    if(this.volTimer.getRepeatCount() == 0) {
                        this.volTimer.destroy() 
                    }
                },
                callbackScope: this

        })

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
                particle.velocityX = a * this.particleSpeedMax * this.speedFactor;
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
                particle.velocityX = a * this.particleSpeedMax * this.speedFactor;
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
            this.totalPlatformPredefs++;

            //checking to speed up
            if (this.speedFactor < this.maxSpeedFactor && this.totalPlatformPredefs % this.speedUpFrequency == 0) {
                this.speedFactor += this.speedInterval;
                // update current platforms
                this.platforms.children.each( (plat) => {
                    console.log((-this.moveSpeed * this.speedFactor));
                    plat.body.setVelocity(-this.moveSpeed * this.speedFactor, 0);
                })
            }

            this.platSpawner.spawnNew(this.moveSpeed * this.speedFactor);
        }

        // checking for death
        // if blocked right or out of bounds
        if (this.runner.body.blocked.right || this.runner.y > height + this.boundsLeeway || this.runner.y + this.runner.height < 0 - this.boundsLeeway) {
            this.gameMusic.stop();
            this.sound.play("death");
            this.scene.pause();
            this.scene.launch("deathScene", {scene: this});
        }

        this.bg.tilePositionX += 0.5 + this.speedFactor/4;           

    }

    shakeCamera(duration, intensity) {
        this.cameras.main.shake(duration, intensity);
    }

    conRightMost(container) {
        return container.x + container.width;
    }

    square(num) {
        return num*num;
    }
    
}