class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);               // (color, alpha)
            loadingBar.fillRect(0, width/2, width * value, 10);   // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = "./assets/images/";
        //this.load.image("runner", "RunnerTEMP.png");
        //this.load.image("platform", "DefaultPlat.png"); unused now
        this.load.image("platCorner", "PlatCorner.png");
        this.load.image("platSide", "PlatSide.png");
        this.load.image("smallStar", "smallStar.png");
        this.load.image("bigStar", "bigStar.png");
        this.load.image("spaceBG", "spaceBackground.png");
        this.load.image("menuBG", "menuBackground.png");
        this.load.image("title", "title.png");
        this.load.image("border", "border.png");
        this.load.image("textBG", "textBackground.png");
        this.load.image("gameOver", "gameOver.png");

        this.load.spritesheet("runner", "runner.png", {
            frameWidth: 30,
            frameHeight: 36
        })

        this.load.path = "./assets/sounds/";
        this.load.audio("glassBreak", "glassBreak.wav");    // Rosebugg (Freesound)
        this.load.audio("select", "blipSelect.wav");
        this.load.audio("jump", "jump.wav");
        this.load.audio("switch", "switch.wav");
        this.load.audio("death", "death.wav");
        this.load.audio("menu", "menuSoundtrack.mp3");    // Exploding Sun by Kyra van Meijl
        this.load.audio("inGame", "runningSoundtrack.mp3");    // Astral Float by Kyra van Meijl

        this.load.path = "./assets/fonts/";
        this.load.bitmapFont("pixelFont", "PixeledFont.png", "PixeledFont.xml"); // OmegaPC777 
    }

    create() {

        this.anims.create({
            key: "blue-run",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("runner", {start: 0, end: 7})
        })

        this.anims.create({
            key: "blue-jump",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("runner", {start: 8, end: 8})
        })

        this.anims.create({
            key: "blue-fall",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("runner", {start: 9, end: 9})
        })

        this.anims.create({
            key: "red-run",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("runner", {start: 10, end: 18})
        })

        this.anims.create({
            key: "red-jump",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("runner", {start: 18, end: 18})
        })

        this.anims.create({
            key: "red-fall",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("runner", {start: 19, end: 19})
        })

        this.scene.start("menuScene")
    }
}