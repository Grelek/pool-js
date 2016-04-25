var
	canvas = null,
	ctx = null,
	world = null,
	cue = null,
	neo = null,
	isGameOver = false,
	requestId = null,
	backgroundImage = null,
	borderWidth = 23;

const
	MAX_CUE_POWER = 15;

window.onload = function() {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	backgroundImage = new Image();
	backgroundImage.src = "bg.png";
	world = new World(canvas.width, canvas.height, ctx);
	neo = new Ball(260, world.height / 2, "grey"); // The Chosen One
	cue = new Cue(neo);

	canvas.onmousedown = function(e) {
		if (e.button == 0 && !neo.isMoving() && !isGameOver) {
			cue.show = true;
		}
	};

	canvas.onmouseup = function(e) {
		if (e.button == 0 && !neo.isMoving() && !isGameOver) {
			var
				powerX = (e.clientX - neo.x) * -0.1,
				powerY = (e.clientY - neo.y) * -0.1;

			if (Math.abs(powerX) > MAX_CUE_POWER) {
				powerX = powerX < 0 ? -MAX_CUE_POWER : MAX_CUE_POWER;
			}

			if (Math.abs(powerY) > MAX_CUE_POWER) {
				powerY = powerY < 0 ? -MAX_CUE_POWER : MAX_CUE_POWER;
			}

			neo.vx = powerX;
			neo.vy = powerY;
			cue.show = false;
		}
	};

	canvas.onmousemove = function(e) {
		if (e.buttons == 1 && !neo.isMoving() && !isGameOver) {
			// To show the cue when already holding the mouse button waiting
			// for the ball to stop. It's kinda hacking, but it's needed.
			cue.show = true;

			cue.toX = e.clientX;
			cue.toY = e.clientY;
		}
	};

	world.addBall(neo);

	// 1st top line
	world.addBall(new Ball(700, world.height / 2 - 25));
	world.addBall(new Ball(740, world.height / 2 - 25));
	// 2nd top line
	world.addBall(new Ball(720, world.height / 2 - 50));
	world.addBall(new Ball(760, world.height / 2 - 50));
	// Last top line
	world.addBall(new Ball(740, world.height / 2 - 75));
	world.addBall(new Ball(780, world.height / 2 - 75));
	// Middle three inline
	world.addBall(new Ball(680, world.height / 2));
	world.addBall(new Ball(720, world.height / 2));
	world.addBall(new Ball(760, world.height / 2));
	// 1st bottom line
	world.addBall(new Ball(700, world.height / 2 + 25));
	world.addBall(new Ball(740, world.height / 2 + 25));
	// 2nd bottom line
	world.addBall(new Ball(720, world.height / 2 + 50));
	world.addBall(new Ball(760, world.height / 2 + 50));
	// Last bottom line
	world.addBall(new Ball(740, world.height / 2 + 75));
	world.addBall(new Ball(780, world.height / 2 + 75));

	world.addHole(new Hole(borderWidth, borderWidth));
	world.addHole(new Hole(world.width / 2, borderWidth));
	world.addHole(new Hole(world.width - borderWidth, borderWidth));
	world.addHole(new Hole(borderWidth, world.height - borderWidth));
	world.addHole(new Hole(world.width / 2, world.height - borderWidth));
	world.addHole(new Hole(world.width - borderWidth, world.height - borderWidth));

	loop();
};

var World = function(width, height, ctx) {
	this.width = width;
	this.height = height;
	this.ctx = ctx;
	this.balls = [];
	this.holes = [];
	this.score = 0;
};
World.prototype = {
	addBall: function(ball) {
		this.balls.push(ball);
	},
	addHole: function(hole) {
		this.holes.push(hole);
	},
	removeBall: function(ball) {
		this.balls.splice(this.balls.indexOf(ball), 1);
		ball.isActive = false;

		if (neo.isActive) {
			this.score++;
		}
	},
	render: function() {
		this.holes.forEach(function(hole) {
			hole.render(this.ctx);
		});

		this.balls.forEach(function(ball) {
			ball.render(this.ctx);
		});
	},
	update: function() {
		this.balls.forEach(function(ball) {
			ball.move();
		});

		this.balls.forEach(function(ball) {
			ball.collideHoles(world.holes, ball);
		});

		if (this.balls.length > 1) {
			this.balls.forEach(function(ball) {
				ball.collideBalls(world.balls, ball);
			});
		}

		this.balls.forEach(function(ball) {
			ball.collideWorld(world);
		});
	},
};

var Ball = function(x, y, color = "white", vx = 0, vy = 0) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.size = 30;
	this.radius = this.size / 2;
	this.vx = vx;
	this.vy = vy;
	this.isActive = true;
};
Ball.prototype = {
	move: function() {
		this.x += this.vx;
		this.y += this.vy;

		if (Math.abs(this.vx) < 0.05) { // It's not even moving
			this.vx = 0;
		}
		if (Math.abs(this.vy) < 0.05) { // It's not even moving
			this.vy = 0;
		}

		this.vx *= 0.99;
		this.vy *= 0.99;
	},
	render: function(ctx) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	},
	isMoving: function() {
		return Math.abs(this.vx) > 0 || Math.abs(this.vy) > 0;
	},
	collidesWorldX: function(width) {
		return this.x >= width - borderWidth * 2 || this.x - this.size <= borderWidth / 2;
	},
	collidesWorldY: function(height) {
		return this.y >= height - borderWidth * 2 || this.y - this.size <= borderWidth / 2;
	},
	collideWorld: function(world) {
		if (this.collidesWorldX(world.width)) {
			this.vx *= -1;
			this.x = this.x - this.radius <= 0 ? this.x + this.radius : this.x;
		}

		if (this.collidesWorldY(world.height)) {
			this.vy *= -1;
			this.y = this.y - this.radius <= 0 ? this.y + this.radius : this.y;
		}
	},
	collideBalls: function(balls, current) {
		balls.forEach(function(ball) {
			if (ball === current) { return; }

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
					var weight = 2 * ball.size / combMass;

					current.vx += weight * xCol;
					current.vy += weight * yCol;
					ball.vx -= weight * xCol;
					ball.vy -= weight * yCol;
				}
			}
		});
	},
	collideHoles: function(holes, current) {
		holes.forEach(function(hole) {
			var xDiff = hole.x - current.x;
			var yDiff = hole.y - current.y;

			var dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

			// hole.radius * 0.6 padding is enough I think
			if (dist < current.radius + (hole.radius * 0.6)) {
				world.removeBall(current);
			}
		});
	},
};

var Hole = function(x, y) {
	this.x = x;
	this.y = y;
	this.size = 60;
	this.radius = this.size / 2;
};
Hole.prototype = {
	render: function(ctx) {
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	},
};

var Cue = function(ball) {
	this.ball = ball;
};
Cue.prototype = {
	render: function() {
		if (!this.show) {
			return;
		}

		ctx.beginPath();
		ctx.strokeStyle = "magenta";
		ctx.moveTo(this.ball.x, this.ball.y);
		ctx.lineTo(this.toX, this.toY);
		ctx.lineWidth = 1.5;
		ctx.stroke();
		ctx.closePath();
	},
};

var loop = function() {
	requestId = window.requestAnimationFrame(loop, canvas);

	update();
	render();
};

var update = function() {
	if (!neo.isActive || world.balls.length == 1) { // Remember, Neo is also in balls
		window.cancelAnimationFrame(requestId);
		requestId = undefined;

		isGameOver = true;
	}

	if (!isGameOver) {
		world.update();
	}
};

var render = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(backgroundImage, 0, 0);

	world.render();

	cue.render();

	if (isGameOver) {
		ctx.beginPath();
		ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.strokeStyle = "#ff0042";
		ctx.lineWidth = 2;
		ctx.font = "120px sans-serif";
		ctx.textAlign = "center";
		ctx.strokeText("GAME OVER", world.width / 2, 150);
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = "#f7d842";
		ctx.font = "50px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("You ended up with score", world.width / 2, 250);
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = "#9bcb4a";
		ctx.font = "110px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(world.score, world.width / 2, 400);
		ctx.closePath();
	}
};
