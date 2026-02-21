class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create(data) {

        this.pinkHex = 0xFACADE;

        this.menuScene = data.scene;
        this.menuScene.setButtonsInteractive(false);

        this.textBG = this.add.image(0, 0, "textBG").setOrigin(0);

        this.backText = this.add.bitmapText(width/2, 250, "pixelFont", "BACK", 24).setOrigin(0.5).setInteractive(new Phaser.Geom.Rectangle(-5, 10, 100, 50), Phaser.Geom.Rectangle.Contains)
        .on("pointerdown", () => {
            this.menuScene.setButtonsInteractive(true);
            this.scene.stop();
            this.sound.play("select");
        })
        .on("pointerover", () => {this.backText.setTint(this.pinkHex)})
        .on("pointerout", () => {this.backText.setTint(0xFFFFFF)});

        this.add.bitmapText(width/2, 155, "pixelFont", "Music: Kyra van Meijl\n\nGlass SFX: Rosebugg (Freesound), \n\nSpace Backgrounds: Pixel Space\n\n Background Generator by Deep-Fold\n\nCode: GeeksForGeeks", 13, 1).setOrigin(0.5);
    }

    update() {
        
    }
}