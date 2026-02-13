class Platform{
    constructor(scene, x, y, width, height, color="blue") {
        //super(scene, x, y, "platform", 0);

        
        let firstCorner = scene.add.sprite(x, y, "platCorner").setOrigin(0);
        let firstSide = scene.add.tileSprite(x, y+10, 10, height-20, "platSide").setOrigin(0);
        
        let secondCorner = scene.add.sprite(x+width-10, y, "platCorner");
        secondCorner.angle = 90;
        secondCorner.setOrigin(0);
        let secondSide = scene.add.tileSprite(x, y+10, 10, height-20, "platSide");
        secondCorner.angle = 90;
        secondSide.setOrigin(0);

        
        

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.body.setImmovable(true);

        this.color = color;
        this.moveSpeed = scene.moveSpeed;

        // switch (color) {
        //     case "blue":
        //         this.setTint(scene.blueHex);
        //         break;
        //     case "red":
        //         this.setTint(scene.redHex);
        //         break;
        //     default:
        //         this.setTint(0xFFFFFF);
        // }
    }
}
