import { createArray, deepCloneArray } from "$lib/utils";

/**
 * @param {String} message
 */
export function matrixError(message) {
  const error = new Error(message);
  error.name = "MatrixError";
  return error;
}

/** @type {import('./types/matrix').MatrixCellConstructor} */
export function newMatrixCell(row, col, value) {
  return {
    row,
    col,
    value,
  };
}

/** @type {import('./types/matrix').MatrixArrayConstructor} */
export function createMatrixArray(rows, cols, values) {
  const arr = [];
  for (let row = 1; row <= rows; row++) {
    const rowArr = [];
    for (let col = 1; col <= cols; col++) {
      const value = values && values.length >= row && values[0].length >= col
        ? values[row - 1][col - 1]
        : null;
      rowArr.push(newMatrixCell(row, col, value));
    }
    arr.push(rowArr);
  }
  return arr;
}

/** @type {import('./types/matrix').MatrixConstructor} */
export function newMatrix(rows, cols, values) {
  const valuesArr = createMatrixArray(rows, cols, values);

  return ({
    rows,
    cols,
    values: valuesArr,
    getCellAt(row, col) {
      if ((row < 1 && row > rows) || (col < 1 && col > cols)) {
        throw matrixError(
          `Row or Col is not within order (${this.rows}, ${this.cols})`,
        );
      }
      return this.values[row - 1][col - 1];
    },
    getValueAt(row, col) {
      if ((row < 1 && row > rows) || (col < 1 && col > cols)) {
        throw matrixError(
          `Row or Col is not within order (${this.rows}, ${this.cols})`,
        );
      }
      return this.values[rows - 1][cols - 1].value;
    },
    getValuesArray() {
      return this.values.map((row) => row.map((cell) => cell.value));
    },
    setValueAt(row, col, value) {
      if ((row < 1 && row > rows) || (col < 1 && col > cols)) {
        throw matrixError(
          `Row or Col is not within order (${this.rows}, ${this.cols})`,
        );
      }

      this.values[row - 1][col - 1].value = value;
    },
    resize(rows, cols) {
      const matrix = newMatrix(rows, cols, this.getValuesArray());
      return matrix;
    },
  });
}
