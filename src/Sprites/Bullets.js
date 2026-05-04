const bulletSpeed = 500;

class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.isActive = true;
        scene.add.existing(this);
    }

    getIsColliding(target) {
        let leftEdge = function(thing) { return thing.x - thing.width / 2; };
        let rightEdge = function(thing) { return thing.x + thing.width / 2; };
        let topEdge = function(thing) { return thing.y - thing.height / 2; };
        let bottomEdge = function(thing) { return thing.y + thing.height / 2; };
        let isOnRight = leftEdge(this) > rightEdge(target);
        let isOnLeft = rightEdge(this) < leftEdge(target);
        let isAbove = bottomEdge(this) < topEdge(target);
        let isBelow = topEdge(this) > bottomEdge(target);
        if (!(isOnRight || isOnLeft || isAbove || isBelow)) {
            target.damage();
            this.isActive = false;
            this.visible = false;
        }
    }
}

class PlayerBullet extends Bullet {
    constructor(scene, x, y) {
        super(scene, x, y, "Laser_Player");
        return this;
    }

    update(delta) {
        if (this.isActive) {
            this.y -= bulletSpeed / delta;
            if (this.y < -this.height / 2) this.isActive = false;
            for (let enemy of this.scene.enemies) {
                this.getIsColliding(enemy);
            }
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
            let hypotenuse = bulletSpeed / delta;
            let inAngle = this.rotation;
            this.x -= hypotenuse * Math.sin(this.rotation);
            this.y += hypotenuse * Math.cos(this.rotation);
            if (this.y - this.height > game.config.height) this.isActive = false;
            this.getIsColliding(this.scene.player)
        }
    }
}