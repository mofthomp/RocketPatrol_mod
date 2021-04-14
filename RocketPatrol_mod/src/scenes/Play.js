class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    //init(), preload(), create(), update()

    preload() {
        //load images/tile sprites
        this.load.image('player', './assets/player.png');
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('background', './assets/background.png');
        //this.load.image('foreground', './assets/foreground.png');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() { //back to front
        //place background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);

        // green UI background rect
        this.add.rectangle(0, borderPadding, game.config.width, borderUISize * 2, 0x000000).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize, game.config.height, 0x000000).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0,0);

        //add player (player 1)
        this.p1player = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'player').setOrigin(0.5, 0);
        
        //add enemy (x3)
        this.ship01 = new Enemy(this, Math.floor((Math.random() * (640-borderPadding*2) + 1)), borderUISize*4,'enemy', 0, 30).setOrigin(0,0); //highest ship has highest pts
        this.ship02 = new Enemy(this, Math.floor((Math.random() * (640-borderPadding*2))), borderUISize*6 + borderPadding*3 ,'enemy', 0, 20).setOrigin(0,0);
        this.ship03 = new Enemy(this, Math.floor((Math.random() * (640-borderPadding*2))), borderUISize*8 + borderPadding*4,'enemy', 0, 10).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyF_dv = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U); 
            //support for dvorak keyboard
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyR_dv = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
            //support for dvorak
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key:'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30 
        });

        //initialize score
        this.p1Score = 0;

        //display score
        this.scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '25px',
            backgroundColor: '#00000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200
        }
        this.scoreLeft = this.add.text(borderPadding + borderUISize, borderUISize, 'Score: '+ this.p1Score, this.scoreConfig);
        this.scoreConfig.fixedWidth = 0;

        //GAME OVER flag
        this.gameOver = false;


        //60-second play clock
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

       //display time
        let timeConfig = {
        fontFamily: 'Comic Sans MS',
        fontSize: '25px',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        align: 'center',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 200
        }
        this.timeLeft = this.add.text(game.config.width - (200 + borderUISize + borderPadding), borderUISize, 'Timer: ' + Math.round(this.clock.getRemainingSeconds()), timeConfig);

        
    }


    update() {
        //check key input for restart
        if(this.gameOver && (Phaser.Input.Keyboard.JustDown(keyR) || Phaser.Input.Keyboard.JustDown(keyR_dv))) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
        
        this.background.tilePositionX -= starSpeed;
        if(!this.gameOver) {
            //update player
            this.p1player.update();
            //update ships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1player, this.ship03)) {
            this.p1player.reset();
            this.shipExplode(this.ship03);
            let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 5000);
        }
        if(this.checkCollision(this.p1player, this.ship02)) {
            this.p1player.reset();
            this.shipExplode(this.ship02);
            let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 5000);
        }
        if(this.checkCollision(this.p1player, this.ship01)) {
            this.p1player.reset();
            this.shipExplode(this.ship01);
            let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 5000);
        }


        this.timeLeft.text = 'Timer: ' + Math.round(this.clock.getRemainingSeconds());
        
      
    }



    checkCollision(player, ship) {
        //simple 'axis aligned bounding boxes' collision
        if( player.x < ship.x + ship.width &&
            player.x + player.width > ship.x &&
            player.y < ship.y + ship.height &&
            player.y + player.height > ship.y) {
                return true;
            } 
        else {
                return false;
            }
    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = 'Score:' + this.p1Score;

        //essplode
        this.sound.play('sfx_explosion');
    }

    createTime(timeLeft, timeAdd){
        //display timer
        
        this.clock = this.time.delayedCall(timeLeft + timeAdd, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }
}