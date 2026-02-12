class Runner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, color="blue", moveSpeed) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.color = color;
        this.moveSpeed = moveSpeed;
    }
}
