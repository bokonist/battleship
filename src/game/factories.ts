//
const ShipFactory = (
  length: number,
  position: [number, number],
  orientation: Orientation
) => {
  let shipLength = length;
  let shipPosition = position; //will hold starting position coordinates of the ship
  let shipOrientation = orientation;
  let shipHitArray: [number, number][] = []; // will hold positions where ship is hit
  let shipBody: [number, number][] = [];
  for (let i = 0; i < length; i++) {
    if (orientation === Orientation.SIDEWAYS) {
      shipBody.push([shipPosition[0], shipPosition[1] + i]);
    } else if (orientation === Orientation.UPRIGHT) {
      shipBody.push([shipPosition[0] + i, shipPosition[1]]);
    }
  }

  const isSunk = () => {
    return shipHitArray.length === length;
  };
  return {
    id: Math.floor(Math.random() * 1000) + 1,
    length: shipLength,
    position: shipPosition,
    body: shipBody,
    orientation: shipOrientation,
    isSunk: isSunk,
    hitArray: shipHitArray,
  };
};

export { ShipFactory };
