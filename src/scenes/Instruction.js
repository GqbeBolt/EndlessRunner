class Instruction extends Phaser.Scene {
    constructor() {
        super("instructionScene");
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
    }

    update() {
        
    }
}