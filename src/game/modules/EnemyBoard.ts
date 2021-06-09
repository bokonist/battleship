import { cellStates, EnemyCellType } from "../typeDefinitions.d";

const EnemyBoard = (() => {
  const GRID_ROWS = 10;
  const GRID_COLUMNS = 10;
  const getGrid = () => {
    return grid;
  };
  const neighbors = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ]; // utility neighbors array to use to calculate 8 neighbors of a given cell
  let grid: EnemyCellType[][] = [];
  const resetGrid = () => {
    grid = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      const row: EnemyCellType[] = [];
      for (let j = 0; j < GRID_COLUMNS; j++) {
        row.push({
          cellState: cellStates.INITIAL,
        });
      }
      grid.push(row);
    }
  };
  resetGrid();
  const setGrid = (myGrid: EnemyCellType[][]) => {
    grid = myGrid;
  };
  const deepClone = (grid: CellType[][]) => {
    let newGrid: CellType[][] = [];
    grid.forEach((row: CellType[], i: number) => {
      let col: CellType[] = [];
      row.forEach((cell, j) => {
        col.push(grid[i][j]);
      });
      newGrid.push(col);
      col = [];
    });
    return newGrid;
  };
  return {
    getGrid,
    setGrid,
  };
})();

export { EnemyBoard };
