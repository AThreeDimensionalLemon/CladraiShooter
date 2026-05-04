const speed = 500;

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
            this.y -= speed / delta;
            if (this.y < -this.height / 2) this.isActive = false;
        }
    }
}

class EnemyBullet extends Bullet {
    constructor(scene, x, y, rotation) {
        super(scene, x, y, "Laser_Enemy");
        this.setRotation(rotation);
        return this;
    }

    update(delta) {
        if (this.isActive) {
            let hypotenuse = speed / delta;
            let inAngle = this.rotation;
            this.x -= hypotenuse * Math.sin(this.rotation);
            this.y += hypotenuse * Math.cos(this.rotation);
            if (this.y - this.height > game.config.height) this.isActive = false;
        }
    }
}