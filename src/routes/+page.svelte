<script lang="ts">
	import 'w3-css/w3.css';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let { startValue } = data;

	function checkNum(num?: number): boolean {
		if (!num) return false;
		let value: string = num.toString();
		return value === value.split('').reverse().join('');
	}

	async function getNext(value: number = startValue) {
		let nextNum = value;
		while (!checkNum(nextNum)) {
			nextNum++;
		}
		return nextNum;
	}
</script>

<main class="w3-card">
	<header class="w3-container">
		<h1 class="w3-center w3-xlarge">Welcome to my odometer palindrome finder!</h1>
	</header>
	<div class="w3-content w3-padding-64">
		<form method="post" class="w3-center">
			<label for="startValue">Enter the starting number of your Odometer</label>
			<input
				class="w3-container w3-input w3-cell w3-cell-middle"
				inputmode="numeric"
				name="startValue"
				id="Input1"
				bind:value={startValue}
			/>
			<button type="submit" class="w3-button w3-green">Save</button>
		</form>
	</div>

	{#if checkNum(startValue)}
		<footer class="w3-cell-row w3-padding-64">
			<div class="w3-container w3-cell" />

			<div class="w3-container w3-green w3-cell w3-cell-middle">
				<p>This is a palindrome!</p>
			</div>

			{#await getNext(startValue + 1)}
				<div class="w3-container w3-cell w3-cell-bottom">
					<p>Calculating next palindrome ...</p>
				</div>
			{:then value}
				<div class="w3-container w3-cell w3-cell-bottom">
					<p>Your next palindrom will be {value}. That is {value - startValue} miles!</p>
				</div>
			{/await}
		</footer>
	{:else}
		<footer class="w3-cell-row w3-padding-64">
			<div class="w3-container w3-cell" />

			<div class="w3-container w3-red w3-cell w3-cell-middle">
				<p>This is NOT a palindrome!</p>
			</div>

			{#await getNext(startValue)}
				<div class="w3-container w3-cell w3-cell-bottom">
					<p>Calculating next palindrome ...</p>
				</div>
			{:then value}
				<div class="w3-container w3-cell w3-cell-bottom">
					<p>Your next palindrom will be {value}. That is {value - startValue} miles!</p>
				</div>
			{/await}
		</footer>
	{/if}
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	form * {
		margin: 20px;
	}

	#Input1 {
		max-width: 10rem;
		text-align: center;
	}
</style>
