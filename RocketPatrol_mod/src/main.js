/*
Molly Thompson, CMPM-02
"Title Goes Here"
Date
Time Taken: 3 + 4 + 2

+ 5 -- dvorak compatibility -- done!
+ 5 -- randomize "ships" -- done!
+ 5 -- bg music
+10 -- display time -- done! THANK YOU JARED FOR THE HELP!
+20 -- add time for hits -- done! THANK YOU JARED FOR THE HELP!
+60 -- full reskin (new assets; new sfx; new UI; new menu screen)
=105

//push??

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#FFFFFF',
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings
let keyF, keyR, keyF_dv, keyR_dv, keyLEFT, keyRIGHT; //keyF_dv and keyR_dv are support for dvorak keyboard layout, which is what I use