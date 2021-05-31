import { ShipFactory } from "../game/factories";
enum Orientation {
  SIDEWAYS,
  UPRIGHT,
}
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
});
