class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, texture, pathConfig, score) {
        super(scene, path, path.getStartPoint().x, path.getStartPoint().y, texture);
        this.pathConfig = pathConfig;

        this.firingCooldown = 500 + Math.random() * 2500;
        this.bullets = [];
        this.bulletSound = scene.sound.add("Laser_Enemy");

        this.destroyRequested = false;
        this.deathSound = scene.sound.add("Death_Enemy");
        this.value = score;

        scene.add.existing(this);
        return this;
    }

    startMotion() {
        this.startFollow(this.pathConfig);
    }

    damage() {
        this.destroyRequested = true;
        for (let bullet of this.bullets) {
            bullet.destroy();
        }
        this.deathSound.play();
    }

    fireBullet() {
        let hasInactive = false;
        for (let i = 0; i < this.bullets.length; i++) {
            if (!this.bullets[i].isActive) {
                let bullet = this.bullets[i];
                bullet.x = this.x;
                bullet.y = this.y + this.height / 2;
                bullet.setRotation(this.rotation);
                bullet.isActive = true;
                bullet.visible = true;
                
                hasInactive = true;
                break;
            }
        }
        if (!hasInactive) this.bullets.push(new EnemyBullet(this.scene, this.x, this.y + this.height / 2, this.rotation));
        this.bulletSound.play();
    }

    updateFiring(delta) {
        this.firingCooldown += -delta;
        if (this.firingCooldown <= 0) {
            this.fireBullet();
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

const artilleristBurstInterval = 250;
class Artillerist extends Enemy {
    constructor(scene, path, moveConfig) {
        super(scene, path, "Ship_Artillerist", moveConfig, 2);
        this.bursts = -1;
        return this;
    }

    updateFiring(delta) {
        this.firingCooldown += -delta;
        if (this.firingCooldown <= 0) {
            switch (this.bursts) {
                case -1: //start burst
                    this.bursts += Math.round(3 + Math.random() * 2);
                    this.firingCooldown = artilleristBurstInterval;
                default:
                    this.firingCooldown = (this.bursts == 0) ? 1000 + Math.random() * 2000 : artilleristBurstInterval; //if end of burst, use actual firing cooldown rather than burst interval
                    this.fireBullet();
                    this.bursts--;
            }
        }
    }

    updateRotation() {}
}

class Gunner extends Enemy {
    constructor(scene, path, moveConfig) {
        super(scene, path, "Ship_Gunner", moveConfig, 1);
        return this;
    }
}

class Medic extends Enemy {
    constructor(scene, path) {
        super(scene, path, "Ship_Medic");
        return this;
    }
}

const runnerConfig = {
    newPointMaxTime: 1000,
    speed: 100
}
class Runner extends Enemy { //Runner movement is too random for paves; will implement pixel-based movement instead
    constructor(scene, path) {
        super(scene, path, "Ship_Runner", null, 3);
        this.followPointTimer = Math.random() * runnerConfig.newPointMaxTime;
        this.followPoint = {
            x: Math.random() * game.config.width,
            y: Math.random() * (game.config.height / 2)
        }
        return this;
    }

    startMotion() {}

    update(time, delta) {
        this.updateFiring(delta);
        this.updateRotation();

        for (let bullet of this.bullets) {
            bullet.update(delta);
        }

        //movement code
        this.followPointTimer -= delta;
        if (this.followPointTimer >= 0) {
            let speed = runnerConfig.speed;
            if (Math.abs(this.x - this.followPoint.x) > speed) this.x += speed / delta * ((this.x < this.followPoint.x) ? 1 : -1);
            if (Math.abs(this.y - this.followPoint.y) > speed) this.y += speed / delta * ((this.y < this.followPoint.y) ? 1 : -1);
        }
        else {
            this.followPoint = {
                x: Math.random() * game.config.width,
                y: Math.random() * game.config.height / 2
            }
            this.followPointTimer = Math.random() * runnerConfig.newPointMaxTime;
        }
    }
}

class Wall extends Enemy {
    constructor(scene, path, moveConfig) {
        super(scene, path, "Ship_Wall", moveConfig, 1);
        this.hasShield = true;

        let shieldSprite = scene.add.sprite(this.x, this.y + 15, "Shield_1");
        shieldSprite.setRotation(Math.PI);
        shieldSprite.setDepth(1);
        this.shieldSprite = shieldSprite
        return this;
    }

    damage() {
        if (this.hasShield == true) {
            this.shieldSprite.visible = false;
            this.hasShield = false;
        }
        else {
            this.destroyRequested = true;
            this.deathSound.play();
        }
    }

    update(time, delta) {
        this.shieldSprite.x = this.x;
    }
}