class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {

        // menu music
        this.menuMusic = this.sound.add("menu");
        this.menuMusic.play({volume: 0, loop: true});

        this.musicFadeSpeed = 5000;     // in ms
        this.musicEaseIn = 100;
        this.maxVolume = 0.8;
        
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

        // display menu text
        this.add.text(game.config.width/2, game.config.height/2, "Press SPACE", menuConfig).setOrigin(0.5);

        // define keys
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.scene.start("playScene"); 
            this.menuMusic.stop();
            this.sound.play("select"); 
        }

        
    }

    square(num) {
        return num*num;
    }
}