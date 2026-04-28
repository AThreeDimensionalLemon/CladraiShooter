class BulletManager extends Phaser.GameObjects.Group {
    constructor() {
        super({
            name: "Bullets", 
            maxSize: 50
        });
        return this;
    }
}