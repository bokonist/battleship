import { Orientation } from "../typeDefinitions.d";

const ShipFactory = (
  length: number,
  position: [number, number],
  orientation: Orientation
) => {
  length = length > 0 ? length : 1;
  let shipLength = length;
  position[0] = position[0] >= 0 ? position[0] : 0;
  position[1] = position[1] >= 0 ? position[1] : 0;

  let shipPosition = position; //will hold starting position coordinates of the ship
  let shipOrientation = orientation;
  let shipHitArray: [number, number][] = []; // will hold positions where ship is hit
  let shipBody: [number, number][] = [];
  let shipNeighbors: Set<string> = new Set();
  const setup = () => {
    for (let i = 0; i < length; i++) {
      if (orientation === Orientation.SIDEWAYS) {
        shipBody.push([shipPosition[0], shipPosition[1] + i]);
      } else if (orientation === Orientation.UPRIGHT) {
        shipBody.push([shipPosition[0] + i, shipPosition[1]]);
      }
    }
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

    shipBody.forEach((cell) => {
      let currentNeighbor = [0, 0];
      currentNeighbor[0] = cell[0];
      currentNeighbor[1] = cell[1];
      neighbors.forEach((neighbor) => {
        currentNeighbor[0] = neighbor[0] + cell[0];
        currentNeighbor[1] = neighbor[1] + cell[1];
        shipNeighbors.add(currentNeighbor.toString());
        //    console.log(shipNeighbors);
      });
    });

    shipBody.forEach((cell) => {
      shipNeighbors.delete(cell.toString());
    });
  };
  setup();
  const isSunk = () => {
    return shipHitArray.length === length;
  };
  return {
    id: Math.floor(Math.random() * 1000) + 1,
    length: shipLength,
    position: shipPosition,
    body: shipBody,
    neighbors: shipNeighbors,
    orientation: shipOrientation,
    isSunk: isSunk,
    hitArray: shipHitArray,
  };
};

export { ShipFactory };
