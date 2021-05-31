import { ShipFactory } from "../game/factories/ShipFactory";
import { Orientation } from "../game/typeDefinitions.d";

it("default ship settings", () => {
  let ship1 = ShipFactory(3, [0, 0], Orientation.SIDEWAYS);
  expect(ship1.body.length).toBe(3);
  const expected = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];
  expect(ship1.body).toEqual(expect.arrayContaining(expected));
  expect(ship1.hitArray.length).toBe(0);
  expect(ship1.isSunk()).toBe(false);

  let ship2 = ShipFactory(3, [0, 0], Orientation.UPRIGHT);
  expect(ship2.body.length).toBe(3);
  const expected2 = [
    [0, 0],
    [1, 0],
    [2, 0],
  ];
  expect(ship2.body).toEqual(expect.arrayContaining(expected2));
  expect(ship2.hitArray.length).toBe(0);
  expect(ship2.isSunk()).toBe(false);

  let ship3 = ShipFactory(3, [1, 5], Orientation.UPRIGHT);
  expect(ship2.body.length).toBe(3);
  const expected3 = [
    [1, 5],
    [2, 5],
    [3, 5],
  ];
  expect(ship3.body).toEqual(expect.arrayContaining(expected3));
  expect(ship3.hitArray.length).toBe(0);
  expect(ship3.isSunk()).toBe(false);

  let ship4 = ShipFactory(3, [1, 5], Orientation.SIDEWAYS);
  expect(ship4.body.length).toBe(3);
  const expected4 = [
    [1, 5],
    [1, 6],
    [1, 7],
  ];
  expect(ship4.body).toEqual(expect.arrayContaining(expected4));
  expect(ship4.hitArray.length).toBe(0);
  expect(ship4.isSunk()).toBe(false);
});

it("out of bounds ship settings", () => {
  let ship1 = ShipFactory(-22, [-11, -50], Orientation.SIDEWAYS);
  expect(ship1.body.length).toBe(1);
  const expected1 = [[0, 0]];
  expect(ship1.body).toEqual(expect.arrayContaining(expected1));
  expect(ship1.hitArray.length).toBe(0);
  expect(ship1.isSunk()).toBe(false);
});
