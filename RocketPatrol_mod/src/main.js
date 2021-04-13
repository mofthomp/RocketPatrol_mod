/*
Molly Thompson, CMPM-02
"Title Goes Here"
Date
Time Taken

 40 -- theme redesign
+20 -- add time for successful hit
+20 -- add particle emitter
+10 -- animated spaceship
+ 5 -- background music
+ 5 -- increased speed at 30 seconds
+ 2 -- added Dvorak compatibility 
= 102

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings
let keyF, keyR, keyF_dv, keyR_dv, keyLEFT, keyRIGHT; //keyF_dv and keyR_dv are support for dvorak keyboard layout, which is what I use