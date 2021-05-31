enum Orientation {
  SIDEWAYS,
  UPRIGHT,
}
interface ShipType {
  id: number;
  length: number;
  position: [number, number];
  body: [number, number][];
  orientation: Orientation.UPRIGHT | Orientation.SIDEWAYS;
  isSunk: () => boolean;
  hitArray: [number, number][];
}

enum cellStates {
  INITIAL,
  MISSED,
  DESTROYED,
}

interface cellType {
  position: [number, number];
  shipID: number;
  cellState: cellStates.INITIAL | cellStates.MISSED | cellStates.DESTROYED;
}

enum HitResults {
  INVALID_POSITION,
  SUCCESS,
  FAILURE,
}

//export { HitResults, cellStates, cellType, ShipType, Orientation };
