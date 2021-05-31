const GameBoardModule = (() => {
  const GRID_ROWS = 50;
  const GRID_COLUMNS = 50;
  let ships: ShipType[] = []; //array to hold the ships on the board
  const operations = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 0],
  ]; // utility operations array to use to calculate 8 neighbors of a given cell
  let grid: cellType[][] = [];
  const resetGrid = () => {
    grid = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      const row: cellType[] = [];
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

  const deepClone = (grid: cellType[][]) => {
    let newGrid: cellType[][] = [];
    grid.forEach((row: cellType[], i: number) => {
      let col: cellType[] = [];
      row.forEach((cell, j) => {
        col.push(grid[i][j]);
      });
      newGrid.push(col);
      col = [];
    });
    return newGrid;
  };
  const checkAndPlaceShip = (grid: cellType[][], ship: ShipType) => {
    let gridClone = deepClone(grid);
    let currentCell: [number, number] = ship.position;
    if (ship.orientation === Orientation.SIDEWAYS) {
      for (let i = 0; i < ship.length; i++) {
        //trying to place the entire ship cell by cell
        currentCell[0] = ship.position[0] + i;
        currentCell[1] = ship.position[1];
        operations.forEach((operation) => {
          //checking all neighbors of this cell
          let newI = operation[0] + currentCell[0];
          let newJ = operation[1] + currentCell[1];
          if (newI > 0 && newJ > 0 && newI < GRID_ROWS && newJ < GRID_COLUMNS) {
            //neightbor is within bounds
            if (
              gridClone[newI][newJ].shipID === 0 ||
              gridClone[newI][newJ].shipID === ship.id
            ) {
              // empty neighbour or occupied by part of the ship we're trying to place
              gridClone[currentCell[0]][currentCell[1]].shipID = ship.id;
            } else {
              throw new Error(
                "Ship cannot be placed due to space conflict with another ship"
              );
            }
          }
        });
      }
    } else if (ship.orientation === Orientation.UPRIGHT) {
      for (let i = 0; i < ship.length; i++) {
        //trying to place the entire ship cell by cell
        currentCell[0] = ship.position[0];
        currentCell[1] = ship.position[1] + i;
        operations.forEach((operation) => {
          //checking all neighbors of this cell
          let newI = operation[0] + currentCell[0];
          let newJ = operation[1] + currentCell[1];
          if (newI > 0 && newJ > 0 && newI < GRID_ROWS && newJ < GRID_COLUMNS) {
            //neightbor is within bounds
            if (
              gridClone[newI][newJ].shipID === 0 ||
              gridClone[newI][newJ].shipID === ship.id
            ) {
              // empty neighbour or occupied by part of the ship we're trying to place
              gridClone[currentCell[0]][currentCell[1]].shipID = ship.id;
            } else {
              throw new Error(
                "Ship cannot be placed due to space conflict with another ship"
              );
            }
          }
        });
      }
    }
    grid = gridClone;
  };
  const placeNewShip = (ship: ShipType) => {
    try {
      checkAndPlaceShip(grid, ship);
      ships.push(ship);
      return true; //success
    } catch (e) {
      console.log(e.message);
      return false; //failure
    }
  };

  return {
    placeNewShip,
    hit,
  };
})();

export { GameBoardModule };
