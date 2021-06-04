<script>
	import { onMount } from "svelte";
	import World from "./World";
	import bgPath from "./bg.png";

	let canvas,
		ctx,
		world,
		requestId,
		backgroundImage,
		isCanvasClicked = false;

	let span, gameContainer;

	const WIDTH = 1000;
	const HEIGHT = 524;
	const MAX_CUE_POWER = 15;

	onMount(() => {
		ctx = canvas.getContext("2d");
		backgroundImage = new Image();
		backgroundImage.addEventListener("load", () => loop(WIDTH, HEIGHT));
		backgroundImage.src = bgPath;

		world = new World(
			WIDTH,
			HEIGHT,
			ctx,
			backgroundImage,
			(score, ballsCount) => {
				span.innerHTML = score;

				if (score > 0 && ballsCount > 1) {
					const scoreAudio = new Audio(
						"/mixkit-explainer-video-game-alert-sweep-236.wav"
					);
					scoreAudio.play();
					span.classList.add("animated");
					span.classList.add("beforeTada");
					span.classList.add("afterTada");
					setTimeout(() => {
						span.classList.remove("animated");
						span.classList.remove("beforeTada");
						span.classList.remove("afterTada");
					}, 1000);
				}

				if (score > 0 && ballsCount == 1) {
					const winAudio = new Audio(
						"/mixkit-bonus-earned-in-video-game-2058.wav"
					);
					winAudio.play();
				}

				if (score == 0 && ballsCount > 0) {
					const gameOverAudio = new Audio(
						"/mixkit-sad-game-over-trombone-471.wav"
					);
					gameOverAudio.play();
				}
			}
		);

		canvas.addEventListener("mousedown", (e) => {
			isCanvasClicked = true;
			if (e.button == 0 && !world.neo.isMoving() && !world.isGameOver) {
				world.cue.show = true;
			}
		});

		document.addEventListener("mouseup", (e) => {
			if (!isCanvasClicked) {
				return;
			} else {
				isCanvasClicked = false;
			}

			if (e.button == 0 && !world.neo.isMoving() && !world.isGameOver) {
				const powerX =
						(e.clientX -
							canvas.getBoundingClientRect().left -
							world.neo.x) *
						-0.1,
					powerY =
						(e.clientY -
							canvas.getBoundingClientRect().top -
							world.neo.y) *
						-0.1;

				// TODO: TADY JE CHYBA!!!
				if (Math.abs(powerX) > MAX_CUE_POWER) {
					// powerX = powerX < 0 ? -MAX_CUE_POWER : MAX_CUE_POWER;
				}

				if (Math.abs(powerY) > MAX_CUE_POWER) {
					// powerY = powerY < 0 ? -MAX_CUE_POWER : MAX_CUE_POWER;
				}

				world.neo.vx = powerX;
				world.neo.vy = powerY;
				world.cue.show = false;
			}
		});

		document.addEventListener("mousemove", (e) => {
			if (!isCanvasClicked) {
				return;
			}

			if (e.buttons == 1 && !world.neo.isMoving() && !world.isGameOver) {
				// To show the cue when already holding the mouse button waiting
				// for the ball to stop. It's kinda hacking, but it's needed.
				world.cue.show = true;
				const powerX = Math.abs(
						(e.clientX -
							canvas.getBoundingClientRect().left -
							world.neo.x) *
							-0.1
					),
					powerY = Math.abs(
						(e.clientY -
							canvas.getBoundingClientRect().top -
							world.neo.y) *
							-0.1
					);

				if (powerX > MAX_CUE_POWER && powerY > MAX_CUE_POWER) {
					world.cue.color = "#000000";
				} else if (powerY > MAX_CUE_POWER) {
					world.cue.color = "#ff0000";
				} else if (powerX > MAX_CUE_POWER) {
					world.cue.color = "#0000ff";
				} else {
					world.cue.color = "#ff00ff";
				}

				world.cue.toX = e.clientX - canvas.getBoundingClientRect().left;
				world.cue.toY = e.clientY - canvas.getBoundingClientRect().top;
			}
		});
	});

	const loop = (width, height) => {
		if (!world.isGameOver) {
			requestId = window.requestAnimationFrame(loop, canvas);

			update();
			render(width, height);
		}
	};

	const update = () => {
		if (!world.neo.isActive || world.balls.length == 1) {
			// Remember, Neo is also in balls
			window.cancelAnimationFrame(requestId);

			world.isGameOver = true;
		}

		if (!world.isGameOver) {
			world.update();
		}
	};

	const render = () => {
		world.render();
	};
</script>

<section class="section has-text-centered">
	<div bind:this={gameContainer}>
		<header class="section content">
			<h1>
				Score: <span bind:this={span} />
			</h1>
		</header>

		<main class="section">
			<canvas width={WIDTH} height={HEIGHT} bind:this={canvas}>
				Your browser doesn't support this game.
			</canvas>
		</main>
	</div>
</section>

<style>
	@keyframes highlightText {
		50% {
			color: #ff0000;
		}
	}

	@keyframes beforeTada {
		0% {
			content: "\01F389\ ";
		}

		100% {
			content: "";
		}
	}

	@keyframes afterTada {
		0% {
			content: "\ \01F389";
		}

		100% {
			content: "";
		}
	}

	:global(span.animated) {
		animation: highlightText 1s linear 1;
	}

	:global(span.beforeTada::before) {
		animation: beforeTada 2.5s linear 1;
		content: "";
	}

	:global(span.afterTada::after) {
		animation: afterTada 2.5s linear 1;
		content: "";
	}
</style>
