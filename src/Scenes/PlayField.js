class PlayField extends Phaser.Scene {
    constructor() {
        super("playField");
    }

    preload() {
        this.load.setPath("./assets");
        this.load.image("Ship_Player");
    }

    create() {
        this.player = new Player(this, 400, 500);
    }

    update() {

    }
}