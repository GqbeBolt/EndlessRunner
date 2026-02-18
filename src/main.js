/*
Name: Gabriel Rybolt
Game Name: Duality
*/
let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 375,
    pixelArt: true,
    zoom: 1.5,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    fps: 60,
    scene: [ Menu, Play, Death ],
};

let game = new Phaser.Game(config);
let {width, height} = game.config;
