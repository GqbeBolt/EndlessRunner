/*
Name: Gabriel Rybolt
Game Name: Duality
Time Spent: 17 hours
Citations:  Queue code from GeeksForGeeks
            Link: https://www.geeksforgeeks.org/javascript/implementation-queue-javascript/
Creative Tilt: 
    Technically Interesting: I made it so that platforms can be any size and scale correctly
    while staying pixel perfect. I did this by creating the corners, sides, and middle separately 
    then adding them to a container (Platform.js, Lines 12-67)

    Visual Style: I made the particle stars in the background have a built in paralax effect
    by making their speed based off their transparecny, so that the more transparent ones go 
    slower, which gives the illusion the further stars are moving slower. (Play.js, Lines 64-105)
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
    scene: [ Load, Menu, Play, Death ],
};

let game = new Phaser.Game(config);
let {width, height} = game.config;


