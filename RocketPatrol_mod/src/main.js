/*
Molly Thompson, CMPM-02
"Title Goes Here"
Date
Time Taken

+ 2 -- dvorak compatibility
+ 5 -- bg music
+ 5 -- new bg sprite
+10 -- new UI
+10 -- display time
+10 -- new title screen
+10 -- new animated spaceship
+10 -- parallax scrolling
+20 -- all new assets
+20 -- add time for hits -- done!
=102



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