class PlatformSpawner {
    constructor(scene, platGroup) {
        this.scene = scene;
        this.platGroup = platGroup;
        this.platExtraDistance = 0;
        this.prevExtraDist = 0;

        // predef platforms as objects of arrays containing platform info
        // start x, start y, width, height, color
        this.starting = {
            platforms: [
                [0, 300, 1000, 150, "blue"],
                [0, -75, 1000, 150, "red"]
            ],
            name: "starting"
        };

        let basic = {
            platforms: [
                [650, 300, 300, 450, "blue"],
                [650, -375, 300, 450, "red"]
            ],
            varWidthMax: 100,
            varWidthMin: -50,
            name: "basic"
        };

        let constrict = {
            platforms: [
                [650, 250, 300, 50, "blue"],
                [650, 65, 300, 50, "red"]
            ],
            varWidthMax: 100,
            varWidthMin: -50,
            name: "constrict"
        };

        let moreConstrict = {
            platforms: [
                [650, 188, 300, 50, "blue"],
                [650, 138, 300, 50, "red"]
            ],
            yVar: 75,
            varWidthMax: 100,
            varWidthMin: -50,
            name: "moreConstrict"
        };

        let onlyTop = {
            platforms: [
                [650, -75, 300, 150, "red"]
            ],
            varWidthMax: 100,
            varWidthMin: -50,
            name: "onlyTop"
        };

        let onlyBot = {
            platforms: [
                [650, 300, 300, 150, "blue"]
            ],
            varWidthMax: 100,
            varWidthMin: -50,
            name: "onlyBot"
        };

        // adding all predefs to an array
        this.preDefs = [basic, constrict, moreConstrict, onlyTop, onlyBot];

    }

    spawnNew(moveSpeed) {
        // randomly pick a predef
        let currPredef = Phaser.Math.RND.pick(this.preDefs);

        let randXVar = Phaser.Math.Between(0, 10);

        let randYVar = 0;
        if (currPredef.yVar != undefined) randYVar = Phaser.Math.Between(-currPredef.yVar, currPredef.yVar);

        let randWVar = Phaser.Math.Between(currPredef.varWidthMin, currPredef.varWidthMax);

        let rightMost = undefined;

        console.log(currPredef.name);

        currPredef.platforms.forEach( (info) => {
            // random x
            info[0] += randXVar + this.platExtraDistance;
            console.log(randXVar + this.platExtraDistance)

            // random y
            info[1] += randYVar;

            // random width
            info[2] += randWVar;

            // create the platforms from data and add colliders to scene
            let currPlat = new Platform(this.scene, ...info);
            this.platGroup.add(currPlat.container);

            // track rightmost point for reset
            if (rightMost == undefined) rightMost = currPlat;
            if(currPlat.x + currPlat.width > rightMost.x + rightMost.width) {
                rightMost = currPlat;
            }

            // move all plats
            currPlat.container.body.setVelocity(-moveSpeed, 0);
        })
        
        this.scene.spawnPlat = rightMost;
    }
    
    spawnStarting(moveSpeed) {
        let currPlat = undefined;
        this.starting.platforms.forEach( (info) => {
            currPlat = new Platform(this.scene, ...info);
            this.platGroup.add(currPlat.container);
            currPlat.container.body.setVelocity(-moveSpeed, 0);
        })
        this.scene.spawnPlat = currPlat;
    }

    addExtraDistance(amt) {
        this.platExtraDistance += amt;
    }
}