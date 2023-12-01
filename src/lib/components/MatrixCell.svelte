<script>
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$lib/components/clickOutside';
	import { isNumber } from '$lib/utils';

	/** @type {import('$lib/matrix/types/matrix').MatrixCell} */
	export let cell;
	export let editable = true;

	const dispatch = createEventDispatcher();
	let showInput = false;
	let currentValue = '';

	/**
	 * @param {String} val
	 */
	const updateIn = (val) => {
		const converted = Number(val);
		const toReplace = !isNaN(converted) ? converted : null;
		if (cell.value !== toReplace) {
			cell.value = toReplace;
			dispatch('change', cell);
		}
	};
	/**
	 * @param {Number | null | undefined} value
	 */
	const updateOut = (value) => {
		value = cell.value;
		currentValue = isNumber(value) ? /** @type {Number} */ (value).toString() : '';
	};

	$: updateOut(cell.value);
</script>

<div class="matrix-cell">
	{#if editable && showInput}
		<input
			type="text"
			bind:value={currentValue}
			use:clickOutside={() => (showInput = false)}
			on:change={() => updateIn(currentValue)}
			autofocus
		/>
	{:else if editable}
		<button
			type="button"
			on:click={(e) => {
				showInput = true;
				e.stopPropagation();
			}}
		>
			{isNumber(cell.value) ? cell.value : '_'}
		</button>
  {:else}
    <span>
			{isNumber(cell.value) ? cell.value : '_'}
    </span>
	{/if}
</div>

<style>
	.matrix-cell {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.matrix-cell > * {
		width: 100%;
		height: 100%;
	}

	.matrix-cell input {
		display: block;
		appearance: unset;
		border: none;
		outline: none;
		text-align: center;
	}

	.matrix-cell button {
		background-color: white;
		border: none;
	}

  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
