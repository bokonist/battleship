import "../styles/EnemyBoard.css";
import { cellStates } from "../game/typeDefinitions.d";
import INITALCELL from "../assets/initial_cell.png";
import DESTROYEDCELL from "../assets/destroyed_cell.png";
import MISSEDCELL from "../assets/missed_cell.png";

import { useState } from "react";
import { EnemyBoard } from "../game/modules/EnemyBoard";
interface Props {}
const EnemyBoardComponent: React.FC<Props> = (props) => {
  const [enemyBoard] = useState(EnemyBoard.getGrid());
  const [isBoardActive, enableBoard] = useState(true);
  return (
    <div className="gameboard">
      {enemyBoard.map((row, i) => {
        return row.map((cell, j) => {
          return (
            <div key={`${i}-${j}`} data-position={`${i}-${j}`}>
              {cell === cellStates.INITIAL ? (
                <img
                  alt="inital cell"
                  src={INITALCELL}
                  className="gameboard-cell"
                ></img>
              ) : cell === cellStates.MISSED ? (
                <img
                  alt="inital cell"
                  src={MISSEDCELL}
                  className="gameboard-cell"
                ></img>
              ) : cell === cellStates.DESTROYED ? (
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
export { EnemyBoardComponent };
