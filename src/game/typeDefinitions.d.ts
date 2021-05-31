enum Orientation {
  SIDEWAYS,
  UPRIGHT,
}
type ShipType = {
  id: number;
  length: number;
  position: [number, number];
  body: [number, number][];
  orientation: Orientation.UPRIGHT | Orientation.SIDEWAYS;
  isSunk: () => boolean;
  hitArray: [number, number][];
};

enum cellStates {
  INITIAL,
  MISSED,
  DESTROYED,
}

type CellType = {
  position: [number, number];
  shipID: number;
  cellState: cellStates.INITIAL | cellStates.MISSED | cellStates.DESTROYED;
};

enum HitResults {
  INVALID_POSITION,
  SUCCESS,
  FAILURE,
}

export { HitResults, cellStates, Orientation, ShipType, CellType };
