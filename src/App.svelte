<script>
	import { Router, Link, Route } from "svelte-routing";
	import Game from "./Game.svelte";
	import Home from "./Home.svelte";

	export let url = "";
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link>
		<Link to="game">Game</Link>
	</nav>
	<div>
		<Route path="/">
			<Home name="world" />
		</Route>
		<Route path="game">
			<Game />
		</Route>
	</div>
</Router>
