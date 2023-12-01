<script>
	import { createEventDispatcher } from 'svelte';

	import MatrixCell from './MatrixCell.svelte';

	/** @type {import('$lib/matrix/types/matrix').Matrix} */
	export let matrix;
	export let widthPerCell = '3rem';
	export let allowMod = true;
	export let editable = true;

	let className = '';
	export { className as class };
	export let style = '';

	const dispatch = createEventDispatcher();
	let showMod = false;

	let cols = 0;
	let rows = 0;

	$: cols = matrix.cols;
	$: rows = matrix.rows;

	/**
	 * @param {Number} rows
	 * @param {Number} cols
	 */
	export function resize(rows, cols) {
		matrix = matrix.resize(rows, cols);
		dispatch('resize', { rows, cols });
	}
</script>

<div
	class="matrix {className}"
	style="--cell-width: {100 /
		matrix.cols}%; --matrix-width: calc({widthPerCell} * {matrix.cols}); {style}"
	tabindex="-1"
	role="button"
	on:focus={() => null}
	on:mouseover={() => (showMod = allowMod && true)}
	on:mouseleave={() => (showMod = false)}
>
	<table>
		{#each Array(rows) as _, rowIndex}
			<tr>
				{#each Array(cols) as _, colIndex}
					<td>
						<div class="content">
							<MatrixCell
								{editable}
								cell={matrix.getCellAt(rowIndex + 1, colIndex + 1)}
								on:change={() => dispatch('change', matrix)}
							/>
						</div>
					</td>
				{/each}
			</tr>
		{/each}
	</table>
	{#if showMod}
		<button class="mod col add" on:click={() => resize(rows, cols + 1)}>+</button>
		<button class="mod col delete" on:click={() => resize(rows, Math.max(cols - 1, 1))}>-</button>
		<button class="mod row add" on:click={() => resize(rows + 1, cols)}>+</button>
		<button class="mod row delete" on:click={() => resize(Math.max(rows - 1, 1), cols)}>-</button>
	{/if}
</div>

<style>
	.matrix {
		position: relative;
		width: var(--matrix-width);
		text-align: center;
		font-family: monospace;
		font-size: 0.9rem;
		padding: 0.25rem;
		border-image-slice: 22 22 22 22;
		border-image-width: 20px 20px 20px 20px;
		border-image-outset: 0px 0px 0px 0px;
		border-image-repeat: stretch stretch;
		border-image-source: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAABKCAYAAAA11z32AAAAAXNSR0IArs4c6QAAAJpJREFUaAXt2jEKg0AARUE3t9wT7jENFtO5IEhSPZsHRtkw/NKx1jqPm2vOOW5uv7q1O+vY/vDquOcvX+d/nj/+uyf7E2yTSIKAtokkCGibSIKAtokkCGibSIKAtokkCGibSIKAtokkCGibSIKAtokkCGibSIKAtokkCGibSIKAtokkCGibSIKAtokkCGibSIKAjt13Vv/82OsLo94UYanCbyYAAAAASUVORK5CYII=');
	}

	.matrix table {
		width: 100%;
		height: 100%;
	}

	td {
		width: var(--cell-width);
		position: relative;
	}

	td .content {
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button.mod {
		position: absolute;
		width: 2rem;
		height: 2rem;
		border: none;
		border-radius: 2rem;
	}

	button.mod.col {
		top: 50%;
		transform: translateY(-50%);
	}

	button.mod.col.add {
		right: -1rem;
	}

	button.mod.col.delete {
		left: -1rem;
	}

	button.mod.row {
		left: 50%;
		transform: translateX(-50%);
	}

	button.mod.row.add {
		bottom: -1rem;
	}

	button.mod.row.delete {
		top: -1rem;
	}
</style>
