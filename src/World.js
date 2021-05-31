import Ball from "./Ball";
import Cue from "./Cue";
import Hole from "./Hole";

export default class World {
	constructor(width, height, ctx, backgroundImage, scoreCallback) {
		this.width = width;
		this.height = height;
		this.balls = [];
		this.holes = [];
		this.score = 0;
		this.ctx = ctx;
		this.isGameOver = false;
		this.backgroundImage = backgroundImage;

		this.BORDER_WIDTH = 23;

		this.scoreCallback = scoreCallback;
		this.scoreCallback(this.score);

		this._init();
	}

	_init() {
		this._setNeo(new Ball(this, 260, this.height / 2, "grey")); // The Chosen One
		this._setCue(new Cue(this.neo));

		this.addBall(this.neo);

		// 1st top line
		this.addBall(new Ball(this, 700, this.height / 2 - 25));
		this.addBall(new Ball(this, 740, this.height / 2 - 25));
		// 2nd top line
		this.addBall(new Ball(this, 720, this.height / 2 - 50));
		this.addBall(new Ball(this, 760, this.height / 2 - 50));
		// Last top line
		this.addBall(new Ball(this, 740, this.height / 2 - 75));
		this.addBall(new Ball(this, 780, this.height / 2 - 75));
		// Middle three inlinethis
		this.addBall(new Ball(this, 680, this.height / 2));
		this.addBall(new Ball(this, 720, this.height / 2));
		this.addBall(new Ball(this, 760, this.height / 2));
		// 1st bottom line
		this.addBall(new Ball(this, 700, this.height / 2 + 25));
		this.addBall(new Ball(this, 740, this.height / 2 + 25));
		// 2nd bottom line
		this.addBall(new Ball(this, 720, this.height / 2 + 50));
		this.addBall(new Ball(this, 760, this.height / 2 + 50));
		// Last bottom line
		this.addBall(new Ball(this, 740, this.height / 2 + 75));
		this.addBall(new Ball(this, 780, this.height / 2 + 75));

		this.addHole(new Hole(this.BORDER_WIDTH, this.BORDER_WIDTH));
		this.addHole(new Hole(this.width / 2, this.BORDER_WIDTH));
		this.addHole(new Hole(this.width - this.BORDER_WIDTH, this.BORDER_WIDTH));
		this.addHole(new Hole(this.BORDER_WIDTH, this.height - this.BORDER_WIDTH));
		this.addHole(new Hole(this.width / 2, this.height - this.BORDER_WIDTH));
		this.addHole(new Hole(this.width - this.BORDER_WIDTH, this.height - this.BORDER_WIDTH));
	}

	_setCue(cue) {
		this.cue = cue;
	}

	_setNeo(neo) {
		this.neo = neo;
	}

	addBall(ball) {
		this.balls.push(ball);
	}

	addHole(hole) {
		this.holes.push(hole);
	}

	removeBall(ball) {
		this.balls.splice(this.balls.indexOf(ball), 1);
		ball.isActive = false;

		if (this.neo.isActive) {
			this.scoreCallback(++this.score);
		}
	}

	render() {
		this.ctx.drawImage(this.backgroundImage, 0, 0);

		this.holes.forEach((hole) => this.renderHole(hole));
		this.balls.forEach((ball) => this.renderBall(ball));

		this.renderCue();

		if (this.isGameOver) {
			this.ctx.beginPath();
			this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
			this.ctx.rect(0, 0, this.width, this.height);
			this.ctx.fill();
			this.ctx.closePath();

			this.ctx.beginPath();
			this.ctx.strokeStyle = "#ff0042";
			this.ctx.lineWidth = 2;
			this.ctx.font = "120px sans-serif";
			this.ctx.textAlign = "center";
			this.ctx.strokeText("GAME OVER", this.width / 2, 150);
			this.ctx.closePath();

			this.ctx.beginPath();
			this.ctx.fillStyle = "#f7d842";
			this.ctx.font = "50px sans-serif";
			this.ctx.textAlign = "center";
			this.ctx.fillText("You ended up with score", this.width / 2, 250);
			this.ctx.closePath();

			this.ctx.beginPath();
			this.ctx.fillStyle = "#9bcb4a";
			this.ctx.font = "110px sans-serif";
			this.ctx.textAlign = "center";
			this.ctx.fillText(this.score, this.width / 2, 400);
			this.ctx.closePath();
		}
	}

	renderHole(hole) {
		this.ctx.beginPath();
		this.ctx.fillStyle = "black";
		this.ctx.arc(hole.x, hole.y, hole.radius, 0, 2 * Math.PI, false);
		this.ctx.fill();
		this.ctx.closePath();
	}

	renderCue() {
		if (!this.cue.show) {
			return;
		}

		this.ctx.beginPath();
		this.ctx.strokeStyle = this.cue.color;
		this.ctx.moveTo(this.cue.ball.x, this.cue.ball.y);
		this.ctx.lineTo(this.cue.toX, this.cue.toY);
		this.ctx.lineWidth = 1.5;
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.strokeStyle = "white";
		this.ctx.moveTo(this.cue.ball.x, this.cue.ball.y);
		this.ctx.lineTo(
			this.cue.ball.x + (this.cue.ball.x - this.cue.toX),
			this.cue.ball.y + (this.cue.ball.y - this.cue.toY)
		);
		this.ctx.lineWidth = 1.5;
		this.ctx.stroke();
		this.ctx.closePath();
	}

	renderBall(ball) {
		this.ctx.beginPath();
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
		this.ctx.fillStyle = ball.color;
		this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}

	update() {
		this.balls.forEach((ball) => ball.move());
		this.balls.forEach((ball) => ball.collideHoles(this.holes, ball));

		if (this.balls.length > 1) {
			this.balls.forEach((ball) => ball.collideBalls(this.balls, ball));
		}

		this.balls.forEach((ball) => ball.collideWorld(this));
	}
}
