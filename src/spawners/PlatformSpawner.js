class PlatformSpawner {
    constructor(scene, platGroup) {
        this.scene = scene;
        this.platGroup = platGroup;

        // predef platforms as arrays of arrays containing platform info
        // start x, start y, width, height, color
        this.starting = [
            [0, 300, 1000, 150, "blue"],
            [0, -75, 1000, 150, "red"]
        ];

        let basic = [
            [650, 300, 300, 150, "blue"],
            [650, -75, 300, 150, "red"]
        ];

        // let startingAlt = [
        //     [0, 300, 400, 150, "blue"],
        //     [0, -75, 400, 150, "red"],
        //     [400, 200, 50, 50]
        // ];

        // adding all predefs to an array
        this.preDefs = [basic];

    }

    spawnNew(moveSpeed) {
        // randomly pick a predef
        let currPredef = Phaser.Math.RND.pick(this.preDefs);

        let rightMost = undefined;
        currPredef.forEach( (info) => {
            // create the platforms from data and add colliders to scene
            let currPlat = new Platform(this.scene, ...info);
            this.platGroup.add(currPlat.container);

            // track rightmost point for reset
            if (rightMost == undefined) rightMost = currPlat;

            if(currPlat.x + currPlat.width > rightMost.x + rightMost.width) {
                rightMost = currPlat;
            }
            currPlat.container.body.setVelocity(-moveSpeed, 0);
        })
        this.scene.spawnPlat = rightMost;
    }
    
    spawnStarting(moveSpeed) {
        let currPlat = undefined;
        this.starting.forEach( (info) => {
            currPlat = new Platform(this.scene, ...info);
            this.platGroup.add(currPlat.container);
            currPlat.container.body.setVelocity(-moveSpeed, 0);
        })
        this.scene.spawnPlat = currPlat;
    }
}