class BulletManager extends Phaser.GameObjects.Group {
    constructor(scene) {
        super();

        scene.add.existing(this);
        return this;
    }
}