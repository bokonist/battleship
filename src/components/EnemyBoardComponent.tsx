import "../styles/EnemyBoard.css";
import { cellStates } from "../game/typeDefinitions.d";
import INITALCELL from "../assets/initial_cell.png";
import DESTROYEDCELL from "../assets/destroyed_cell.png";
import MISSEDCELL from "../assets/missed_cell.png";

import { EnemyBoard } from "../game/modules/EnemyBoard";
import { GameController } from "../game/modules/GameController";
interface Props {
  enemyBoardString: string;
}
const EnemyBoardComponent: React.FC<Props> = (props) => {
  const enemyBoard = EnemyBoard.getGrid();
  const handleClick = (posX: number, posY: number) => {
    GameController.sendAttack(posX, posY);
  };
  return (
    <div className="gameboard">
      {enemyBoard.map((row, i) => {
        return row.map((cell, j) => {
          return (
            <div
              key={`${i}-${j}-${cell}`}
              data-position={`${i}-${j}`}
              onClick={() => handleClick(i, j)}
            >
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
