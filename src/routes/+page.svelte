<script>
	import { addMatrix } from '$lib/matrix/operation';
	import { newMatrix } from '$lib/matrix/matrix';

	import Matrix from '$lib/components/Matrix.svelte';

	/** @typedef {import('$lib/matrix/types/matrix').Matrix} Matrix */

	let matrixCount = 1;

	/** @type {Matrix[]} */
	let matrices = [newMatrix(1, 1)];
	/** @type {Boolean[]} */
	let subtracts = [];

	/** @type {Matrix?} */
	let resultMatrix = null;

	let isSolved = false;
	let isValid = false;

	/**
	 * @param {Matrix[]} matrices
	 * @param {Boolean[]} subtracts
	 */
	function updateResult(matrices, subtracts) {
		console.log('updating result');
		if (matrices.length <= 1) {
			resultMatrix = null;
			return;
		}
		resultMatrix = matrices.reduce(
			(prev, cur, index) => {
				if (!prev) return cur;
				const result = addMatrix(prev, cur, { subtract: subtracts[index - 1] });
				console.log('prev', prev);
				console.log('cur', cur);
				console.log('result', result);
				return result;
			},
			/** @type {Matrix?} */
			(null)
		);
	}

	function solveResult() {
		if (matrices.length <= 1) {
			return;
		}

    isSolved = true;

		try {
			resultMatrix = matrices.reduce((prev, cur, index) => {
				if (!prev) return cur;
				const result = addMatrix(prev, cur, { subtract: subtracts[index - 1] });
				return result;
			}, /** @type {Matrix?} */ (null));
      isValid = true;
		} catch {
      console.log('error');
			isValid = false;
		}
	}

	/**
	 * @param {Number} rows
	 * @param {Number} cols
	 */
	function onResize(rows, cols) {
		matrices.forEach((matrix, index) => {
			matrices[index] = matrix.resize(rows, cols);
		});
	}

	/**
	 * @param {Number} count
	 */
	function changeCount(count) {
		const newMatrices = [];
		const newSubtracts = [];
		for (let i = 1; i <= count; i++) {
			if (i <= matrices.length) {
				newMatrices.push(matrices[i - 1]);
			} else {
				newMatrices.push(newMatrix(1, 1));
			}

			if (i === 1) continue;
			if (i - 1 <= subtracts.length) newSubtracts.push(subtracts[i]);
			else newSubtracts.push(false);
		}

		matrices = newMatrices;
		subtracts = newSubtracts;
	}

	/**
	 * @param {Number} index
	 */
	function toggleOperation(index) {
		subtracts[index] = !subtracts[index];
		subtracts = [...subtracts];
	}

	function reset() {
		matrixCount = 1;
		matrices = [newMatrix(1, 1)];
	}

	//	$: updateResult(matrices, subtracts);
</script>

<svelte:head>
	<title>Matrix Addition</title>
</svelte:head>

<main class="main">
	<div class="matrix-settings">
		<div class="setting-entry">
			<label for="matrix-count">Matrix Count</label>
			<input
				type="number"
				name="matrix-count"
				bind:value={matrixCount}
				min={1}
				on:change={() => changeCount(matrixCount)}
			/>
		</div>
		<div class="setting-entry">
			<button on:click={reset}>RESET</button>
		</div>
	</div>
	<div class="operation-container">
		{#each matrices as matrix, i}
			{#if i > 0}
				<button class="operation-btn" on:click={() => toggleOperation(i - 1)}
					>{subtracts[i - 1] ? '-' : '+'}</button
				>
			{/if}

			<Matrix bind:matrix on:change={() => (matrices = [...matrices])} />
		{/each}
		{#if matrixCount > 1}
			<button class="operation-btn" on:click={solveResult}>=</button>
		{/if}
		{#if isSolved}
			{#if isValid && resultMatrix !== null}
				<Matrix matrix={resultMatrix} editable={false} allowMod={false} />
			{:else}
				<span> Invalid Matrix </span>
			{/if}
		{/if}
	</div>
</main>

<style>
	.main {
		margin-top: 5rem;
	}

	.matrix-settings {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.matrix-settings > .setting-entry {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.setting-entry input {
		width: 5rem;
	}

	.operation-container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 2rem;
		margin-top: 2rem;
	}

	.operation-btn {
		width: 2rem;
		height: 2rem;
		border-radius: 2rem;
		background-color: white;
		border: black 1px solid;
		font-size: 1.5rem;
		vertical-align: middle;
	}
</style>
