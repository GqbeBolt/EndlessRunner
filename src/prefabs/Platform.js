class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, color="blue", moveSpeed) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setImmovable(true);

        this.color = color;
        this.moveSpeed = moveSpeed;

        switch (color) {
            case "blue":
                this.setTint(scene.blueHex);
                break;
            case "red":
                this.setTint(scene.redHex);
                break;
            default:
                this.setTint(0xFFFFFF);
        }
    }
}
