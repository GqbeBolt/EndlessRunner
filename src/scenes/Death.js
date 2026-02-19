class Death extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }

    create(data) {

        this.playScene = data.scene;
        console.log(this.playScene);

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
        this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", menuConfig).setOrigin(0.5);

        // define keys
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.playScene.scene.start("playScene"); 
            this.sound.play("select"); 
            this.scene.stop();
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
            this.playScene.scene.start("menuScene");
            this.sound.play("select"); 
            this.scene.stop();
        }
        
    }
}