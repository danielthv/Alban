function Laser(spos, angle, limit) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);

    this.update = function() {
        this.pos.add(this.vel);
    }

    this.render = function() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.function = function() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            return true;
        }
        return false;
    }

    this.offscreen = function() {
		if (limit) {
			if (this.pos.x > width || this.pos.x < 0) {
				return true;
			}
			if (this.pos.y > height || this.pos.y < 0) {
				return true;
			}
		} else {
			this.r=0
			if (this.pos.x > width + this.r) {
				this.pos.x = -this.r;
			} else if (this.pos.x < -this.r) {
				this.pos.x = width + this.r;
			}
			if (this.pos.y > height + this.r) {
				this.pos.y = -this.r;
			} else if (this.pos.y < -this.r) {
				this.pos.y = height + this.r;
			}
		}
        return false;
    }
}
