import "../styles/GameBoard.css";
import { cellStates } from "../game/typeDefinitions.d";
import { GameBoard } from "../game/modules/GameBoard";
import { useState } from "react";
import INITALCELL from "../assets/initial_cell.png";
import DESTROYEDCELL from "../assets/destroyed_cell.png";
import MISSEDCELL from "../assets/missed_cell.png";
import SHIPCELL from "../assets/ship_cell.png";

interface Props {}

const GameBoardComponent: React.FC<Props> = (props) => {
  const [gameBoard] = useState(GameBoard.getGrid());
  GameBoard.randomSetup();
  return (
    <div className="gameboard">
      {gameBoard.map((row, i) => {
        return row.map((cell, j) => {
          return (
            <div key={`${i}-${j}`} data-position={`${i}-${j}`}>
              {cell.shipID > 0 ? (
                <img
                  alt="inital cell"
                  src={SHIPCELL}
                  className="gameboard-cell"
                ></img>
              ) : cell.cellState === cellStates.INITIAL ? (
                <img
                  alt="inital cell"
                  src={INITALCELL}
                  className="gameboard-cell"
                ></img>
              ) : cell.cellState === cellStates.MISSED ? (
                <img
                  alt="inital cell"
                  src={MISSEDCELL}
                  className="gameboard-cell"
                ></img>
              ) : cell.cellState === cellStates.DESTROYED ? (
                <img
                  alt="inital cell"
                  src={DESTROYEDCELL}
                  className="gameboard-cell"
                ></img>
              ) : null}
            </div>
          );
        });
      })}
    </div>
  );
};

export { GameBoardComponent };
