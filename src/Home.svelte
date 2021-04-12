<script>
	export let name;

	const usersList = (async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users"
		);
		return await response.json();
	})();
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	ul {
		text-align: left;
	}

	li:nth-child(even) {
		list-style-type: "🇨🇿 ";
	}
	li:nth-child(odd) {
		list-style-type: "🇩🇪 ";
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Hello {name}!</h1>
	<p>
		Visit the
		<a href="https://svelte.dev/tutorial">Svelte tutorial</a>
		to learn how to build Svelte apps.
	</p>

	{#await usersList then users}
		<ul>
			{#each users as user}
				<li>{user.name}</li>
			{/each}
		</ul>
	{:catch error}
		<p>An error occured.</p>
	{/await}
</main>
