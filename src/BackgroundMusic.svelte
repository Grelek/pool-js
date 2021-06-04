<script>
	import { onMount } from "svelte";

	let audioButton;
	const audio = new Audio("/bensound-theelevatorbossanova.mp3");

	const playText = "Music &#x23F8&#xFE0F";
	const pauseText = "Music &#x25B6&#xFE0F";

	const toggleButtonText = () => {
		if (audio.paused) {
			audioButton.innerHTML = pauseText;
		} else {
			audioButton.innerHTML = playText;
		}
	};

	const audioToggle = () => {
		if (audio.paused) {
			audio.play();
			toggleButtonText();
		} else {
			audio.pause();
			toggleButtonText();
		}
	};

	onMount(() => {
		audioButton.innerHTML = "Music &#x25B6&#xFE0F";
		audio.addEventListener("ended", toggleButtonText);
	});
</script>

<button
	class="button is-primary"
	type="button"
	bind:this={audioButton}
	on:click={audioToggle}
/>

<style>
	button.button {
		transition: all 0.25s ease;
	}

	button.button:hover {
		transform: scale(1.25);
	}

	button.button:active {
		transition: all 0.05s ease;
		transform: scale(1.1);
	}
</style>
