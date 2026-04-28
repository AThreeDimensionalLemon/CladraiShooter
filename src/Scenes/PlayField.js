class PlayField extends Phaser.Scene {
    constructor() {
        super("playField");

        this.config = {
            spriteMargin: 25
        }
    }

    preload() {
        this.load.setPath("./assets");
        this.load.image("Ship_Player");
    }

    create() {
        this.player = new Player(this, 400, 500);
    }

    update(time, delta) {
        this.player.update(delta)
    }
}