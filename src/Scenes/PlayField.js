class PlayField extends Phaser.Scene {
    constructor() {
        super("playField");

        this.config = {
            spriteMargin: 25
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
        this.bulletManager = new BulletManager(this);
    }

    update(time, delta) {
        this.player.update(delta);
    }
}