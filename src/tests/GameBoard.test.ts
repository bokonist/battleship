import { GameBoard } from "../game/modules/GameBoard";
import { ShipFactory } from "../game/factories/ShipFactory";
import { Orientation } from "../game/typeDefinitions.d";

afterEach(() => {
  GameBoard.resetGrid();
  GameBoard.clearShips();
});

it("default game board", () => {
  let ship = ShipFactory(3, [0, 0], Orientation.SIDEWAYS);
  expect(GameBoard.placeNewShip(ship)).toBe(true);
});

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

it("gameboard - getShips() test", () => {
  expect(GameBoard.getShips().length).toBe(0);
  let ship = ShipFactory(3, [25, 0], Orientation.UPRIGHT);
  let ship2 = ShipFactory(3, [49, 0], Orientation.SIDEWAYS);
  GameBoard.placeNewShip(ship);
  GameBoard.placeNewShip(ship2);
  expect(GameBoard.getShips().length).toBe(2);
});
it("gameboard - ", () => {});
it("placeholder", () => {});
it("placeholder", () => {});
