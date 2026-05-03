class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, texture, pathConfig) {
        super(scene, path, path.getStartPoint().x, path.getStartPoint().y, texture);
        this.pathConfig = pathConfig;
        this.firingCooldown = 500 + Math.random() * 2500;
        this.bullets = [];
        scene.add.existing(this);
        return this;
    }

    startMotion() {
        this.startFollow(this.pathConfig);
    }

    updateFiring(delta) {
        this.firingCooldown += -delta;
        if (this.firingCooldown <= 0) {
            let hasInactive = false;
            for (let i = 0; i < this.bullets.length; i++) {
                if (!this.bullets[i].isActive) {
                    let bullet = this.bullets[i];
                    bullet.x = this.x;
                    bullet.y = this.y - this.height / 2;
                    bullet.isActive = true;
                    bullet.visible = true;
                    
                    hasInactive = true;
                    break;
                }
            }
            if (!hasInactive) this.bullets.push(new EnemyBullet(this.scene, this.x, this.y + this.height / 2, this.rotation));
            this.firingCooldown = 500 + Math.random() * 2500;
        }
    }

    updateRotation() {
        let player = this.scene.player;
        let inAngle = Math.atan((player.y - this.y) / (player.x - this.x));
        this.setRotation(inAngle + (Math.PI / 2) * ((inAngle >= 0) ? -1 : 1));
    }

    update(time, delta) {
        this.updateFiring(delta);
        this.updateRotation();

        for (let bullet of this.bullets) {
            bullet.update(delta);
        }
    }
}

class Artillerist extends Enemy {
    constructor(scene, path) {
        super(scene, path, "Ship_Artillerist");
        return this;
    }
}

class Gunner extends Enemy {
    constructor(scene, path, moveConfig) {
        super(scene, path, "Ship_Gunner", moveConfig);
        return this;
    }
}

class Medic extends Enemy {
    constructor(scene, path) {
        super(scene, path, "Ship_Medic");
        return this;
    }
}

class Runner extends Enemy {
    constructor(scene, x, y) {
        this.path = scene.add.path(x, y);
        super(scene, this.path, 0, 0, "Ship_Runner");
        return this;
    }
}

class Wall extends Enemy {
    constructor(scene, path) {
        super(scene, path, "Ship_Wall");
        return this;
    }
}