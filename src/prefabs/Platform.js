class Platform{
    constructor(scene, x, y, width, height, color="blue") {
        //super(scene, x, y, "platform", 0);

        
        let currCorner = scene.add.sprite(x, y, "platCorner").setOrigin(0);
        let currSide = scene.add.tileSprite(x, y+10, 10, height-20, "platSide").setOrigin(0);
        
        

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
