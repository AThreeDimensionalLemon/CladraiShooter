class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.isActive = true;
        
        scene.add.existing(this);
        return this;
    }
}