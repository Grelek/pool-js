export default class Ball {
	constructor(world, x, y, color = "white", vx = 0, vy = 0) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.size = 30;
		this.radius = this.size / 2;
		this.vx = vx;
		this.vy = vy;
		this.isActive = true;
		this.world = world;

		this.SLOWDOWN_FACTOR = 0.97;
		this.IGNORE_SPEED = 0.2;
		this.BORDER_WIDTH = 23;
	}

	move() {
		this.x += this.vx;
		this.y += this.vy;

		if (Math.abs(this.vx) < this.IGNORE_SPEED &&
			Math.abs(this.vy) < this.IGNORE_SPEED) {
			// It's not even moving
			this.vx = 0;
			this.vy = 0;
		}

		this.vx *= this.SLOWDOWN_FACTOR;
		this.vy *= this.SLOWDOWN_FACTOR;
	}

	isMoving() {
		return Math.abs(this.vx) > 0 || Math.abs(this.vy) > 0;
	}

	collidesWorldX(width) {
		return (
			this.x >= width - this.BORDER_WIDTH * 2 ||
			this.x - this.size <= this.BORDER_WIDTH / 2
		);
	}

	collidesWorldY(height) {
		return (
			this.y >= height - this.BORDER_WIDTH * 2 ||
			this.y - this.size <= this.BORDER_WIDTH / 2
		);
	}

	collideWorld(world) {
		if (this.collidesWorldX(world.width)) {
			this.vx *= -1;
			this.x = this.x - this.radius <= 0 ? this.x + this.radius : this.x;
		}

		if (this.collidesWorldY(world.height)) {
			this.vy *= -1;
			this.y = this.y - this.radius <= 0 ? this.y + this.radius : this.y;
		}
	}

	collideBalls(balls, current) {
		balls.forEach(function (ball) {
			if (ball === current) {
				return;
			}

			var xDiff = current.x - ball.x;
			var yDiff = current.y - ball.y;

			var dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

			if (dist < current.radius + ball.radius) {
				var vxDiff = ball.vx - current.vx;
				var vyDiff = ball.vy - current.vy;
				var hypo = Math.pow(xDiff, 2) + Math.pow(yDiff, 2);
				var dot = xDiff * vxDiff + yDiff * vyDiff;

				if (dot > 0) {
					var colScale = dot / hypo;
					var xCol = xDiff * colScale;
					var yCol = yDiff * colScale;
					var combMass = current.size + ball.size;
					var weight = (2 * ball.size) / combMass;

					current.vx += weight * xCol;
					current.vy += weight * yCol;
					ball.vx -= weight * xCol;
					ball.vy -= weight * yCol;
				}
			}
		});
	}

	collideHoles(holes, current) {
		holes.forEach((hole) => {
			const xDiff = hole.x - current.x;
			const yDiff = hole.y - current.y;

			const dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

			// hole.radius * 0.6 padding is enough I think
			if (dist < current.radius + hole.radius * 0.6) {
				this.world.removeBall(current);
			}
		});
	}
}
