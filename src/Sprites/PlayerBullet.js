const speed = 500;

class PlayerBullet extends Bullet {
    constructor(scene, x, y) {
        super(scene, x, y, "Laser_Player");

        scene.add.existing(this);
        return this;
    }

    update(delta) {
        if (this.isActive) {
            this.y -= speed / delta;
            if (this.y < -this.height / 2) this.isActive = false;
        }
    }
}