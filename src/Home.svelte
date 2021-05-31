<script>
	export let name;

	const usersList = (async () => {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users"
		);
		return await response.json();
	})();
</script>

<main class="section">
	<section class="content">
		<h1>Hello {name}!</h1>
		<p>
			Visit the
			<a href="https://svelte.dev/tutorial">Svelte tutorial</a>
			to learn how to build Svelte apps.
		</p>
	</section>

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

<style>
	li:nth-child(even) {
		list-style-type: "\01F1E8\01F1FF\ "; /* Czech flag emoji */
	}

	li:nth-child(odd) {
		list-style-type: "\01F1E9\01F1EA\ "; /* German flag emoji */
	}
</style>
