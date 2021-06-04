<script>
	import { Link } from "svelte-routing";

	const usersList = (async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users"
		);
		return await response.json();
	})();
</script>

<main class="section">
	<section class="content">
		<h1>Welcome to Pool.js</h1>

		<p>
			Welcome, this is a simple game project has its origin back in the
			spring of 2016.
		</p>

		<p>
			It started on <a href="https://sssvt.cz" title="SSŠVT"
				>high school</a
			>
			as a semestral project and got back to life as another semestral project
			for
			<a
				href="https://seznam.github.io/CVUT/KAJ/"
				title="Klientské aplikace v JavaScriptu">KAJ course</a
			>
			on
			<a
				href="https://fel.cvut.cz"
				title="Czech Technical University, Faculty of Electrical Engineering"
				>CTU FEE</a
			>. &#x1F642;
		</p>

		<p>
			The intention of this project is to ressurect an old project and
			give it a fresher look with <a href="https://svelte.dev/">Svelte</a>
			and <a href="https://bulma.io">Bulma</a>.
		</p>

		<p>
			<Link to="game" class="button is-link is-large"
				>Start playing &#x1F3AE;</Link
			>
		</p>
	</section>

	<aside class="content">
		<h2>Leaderboard</h2>

		<p>Below is a list of top recent players.</p>

		{#await usersList then users}
			<ul>
				{#each users as user}
					<li class:cz={user.id % 2 == 0} class:de={user.id % 2 == 1 && user.id < 4}>
						{user.name}
					</li>
				{/each}
			</ul>
		{:catch error}
			<p>An error occured.</p>
		{/await}
	</aside>
</main>

<style>
	li {
		list-style-type: "\02754\ "; /* Question mark emoji */
	}

	li.cz {
		list-style-type: "\01F1E8\01F1FF\ "; /* Czech flag emoji */
	}

	li.de {
		list-style-type: "\01F1E9\01F1EA\ "; /* German flag emoji */
	}
</style>
