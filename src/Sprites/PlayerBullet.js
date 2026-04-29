const speed = 500;

class PlayerBullet extends Bullet {
    constructor(scene, x, y) {
        super(scene, x, y, "Laser_Player");
        scene.add.existing(this);
        return this;
    }

    update(delta) {
        this.y -= speed / delta;
    }
}