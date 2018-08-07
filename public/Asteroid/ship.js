function Ship() {
    this.pos = createVector(width/2, height/2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isBoosting = false;
    this.slowingdown = false;
    this.color1 = 255
    this.color2 = 255
    this.color3 = 255

    this.boosting = function(b) {
        this.isBoosting = b;
    }

    this.slowing = function(b) {
        this.slowingdown = b;
    }

    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }
        if (this.slowingdown) {
            this.slow();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }

    this.boost = function() {
        if (this.vel>0) {
            this.vel.mult(0.1);
        } else {
            var force = p5.Vector.fromAngle(this.heading);
            force.mult(0.1);
            this.vel.add(force);
        }

    }

    this.slow = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.sub(force);
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        fill(0);
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }

    this.coloring = function() {
        this.color1 = random(50,255)
        this.color2 = random(50,255)
        this.color3 = random(50,255)
        stroke(this.color1, this.color2, this.color3);
    }

    this.edges = function() {
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

    this.setRotation = function(a) {
        this.rotation = a;
    }

    this.turn = function() {
        this.heading += this.rotation;
    }

}
