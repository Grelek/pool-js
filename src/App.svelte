<script>
	import { Router, Link, Route } from "svelte-routing";
	import Game from "./Game.svelte";
	import Home from "./Home.svelte";

	export let url = "";
</script>

<Router {url}>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<Link to="/" class="navbar-item">
				Logo
			</Link>

			<a
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample"
			>
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>

		<div class="navbar-menu">
			<div class="navbar-start">
				<Link to="/" class="navbar-item">Home</Link>

				<Link to="game" class="navbar-item">Game</Link>
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
