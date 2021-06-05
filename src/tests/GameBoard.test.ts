import { GameBoard } from "../game/modules/GameBoard";
import { ShipFactory } from "../game/factories/ShipFactory";
import { HitResults, Orientation } from "../game/typeDefinitions.d";

afterEach(() => {
  GameBoard.resetGrid();
  GameBoard.clearShips();
});

it("default game board", () => {
  let ship = ShipFactory(3, [0, 0], Orientation.SIDEWAYS);
  expect(GameBoard.placeNewShip(ship)).toBe(true);
});
describe("ship placements", () => {
  it("ship placements - super large ship, sideways", () => {
    let ship = ShipFactory(100, [25, 25], Orientation.SIDEWAYS);
    expect(GameBoard.placeNewShip(ship)).toBe(false);
  });
  it("ship placements - super large ship, upright", () => {
    let ship = ShipFactory(100, [25, 25], Orientation.UPRIGHT);
    expect(GameBoard.placeNewShip(ship)).toBe(false);
  });
  it("ship placements - within bounds, sideways", () => {
    let ship = ShipFactory(3, [49, 0], Orientation.SIDEWAYS);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
  });
  it("ship placements - out of bounds, sideways", () => {
    let ship = ShipFactory(3, [0, 49], Orientation.SIDEWAYS);
    expect(GameBoard.placeNewShip(ship)).toBe(false);
  });
  it("ship placements - within bounds, upright", () => {
    let ship = ShipFactory(3, [25, 0], Orientation.UPRIGHT);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
  });
  it("ship placements - out of bounds, upright", () => {
    let ship = ShipFactory(3, [49, 0], Orientation.UPRIGHT);
    expect(GameBoard.placeNewShip(ship)).toBe(false);
  });
});
describe("add and remove ships", () => {
  it("gameboard - getShips() test", () => {
    expect(GameBoard.getShips().length).toBe(0);
    let ship = ShipFactory(3, [25, 0], Orientation.UPRIGHT);
    let ship2 = ShipFactory(3, [49, 0], Orientation.SIDEWAYS);
    GameBoard.placeNewShip(ship);
    GameBoard.placeNewShip(ship2);
    expect(GameBoard.getShips().length).toBe(2);
  });
  it("gameboard - remove ship", () => {
    let ship = ShipFactory(3, [25, 0], Orientation.UPRIGHT);
    let ship2 = ShipFactory(3, [49, 0], Orientation.SIDEWAYS);
    GameBoard.placeNewShip(ship);
    GameBoard.placeNewShip(ship2);
    expect(GameBoard.getShips().length).toBe(2);
    GameBoard.removeShip(ship2.id);
    expect(GameBoard.getShips().length).toBe(1);
  });
});
describe("conflicting ships tests", () => {
  it("gameboard - conflicting ships sideways overlap", () => {
    let ship = ShipFactory(3, [25, 0], Orientation.SIDEWAYS);
    let ship2 = ShipFactory(3, [26, 0], Orientation.SIDEWAYS);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
    expect(GameBoard.placeNewShip(ship2)).toBe(false);
    expect(GameBoard.getShips().length).toBe(1);
  });
  it("gameboard - conflicting ships upright overlap", () => {
    let ship = ShipFactory(3, [25, 25], Orientation.UPRIGHT);
    let ship2 = ShipFactory(3, [26, 25], Orientation.UPRIGHT);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
    expect(GameBoard.placeNewShip(ship2)).toBe(false);
    expect(GameBoard.getShips().length).toBe(1);
  });
  it("gameboard - conflicting ships cross overlap", () => {
    let ship = ShipFactory(3, [25, 25], Orientation.UPRIGHT);
    let ship2 = ShipFactory(3, [26, 25], Orientation.SIDEWAYS);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
    expect(GameBoard.placeNewShip(ship2)).toBe(false);
    expect(GameBoard.getShips().length).toBe(1);
  });
});
it("gameboard - clear ships", () => {
  let ship = ShipFactory(3, [0, 25], Orientation.UPRIGHT);
  let ship2 = ShipFactory(3, [26, 25], Orientation.SIDEWAYS);
  expect(GameBoard.placeNewShip(ship)).toBe(true);
  expect(GameBoard.placeNewShip(ship2)).toBe(true);
  expect(GameBoard.getShips().length).toBe(2);
  GameBoard.clearShips();
  expect(GameBoard.getShips().length).toBe(0);
});
describe("ship hit tests", () => {
  it("size 3 ship upright hit tests", () => {
    let ship = ShipFactory(3, [25, 25], Orientation.UPRIGHT);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
    expect(GameBoard.aliveShipCount()).toBe(1);
    GameBoard.hit(ship.body[0]);
    GameBoard.hit(ship.body[1]);
    GameBoard.hit(ship.body[2]);
    expect(GameBoard.aliveShipCount()).toBe(0);
    expect(GameBoard.safeCellCount()).toBe(2500 - 3 - 12);
  });
  it("size 3 ship sideways hit tests", () => {
    let ship = ShipFactory(3, [25, 25], Orientation.SIDEWAYS);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
    expect(GameBoard.aliveShipCount()).toBe(1);
    GameBoard.hit(ship.body[0]);
    GameBoard.hit(ship.body[1]);
    GameBoard.hit(ship.body[2]);
    expect(GameBoard.aliveShipCount()).toBe(0);
    expect(GameBoard.safeCellCount()).toBe(2500 - 3 - 12);
  });
  it("size 3 ship, edge of board, sideways hit tests", () => {
    let ship = ShipFactory(3, [0, 0], Orientation.SIDEWAYS);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
    expect(GameBoard.aliveShipCount()).toBe(1);
    GameBoard.hit(ship.body[0]);
    GameBoard.hit(ship.body[1]);
    GameBoard.hit(ship.body[2]);
    expect(GameBoard.aliveShipCount()).toBe(0);
    expect(GameBoard.safeCellCount()).toBe(2500 - 3 - 5);
  });
  it("size 3 ship, edge of board, upright hit tests", () => {
    let ship = ShipFactory(3, [0, 0], Orientation.UPRIGHT);
    expect(GameBoard.placeNewShip(ship)).toBe(true);
    expect(GameBoard.aliveShipCount()).toBe(1);
    GameBoard.hit(ship.body[0]);
    expect(GameBoard.aliveShipCount()).toBe(1);
    GameBoard.hit(ship.body[1]);
    GameBoard.hit(ship.body[2]);
    expect(GameBoard.aliveShipCount()).toBe(0);
    expect(GameBoard.safeCellCount()).toBe(2500 - 3 - 5);
  });
});
describe("missed hit tests", () => {
  it("empty board hits", () => {
    expect(GameBoard.hit([0, 0])).toBe(HitResults.MISSED);
    expect(GameBoard.hit([0, 0])).toBe(HitResults.INVALID_POSITION);
    expect(GameBoard.hit([0, 1])).toBe(HitResults.MISSED);
    expect(GameBoard.hit([0, 2])).toBe(HitResults.MISSED);
    expect(GameBoard.hit([0, 3])).toBe(HitResults.MISSED);
  });
});
it("placeholder", () => {});
it("placeholder2", () => {});
