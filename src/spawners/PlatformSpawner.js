class PlatformSpawner {
    constructor(scene, platGroup) {
        this.scene = scene;
        this.platGroup = platGroup;
        this.platExtraDistance = 0;
        this.prevExtraDist = 0;

        // predef platforms as objects of arrays containing platform info
        // start x, start y, width, height, color
        // name = name of predef
        // varWidthMax: maximum extra width to be randomly added
        // varWidthMax: minimum extra width to be randomly added
        // varYMax = maximum extra piexels to be randomly added to y
        // varYMin = minimum extra piexels to be randomly added to y
        // rightMost = index of platforms that is the rightmost platform
        this.starting = {
            platforms: [
                [0, 300, 1000, 150, "blue"],
                [0, -75, 1000, 150, "red"]
            ],
            name: "starting",
            rightMost: 0
        };

        let basic = {
            platforms: [
                [650, 300, 300, 450, "blue"],
                [650, -375, 300, 450, "red"]
            ],
            varYMax: 10,
            varYMin: -10,
            varWidthMax: 100,
            varWidthMin: -50,
            name: "basic",
            rightMost: 0
        };

        let constrict = {
            platforms: [
                [650, 250, 300, 50, "blue"],
                [650, 65, 300, 50, "red"]
            ],
            varYMax: 20,
            varYMin: -20,
            varWidthMax: 100,
            varWidthMin: -50,
            name: "constrict",
            rightMost: 0
        };

        let moreConstrict = {
            platforms: [
                [650, 188, 300, 50, "blue"],
                [650, 138, 300, 50, "red"]
            ],
            varYMax: 50,
            varYMin: -50,
            varWidthMax: 100,
            varWidthMin: -50,
            name: "moreConstrict",
            rightMost: 0
        };

        let onlyTop = {
            platforms: [
                [650, -75, 300, 150, "red"]
            ],
            varYMax: 50,
            varYMin: -10,
            varWidthMax: 100,
            varWidthMin: -50,
            name: "onlyTop",
            rightMost: 0
        };

        let onlyBot = {
            platforms: [
                [650, 300, 300, 150, "blue"]
            ],
            varYMax: 10,
            varYMin: -50,
            varWidthMax: 100,
            varWidthMin: -50,
            name: "onlyBot",
            rightMost: 0
        };

        let stairs = {
            platforms: [
                [650, 300, 200, 50, "blue"],
                [950, 260, 200, 50, "blue"],
                //[1250, 220, 200, 50, "blue"],
            ],
            varYMax: 10,
            varYMin: -50,
            varWidthMax: 50,
            varWidthMin: -70,
            name: "onlyBot",
            rightMost: 1
        }

        let stairsFlipped = {
            platforms: [
                [650, 25, 200, 50, "red"],
                [950, 65, 200, 50, "red"],
                //[1250, 105, 200, 50, "red"],
            ],
            varYMax: 50,
            varYMin: -10,
            varWidthMax: 50,
            varWidthMin: -70,
            name: "onlyBot",
            rightMost: 1
        }

        let triple = {
            platforms: [
                [650, -375, 200, 400, "red"],
                [650, 162, 200, 50, "pink"],
                [650, 350, 200, 450, "blue"]
            ],
            varYMax: 0,
            varYMin: 0,
            varWidthMax: 50,
            varWidthMin: -25,
            name: "onlyBot",
            rightMost: 2
        }

        // adding all predefs to an array
        this.preDefs = [basic, constrict, moreConstrict, onlyTop, onlyBot, stairs, stairsFlipped, triple];

    }

    spawnNew(moveSpeed) {
        // randomly pick a predef
        let currPredef = Phaser.Math.RND.pick(this.preDefs);

        let randXVar = Phaser.Math.Between(0, 10);

        let randYVar = Phaser.Math.Between(currPredef.varYMin, currPredef.varYMax);

        let randWVar = Phaser.Math.Between(currPredef.varWidthMin, currPredef.varWidthMax);

        let rightMost = null;

        //console.log(currPredef.name);

        for (let i=0;i<currPredef.platforms.length;i++) {
            let info = [...currPredef.platforms[i]];

            // random x
            info[0] += randXVar + this.platExtraDistance;

            // random y
            info[1] += randYVar;

            // random width
            info[2] += randWVar;

            // create the platforms from data and add colliders to scene
            let currPlat = new Platform(this.scene, ...info);
            this.platGroup.add(currPlat.container);

            // track rightmost point for reset
            if (rightMost == undefined) rightMost = currPlat;
            if(currPredef.rightMost == i) {
                rightMost = currPlat;
            }   

            // give velocity
            currPlat.container.body.setVelocity(-moveSpeed, 0);
        }
        
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