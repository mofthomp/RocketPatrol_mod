class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store pointValue in this spaceship
        this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
        this.direction = direction;
    }

    update() {
        //move spaceship left if 1
        if(this.direction == 1){
        this.x -= this.moveSpeed;
        }
        else{
            this.x += this.moveSpeed;
        }

        //wrap around from L to R edge
        if(this.x <= 0 - this.width || this.x >= game.config.width + this.width) {
            this.reset();
        }
    }
    
    //position reset
    reset() {
        if(this.direction){
            this.x = game.config.width;
        }
        else {
            this.x = 0 - this.width;
        }
    }
}