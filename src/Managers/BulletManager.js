class BulletManager extends Phaser.GameObjects.Group {
    constructor() {
        super(scene);

        scene.add.existing(this);
        return this;
    }
}