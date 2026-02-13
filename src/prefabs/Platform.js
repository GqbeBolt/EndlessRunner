class Platform extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, width, height, color="blue") {
        super(scene, x, y, "platform", 0);

        this.minLength = 20;
        if (width < this.minLength) width = this.minLength;
        if (height < this.minLength) height = this.minLength;

        this.container = scene.add.container(x, y);
        this.container.width = width;
        this.container.height = height;
        
        let firstCorner = scene.add.sprite(0, 0, "platCorner").setOrigin(0);
        let firstSide = scene.add.tileSprite(0, 10, 10, height-20, "platSide").setOrigin(0);
        
        let secondCorner = scene.add.sprite(width, 0, "platCorner").setOrigin(0);
        secondCorner.angle = 90;
        let secondSide = scene.add.tileSprite(width-10, 0, 10, width-20, "platSide").setOrigin(0);
        secondSide.angle = 90;

        let thirdCorner = scene.add.sprite(width, height, "platCorner").setOrigin(0);
        thirdCorner.angle = 180;
        let thirdSide = scene.add.tileSprite(width, height-10, 10, height-20, "platSide").setOrigin(0);
        thirdSide.angle = 180;
        
        let fourthCorner = scene.add.sprite(0, height, "platCorner").setOrigin(0);
        fourthCorner.angle = 270;
        let fourthSide = scene.add.tileSprite(10, height, 10, width-20, "platSide").setOrigin(0);
        fourthSide.angle = 270;

        this.container.add([firstCorner, firstSide, secondCorner, secondSide, thirdCorner, thirdSide, fourthCorner, fourthSide]);

        switch (color) {
            case "blue":
                this.container.each((image) => {
                    image.setTint(scene.blueHex);
                })
                break;
            case "red":
                this.container.each((image) => {
                    image.setTint(scene.redHex);
                })
                break;
            default:
                this.container.each((image) => {
                    image.setTint(0x000000);
                })
                break;
        } 

        scene.physics.add.existing(this.container);
        this.container.body.offset.x = width/2;
        this.container.body.offset.y = height/2;

        this.container.body.setImmovable(true);

        this.color = color;
        this.moveSpeed = scene.moveSpeed;
    }
}
