<script lang="ts">
	import 'w3-css/w3.css';

	let startValue = 0;

	function checkNum(num?: number): boolean {
		if (!num) return false;
		let value: string = num.toString();
		return value === value.split('').reverse().join('');
	}

	let nextNum = startValue;
	async function getNext() {
		let nextNum = startValue;
		while (!checkNum(nextNum)) {
			nextNum++;
		}
		return nextNum;
	}
	$: {
		getNext().then((val) => (nextNum = val));
	}
</script>

<main class="w3-card">
	<header class="w3-container">
		<h1 class="w3-center w3-xlarge">Welcome to my odometer palindrome finder!</h1>
	</header>
	<div class="w3-content w3-padding-64">
		<label for="StartValue">Enter the starting number of your Odometer</label>
		<input
			class="w3-container w3-input w3-cell w3-cell-middle"
			type="number"
			name="StartValue"
			id="Input1"
			bind:value={startValue}
		/>
	</div>

	{#if checkNum(startValue)}
		<footer class="w3-cell-row w3-padding-64">
			<div class="w3-container w3-cell" />

			<div class="w3-container w3-green w3-cell w3-cell-middle">
				<p>This is a palindrome!</p>
			</div>

			<div class="w3-container w3-cell w3-cell-bottom" />
		</footer>
	{:else}
		<footer class="w3-cell-row w3-padding-64">
			<div class="w3-container w3-cell" />

			<div class="w3-container w3-red w3-cell w3-cell-middle">
				<p>This is NOT a palindrome!</p>
			</div>

			{#await getNext()}
				<div class="w3-container w3-cell w3-cell-bottom">
					<p>Calculating next palindrome</p>
				</div>
			{:then value}
				<div class="w3-container w3-cell w3-cell-bottom">
					<p>Your next palindrom will be {value}. That is {value - startValue} miles!</p>
				</div>
			{/await}
		</footer>
	{/if}
</main>
