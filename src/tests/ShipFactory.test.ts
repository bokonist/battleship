import { ShipFactory } from "../game/factories/ShipFactory";
import { Orientation } from "../game/typeDefinitions.d";

describe("default ship settings", () => {
  it("size 3 ship sideways body test", () => {
    let ship = ShipFactory(3, [0, 0], Orientation.SIDEWAYS);
    expect(ship.body.length).toBe(3);
    const expected = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    expect(ship.body).toEqual(expect.arrayContaining(expected));
    expect(ship.hitArray.length).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  it("size 3 ship upright body test", () => {
    let ship = ShipFactory(3, [0, 0], Orientation.UPRIGHT);
    expect(ship.body.length).toBe(3);
    const expected = [
      [0, 0],
      [1, 0],
      [2, 0],
    ];
    expect(ship.body).toEqual(expect.arrayContaining(expected));
    expect(ship.hitArray.length).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });
  it("size 3 ship upright middle of the board placement body test", () => {
    let ship = ShipFactory(3, [1, 5], Orientation.UPRIGHT);
    expect(ship.body.length).toBe(3);
    const expected = [
      [1, 5],
      [2, 5],
      [3, 5],
    ];
    expect(ship.body).toEqual(expect.arrayContaining(expected));
    expect(ship.hitArray.length).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });
  it("size 3 ship sideways middle of the board placement body test", () => {
    let ship = ShipFactory(3, [1, 5], Orientation.SIDEWAYS);
    expect(ship.body.length).toBe(3);
    const expected = [
      [1, 5],
      [1, 6],
      [1, 7],
    ];
    expect(ship.body).toEqual(expect.arrayContaining(expected));
    expect(ship.hitArray.length).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });
});
it("out of bounds ship settings", () => {
  let ship = ShipFactory(-22, [-11, -50], Orientation.SIDEWAYS);
  expect(ship.body.length).toBe(1);
  const expected = [[0, 0]];
  expect(ship.body).toEqual(expect.arrayContaining(expected));
  expect(ship.hitArray.length).toBe(0);
  expect(ship.isSunk()).toBe(false);
});
describe("ship neighbor count tests", () => {
  it("ship neighbor count ship size 1", () => {
    let ship = ShipFactory(1, [11, 5], Orientation.SIDEWAYS);
    expect(ship.body.length).toBe(1);
    expect(ship.hitArray.length).toBe(0);
    expect(ship.isSunk()).toBe(false);
    expect(ship.neighbors.size).toBe(8);
  });

  it("ship neighbor count sideways", () => {
    let ship = ShipFactory(3, [11, 5], Orientation.SIDEWAYS);
    expect(ship.body.length).toBe(3);
    expect(ship.hitArray.length).toBe(0);
    expect(ship.isSunk()).toBe(false);
    expect(ship.neighbors.size).toBe(12);
  });

  it("ship neighbor count upright", () => {
    let ship = ShipFactory(3, [11, 5], Orientation.UPRIGHT);
    expect(ship.body.length).toBe(3);
    expect(ship.hitArray.length).toBe(0);
    expect(ship.isSunk()).toBe(false);
    expect(ship.neighbors.size).toBe(12);
  });
});
