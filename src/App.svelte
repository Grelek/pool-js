<script>
	import { Router, Link, Route } from "svelte-routing";
	import BackgroundMusic from "./BackgroundMusic.svelte";
	import Game from "./Game.svelte";
	import Home from "./Home.svelte";

	export let url = "";

	let navbarBurgerSelected = false;
</script>

<Router {url}>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="container">
			<div class="navbar-brand">
				<Link to="/" class="navbar-item">Logo</Link>

				<a
					on:click={() =>
						(navbarBurgerSelected = !navbarBurgerSelected)}
					role="button"
					class="navbar-burger"
					class:is-active={navbarBurgerSelected}
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</a>
			</div>

			<div class="navbar-menu" class:is-active={navbarBurgerSelected}>
				<div class="navbar-start">
					<Link to="/" class="navbar-item">Home</Link>

					<Link to="game" class="navbar-item">Game</Link>

					<div class="navbar-item">
						<BackgroundMusic />
					</div>
				</div>
			</div>
		</div>
	</nav>

	<div class="container">
		<Route path="/">
			<Home name="world" />
		</Route>

		<Route path="game">
			<Game />
		</Route>
	</div>
</Router>
