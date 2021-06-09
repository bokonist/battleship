import { cellStates } from "../typeDefinitions.d";

const EnemyBoard = (() => {
  const GRID_ROWS = 10;
  const GRID_COLUMNS = 10;
  const getGrid = () => {
    return grid;
  };
  let grid: number[][] = [];
  const resetGrid = () => {
    grid = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      const row: number[] = [];
      for (let j = 0; j < GRID_COLUMNS; j++) {
        row.push(cellStates.INITIAL);
      }
      grid.push(row);
    }
  };
  resetGrid();
  const setGrid = (myGrid: number[][]) => {
    grid = myGrid;
  };
  return {
    getGrid,
    setGrid,
  };
})();

export { EnemyBoard };
