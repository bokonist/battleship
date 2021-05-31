import {
  HitResults,
  cellStates,
  Orientation,
  ShipType,
  CellType,
} from "../typeDefinitions.d";

const GameBoard = (() => {
  const GRID_ROWS = 50;
  const GRID_COLUMNS = 50;
  let ships: ShipType[] = []; //array to hold the ships on the board
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
  let grid: CellType[][] = [];
  const resetGrid = () => {
    grid = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      const row: CellType[] = [];
      for (let j = 0; j < GRID_COLUMNS; j++) {
        const pos: [number, number] = [i, j]; // required for casting [i,j] to a typescipt tuple
        row.push({
          position: pos,
          shipID: 0,
          cellState: cellStates.INITIAL,
        });
      }
      grid.push(row);
    }
  };
  resetGrid();

  const hit = (position: [number, number]) => {
    let successfulHit = false;
    if (
      grid[position[0]][position[1]].cellState === cellStates.MISSED ||
      grid[position[0]][position[1]].cellState === cellStates.DESTROYED
    ) {
      return HitResults.INVALID_POSITION;
    }
    ships.reduce((damagedShip: null | ShipType, ship) => {
      if (ship.body.includes(position) && !ship.hitArray.includes(position)) {
        successfulHit = true;
        damagedShip = ship;
        ship.hitArray.push(position);
      }
      return damagedShip;
    }, null);
    if (successfulHit) {
      return HitResults.SUCCESS;
    } else {
      return HitResults.FAILURE;
    }
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
  const checkNeighborsForConflict = (
    grid: CellType[][],
    currentCell: [number, number],
    shipID: number
  ) => {
    let conflicted = false;
    neighbors.forEach((neighbor) => {
      let neighborI = neighbor[0] + currentCell[0];
      let neighborJ = neighbor[1] + currentCell[1];
      if (
        neighborI > 0 &&
        neighborJ > 0 &&
        neighborI < GRID_ROWS &&
        neighborJ < GRID_COLUMNS &&
        grid[neighborI][neighborJ].shipID !== 0 &&
        grid[neighborI][neighborJ].shipID !== shipID
      ) {
        //neighbor is within grid bounds, but is conflicting with another placed ship
        conflicted = true;
      }
    });
    return conflicted;
  };
  const checkAndPlaceShip = (grid: CellType[][], ship: ShipType) => {
    let gridClone = deepClone(grid);
    let currentCell: [number, number] = [0, 0];
    currentCell[0] = ship.position[0];
    currentCell[1] = ship.position[1];
    let isShipPlaceable = true;
    if (ship.orientation === Orientation.SIDEWAYS) {
      for (let i = 0; i < ship.length; i++) {
        //trying to place the entire ship cell by cell
        currentCell[0] = ship.body[i][0];
        currentCell[1] = ship.body[i][1];
        if (
          currentCell[0] < 0 ||
          currentCell[0] >= GRID_ROWS ||
          currentCell[1] < 0 ||
          currentCell[1] >= GRID_COLUMNS
        ) {
          //ship's body is out of bounds
          isShipPlaceable = false;
          return isShipPlaceable;
        }
        if (!checkNeighborsForConflict(gridClone, currentCell, ship.id)) {
          // no conflicts with neighboring cells
          gridClone[currentCell[0]][currentCell[1]].shipID = ship.id;
        } else {
          isShipPlaceable = false;
          return isShipPlaceable;
        }
      }
    } else if (ship.orientation === Orientation.UPRIGHT) {
      for (let i = 0; i < ship.length; i++) {
        //trying to place the entire ship cell by cell
        currentCell[0] = ship.body[i][0];
        currentCell[1] = ship.body[i][1];
        if (
          currentCell[0] < 0 ||
          currentCell[0] >= GRID_ROWS ||
          currentCell[1] < 0 ||
          currentCell[1] >= GRID_COLUMNS
        ) {
          //ship's body is out of bounds
          isShipPlaceable = false;
          return isShipPlaceable;
        }
        if (!checkNeighborsForConflict(gridClone, currentCell, ship.id)) {
          // no conflicts with neighboring cells
          gridClone[currentCell[0]][currentCell[1]].shipID = ship.id;
        } else {
          isShipPlaceable = false;
          return isShipPlaceable;
        }
      }
    }
    if (isShipPlaceable) {
      grid = gridClone;
    }
    return isShipPlaceable;
  };
  const placeNewShip = (ship: ShipType) => {
    if (checkAndPlaceShip(grid, ship)) {
      ships.push(ship);
      return true; //success
    } else {
      return false; //failure
    }
  };

  return {
    placeNewShip,
    hit,
  };
})();

export { GameBoard };
