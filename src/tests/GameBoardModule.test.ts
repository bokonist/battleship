import { GameBoardModule } from "../game/Modules";
import { ShipFactory } from "../game/factories";
import { Orientation } from "../game/typeDefinitions.d";

it("default game board", () => {
  let ship1 = ShipFactory(3, [0, 0], Orientation.SIDEWAYS);
  expect(GameBoardModule.placeNewShip(ship1)).toBe(true);
});

it("ship placements", () => {
  let ship1 = ShipFactory(3, [49, 0], Orientation.SIDEWAYS);
  expect(GameBoardModule.placeNewShip(ship1)).toBe(true);

  let ship2 = ShipFactory(3, [49, 0], Orientation.UPRIGHT);
  expect(GameBoardModule.placeNewShip(ship2)).toBe(false);

  let ship3 = ShipFactory(3, [0, 49], Orientation.SIDEWAYS);
  expect(GameBoardModule.placeNewShip(ship3)).toBe(false);

  let ship4 = ShipFactory(-100, [25, 25], Orientation.SIDEWAYS);
  expect(GameBoardModule.placeNewShip(ship4)).toBe(true);
});
