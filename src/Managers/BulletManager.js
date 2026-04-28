class BulletManager extends Phaser.GameObjects.Group {
    constructor() {
        super({
            name: "Bullets", 
            maxSize: 50
        });

        scene.add.existing(this);
        return this;
    }
}