/**
 * @param {Number} rows
 * @param {Number} cols
 * @returns {any[][]}
 */
export function createArray(rows, cols) {
  return Array.from(Array(rows), () => Array(cols).fill(null));
}

/** @type {import('./types/utils').DeepCloneArray} */
export function deepCloneArray(arr) {
  return JSON.parse(JSON.stringify(arr));
}

/**
 * @param {any} value
 */
export function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}
