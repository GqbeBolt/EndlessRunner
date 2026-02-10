class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("runner", "./assets/RunnerTEMP.png");
    }

    create() {

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
            this.scene.start('playScene'); 
        }
        
    }
}