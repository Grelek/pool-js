<script>
	import { onMount } from "svelte";

	export let showModal = false;

	// Very simple modal for score submission

	let nameInput, name, country, age;

	const close = () => (showModal = false);

	onMount(() => nameInput.focus());
</script>

<div class="modal" class:is-active={showModal}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Submit score</p>
			<button class="delete" aria-label="close" on:click={close} />
		</header>

		<form method="POST" action="" on:submit|preventDefault>
			<section class="modal-card-body">
				<div class="content">
					<p>
						You can submit your score to our leaderboard! If you
						wish to share your score, please fill the form below.
					</p>
				</div>

				<div class="field">
					<label class="label" for="name">Name</label>
					<div class="control">
						<input
							bind:this={nameInput}
							bind:value={name}
							class="input"
							class:is-danger={name != undefined &&
								name.length < 5}
							maxlength="20"
							type="text"
							placeholder="Enter your name"
							id="name"
						/>
					</div>
				</div>

				<div class="field">
					<label class="label" for="country">Country</label>
					<div class="control">
						<div class="select">
							<select id="country" bind:value={country}>
								<option>&#x1F1E8;&#x1F1FF;&nbsp;Czechia</option>
								<option>&#x1F1E9;&#x1F1EA;&nbsp;Germany</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label" for="age">Age</label>
					<div class="control">
						<input
							bind:value={age}
							class="input"
							class:is-danger={age < 13}
							type="number"
							placeholder="Enter your age"
							id="name"
						/>
					</div>
					<p class="help is-info">
						Your age won't be saved or shared
					</p>
				</div>
			</section>

			<footer class="modal-card-foot">
				<button class="button is-success" on:click={close}
					>Submit score</button
				>
				<button class="button" on:click={close}>Cancel</button>
			</footer>
		</form>
	</div>
</div>
