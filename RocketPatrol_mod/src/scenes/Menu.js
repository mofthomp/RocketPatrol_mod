//const { Phaser } = require("../../library/phaser");

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('ambience', './assets/bg_ambience.wav');
        this.load.image('menu_bg', './assets/menu_bg.png');
    }

    create() {

        //place background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'menu_bg').setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu txt
       
        this.add.text(game.config.width/2, game.config.height/3, '"SUNNY DAY :)"', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Use arrows to move and F to fire' , menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}