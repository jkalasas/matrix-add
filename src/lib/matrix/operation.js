import { isNumber } from "$lib/utils";
import { matrixError, newMatrix } from "./matrix";

/** @typedef {import("./types/matrix").Matrix} Matrix */

/**
 * @param {Matrix} a
 * @param {Matrix} b
 * @param {Object} options?
 * @param {Boolean?} options.subtract?
 * @returns {Matrix}
 */
export function addMatrix(a, b, options) {
  if (a.rows !== b.rows || a.cols !== b.cols) {
    throw matrixError(
      `Order of matrices should be equal! (${a.rows}, ${a.cols}) is not equal to (${b.rows}, ${b.cols})!`,
    );
  }
  const aValues = a.getValuesArray();
  const bValues = b.getValuesArray();

  const resultValues = aValues.map((row, rowIndex) =>
    row.map((aValue, colIndex) => {
      const bValue = bValues[rowIndex][colIndex];
      if (!isNumber(aValue) || !isNumber(bValue)) return null;
      if (options && options.subtract) {
        return /** @type {Number} */ (aValue) - /** @type {Number} */ (bValue);
      } else {
        return /** @type {Number} */ (aValue) + /** @type {Number} */ (bValue);
      }
    })
  );

  console.log(resultValues);

  return newMatrix(a.rows, a.cols, resultValues);
}
