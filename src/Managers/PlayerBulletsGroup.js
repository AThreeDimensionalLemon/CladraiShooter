const bulletSpeed = 300;

class PlayerBulletsGroup extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene, { classType: PlayerBullet });
        scene.add.existing(this);
        return this;
    }

    update(delta) {
        this.incY(-bulletSpeed / delta)
    }
}