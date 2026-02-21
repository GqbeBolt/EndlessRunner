class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        //colors
        this.redHex = 0xFF153F;
        this.blueHex = 0x00FFF7;
        this.pinkHex = 0xFACADE;

        // menu music
        this.menuMusic = this.sound.add("menu");
        this.menuMusic.play({volume: 0, loop: true});

        this.musicFadeSpeed = 5000;     // in ms
        this.musicEaseIn = 100;
        this.maxVolume = 0.3;
        
        this.volTimer = this.time.addEvent({
            delay: this.musicFadeSpeed / this.musicEaseIn,
            repeat: this.musicEaseIn,
            callback: () => { 
                    let point = (this.musicEaseIn - this.volTimer.getRepeatCount()) / this.musicEaseIn;
                    this.menuMusic.volume = this.square(point) * this.maxVolume; 

                    if(this.volTimer.getRepeatCount() == 0) {
                        this.volTimer.destroy() 
                    }
                },
                callbackScope: this

        })

        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        this.cameras.main.setBackgroundColor(0x2E242A);
        
        this.bg = this.add.tileSprite(0, 0, 600, 375, "menuBG").setOrigin(0);
        this.bg.alpha = 0.2;

        this.particleSpeedMax = -250;

        let startLine = new Phaser.Geom.Line(width, 0, width, height)  
        const deathBox = new Phaser.Geom.Rectangle(-1, 0, 1, height);
        this.starEmitter = this.add.particles(0, 0, "smallStar", {
            alpha: 1,
            speedX: 0,
            frequency: 350,
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
            frequency: 400,
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

        this.b = this.add.image(0, 0, "border").setOrigin(0);
        this.b.setTint(this.redHex, this.pinkHex, this.pinkHex, this.blueHex);
        
        this.add.image(width/2, 0, "title").setOrigin(0.5, 0);

        // display menu text
        //this.add.bitmapText(width/2, height/2 + 70, "pixelFont", "[SPACE] to jump\n\n[E] to switch gravity", 14, 1).setOrigin(0.5);
        this.startText = this.add.bitmapText(width/2, 175, "pixelFont", "START", 24).setOrigin(0.5).setInteractive(new Phaser.Geom.Rectangle(-5, 10, 135, 50), Phaser.Geom.Rectangle.Contains)
        .on("pointerdown", () => {
            this.scene.start("playScene"); 
            this.menuMusic.stop();
            this.sound.play("select");
        })
        .on("pointerover", () => {this.startText.setTint(this.pinkHex)})
        .on("pointerout", () => {this.startText.setTint(0xFFFFFF)});

        this.instructionText = this.add.bitmapText(width/2, 225, "pixelFont", "INSTRUCTIONS", 24).setOrigin(0.5).setInteractive(new Phaser.Geom.Rectangle(-5, 10, 275, 50), Phaser.Geom.Rectangle.Contains)
        .on("pointerdown", () => {
            this.scene.start("playScene"); 
            this.menuMusic.stop();
            this.sound.play("select");
        })
        .on("pointerover", () => {this.instructionText.setTint(this.pinkHex)})
        .on("pointerout", () => {this.instructionText.setTint(0xFFFFFF)});

        this.creditsText = this.add.bitmapText(width/2, 275, "pixelFont", "CREDITS", 24).setOrigin(0.5).setInteractive(new Phaser.Geom.Rectangle(-5, 10, 165, 50), Phaser.Geom.Rectangle.Contains)
        .on("pointerdown", () => {
            this.scene.start("playScene"); 
            this.menuMusic.stop();
            this.sound.play("select");
        })
        .on("pointerover", () => {this.creditsText.setTint(this.pinkHex)})
        .on("pointerout", () => {this.creditsText.setTint(0xFFFFFF)});
        
        // start line
        this.add.rectangle(width/2 - 3, 227, 300, 5, 0x000000).setOrigin(0.5);
        this.add.rectangle(width/2 - 5, 225, 300, 5, 0xFFFFFF).setOrigin(0.5);

        // instruction line
        this.add.rectangle(width/2 - 3, 277, 300, 5, 0x000000).setOrigin(0.5);
        this.add.rectangle(width/2 - 5, 275, 300, 5, 0xFFFFFF).setOrigin(0.5);

        //this.add.bitmapText(width/2, 325, "pixelFont", "Music by Kyra van Meijl, Glass sfx by Rosebugg (Freesound), \n\nSpace Backgrounds from Deep-Fold, Code from GeeksForGeeks", 8, 1).setOrigin(0.5);

        // define keys
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.scene.start("playScene"); 
            this.menuMusic.stop();
            this.sound.play("select"); 
        }

        this.bg.tilePositionX += 0.25;
    }

    square(num) {
        return num*num;
    }
}