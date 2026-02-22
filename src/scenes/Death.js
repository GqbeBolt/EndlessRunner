class Death extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }

    create(data) {

        this.playScene = data.scene;
        this.score = data.score;
        this.cam = data.camera;
        this.pinkHex = 0xFACADE;


        this.textBG = this.add.image(0, 0, "textBG").setOrigin(0);

        this.add.image(width/2, 60, "gameOver").setOrigin(0.5, 0);

        this.add.bitmapText(width/2, 170, "pixelFont", `FINAL PLATFORMS SURVIVED: ${this.score}`, 15).setOrigin(0.5);  

        this.startText = this.add.bitmapText(width/2, 210, "pixelFont", "PLAY AGAIN", 24).setOrigin(0.5).setInteractive(new Phaser.Geom.Rectangle(-5, 10, 225, 50), Phaser.Geom.Rectangle.Contains)
        .on("pointerdown", () => {
            this.playScene.scene.start("playScene"); 
            this.sound.play("select"); 
            this.scene.stop();
        })
        .on("pointerover", () => {this.startText.setTint(this.pinkHex)})
        .on("pointerout", () => {this.startText.setTint(0xFFFFFF)});

        this.menuText = this.add.bitmapText(width/2, 250, "pixelFont", "MENU", 24).setOrigin(0.5).setInteractive(new Phaser.Geom.Rectangle(-5, 10, 110, 50), Phaser.Geom.Rectangle.Contains)
        .on("pointerdown", () => {
            this.playScene.scene.start("menuScene");
            this.sound.play("select"); 
            this.scene.stop();
        })
        .on("pointerover", () => {this.menuText.setTint(this.pinkHex)})
        .on("pointerout", () => {this.menuText.setTint(0xFFFFFF)});

        this.add.rectangle(width/2 - 5, 165, 400, 5, 0xFFFFFF).setOrigin(0.5);

        this.add.rectangle(width/2 - 5, 210, 400, 5, 0xFFFFFF).setOrigin(0.5);
    }

    update() {

        
    }
}