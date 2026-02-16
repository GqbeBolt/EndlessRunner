class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.path = "./assets/"
        this.load.image("runner", "RunnerTEMP.png");
        //this.load.image("platform", "DefaultPlat.png"); unused now
        this.load.image("platCorner", "PlatCorner.png");
        this.load.image("platSide", "PlatSide.png");
        this.load.image("smallStar", "smallStar.png");
        this.load.image("bigStar", "bigStar.png");
        this.load.image("spaceBG", "SpaceBackground.png");
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