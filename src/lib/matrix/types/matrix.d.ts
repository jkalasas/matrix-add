export declare function MatrixArrayConstructor(
  rows: number,
  cols: number,
  values?: (number | null | undefined)[][]?,
): MatrixCell[][];

export declare function MatrixCellConstructor(
  row: number,
  col: number,
  value?: number?,
): MatrixCell;

export declare function MatrixConstructor(
  rows: number,
  cols: number,
  values?: (number | null | undefined)[][]?,
): Matrix;

export type MatrixCell = {
  row: number;
  col: number;
  value?: number?;
}

export type Matrix = {
  rows: number;
  cols: number;
  values: MatrixCell[][];
  getCellAt: (row: number, col: number) => MatrixCell;
  getValueAt: (row: number, col: number) => number | null | undefined;
  getValuesArray: () => (number | null | undefined)[][];
  setValueAt: (row: number, col: number, value: number | null | undefined) => void;
  resize: (rows: number, cols: number) => Matrix;
};
