class PlayField extends Phaser.Scene {
    constructor() {
        super("playField");

        this.config = {
            spriteMargin: 25,
            rowsAmount: 5
        }
    }

    preload() {
        this.load.setPath("./assets");
        this.load.image("Damage_1");
        this.load.image("Damage_2");
        this.load.image("Health_Hull");
        this.load.image("Health_Shield");
        this.load.image("Laser_Enemy");
        this.load.image("Laser_Player");
        this.load.image("Shield_1");
        this.load.image("Shield_2");
        this.load.image("Shield_3");
        this.load.image("Ship_Artillerist");
        this.load.image("Ship_Gunner");
        this.load.image("Ship_Medic");
        this.load.image("Ship_Player");
        this.load.image("Ship_Runner");
        this.load.image("Ship_Wall");
    }

    create() {
        this.player = new Player(this);

        this.rows = [];
        let enemyHeight = 84;
        let spriteMargin = this.config.spriteMargin;
        for (let row = 0; row < this.config.rowsAmount; row++) {
            let newPath = this.add.path( //start point
                spriteMargin + this.player.width / 2, //distance from side
                spriteMargin + enemyHeight / 2 + //distance from top
                (enemyHeight / 2 + spriteMargin * 4) * row //row offsets
            );
            newPath.lineTo( //end point
                game.config.width - spriteMargin - this.player.width / 2, 
                newPath.getStartPoint().y
            );
            this.rows.push(newPath);
        }

        // this.testEnemy = new Artillerist(this, this.rows[0]);
        // this.testEnemy = new Artillerist(this, this.rows[1]);
        // this.testEnemy = new Artillerist(this, this.rows[2]);
        // this.testEnemy = new Artillerist(this, this.rows[3]);
        // this.testEnemy = new Artillerist(this, this.rows[4]);
    }

    update(time, delta) {
        this.player.update(delta);
    }
}