class Platform{
    constructor(scene, x, y, width, height, color) {

        // public vars
        this.color = color;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.moveSpeed = scene.moveSpeed;

        // set container to hold all images
        this.container = scene.add.container(x, y);
        this.container.width = width;
        this.container.height = height;

        Platform.ID = Platform.ID == undefined ? 0 : Platform.ID+1;
        
        // init first corner, set the offset for all others
        let firstCorner = scene.add.sprite(0, 0, "platCorner").setOrigin(0);
        this.cornerWidth = firstCorner.width;

        // set min size
        this.minLength = this.cornerWidth * 2;
        if (width < this.minLength) width = this.minLength;
        if (height < this.minLength) height = this.minLength;

        // draw all images 
        let firstSide = scene.add.tileSprite(0, this.cornerWidth, this.cornerWidth, height-(this.cornerWidth*2), "platSide").setOrigin(0);
        
        let secondCorner = scene.add.sprite(width, 0, "platCorner").setOrigin(0);
        secondCorner.angle = 90;
        let secondSide = scene.add.tileSprite(width-this.cornerWidth, 0, this.cornerWidth, width-(this.cornerWidth*2), "platSide").setOrigin(0);
        secondSide.angle = 90;

        let thirdCorner = scene.add.sprite(width, height, "platCorner").setOrigin(0);
        thirdCorner.angle = 180;
        let thirdSide = scene.add.tileSprite(width, height-this.cornerWidth, this.cornerWidth, height-(this.cornerWidth*2), "platSide").setOrigin(0);
        thirdSide.angle = 180;
        
        let fourthCorner = scene.add.sprite(0, height, "platCorner").setOrigin(0);
        fourthCorner.angle = 270;
        let fourthSide = scene.add.tileSprite(this.cornerWidth, height, this.cornerWidth, width-(this.cornerWidth*2), "platSide").setOrigin(0);
        fourthSide.angle = 270;

        // draw middle
        let g = scene.make.graphics({x: 0, y: 0, add: false});
        g.fillStyle(0x000000);
        g.fillRect(0, 0, width-(this.cornerWidth*2), height-(this.cornerWidth*2));
        g.generateTexture('middle' + Platform.ID, width, height);
        let middle = scene.add.image(this.cornerWidth, this.cornerWidth, 'middle' + Platform.ID).setOrigin(0);
        g.destroy(true);

        // add all to the container
        this.container.add([firstCorner, firstSide, secondCorner, secondSide, thirdCorner, thirdSide, fourthCorner, fourthSide, middle]);

        // set the color
        this.setColor(scene, this.color);

        // add collider to world
        scene.physics.add.existing(this.container);
        this.container.body.offset.x = width/2;
        this.container.body.offset.y = height/2;

        // collider stats
        this.container.body.setImmovable(true);
        this.container.body.setFriction(0, 0);
    }
 
    setColor(scene, color) {
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
            case "pink":
                this.container.each((image) => {
                    image.setTint(scene.pinkHex);
                })
                break;
            default:
                this.container.each((image) => {
                    image.setTint(0xFFFFFF);
                })
                break;
        } 
    }

    rightMostPos() {
        return this.container.x + this.width;
    }
}
