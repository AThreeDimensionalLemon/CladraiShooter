const playerBulletSpeed = 500;

class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.isActive = true;
        scene.add.existing(this);
    }
}

class PlayerBullet extends Bullet {
    constructor(scene, x, y) {
        super(scene, x, y, "Laser_Player");
        return this;
    }

    update(delta) {
        if (this.isActive) {
            this.y -= playerBulletSpeed / delta;
            if (this.y < -this.height / 2) this.isActive = false;
        }
    }
}