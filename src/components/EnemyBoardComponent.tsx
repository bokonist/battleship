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
          let className: string = "initial-cell gameboard-cell";
          switch (cell) {
            case cellStates.DESTROYED: {
              className = "destroyed-cell gameboard-cell";
              break;
            }
            case cellStates.MISSED: {
              className = "missed-cell gameboard-cell";
              break;
            }
            case cellStates.INITIAL: {
              className = "initial-cell gameboard-cell clickable-cell";
            }
          }

          return (
            <div
              key={`${i}-${j}`}
              data-position={`${i}-${j}`}
              className={className}
              onClick={() => {
                handleClick(i, j);
              }}
            >
              {className === "destroyed-cell gameboard-cell" ? (
                <img src={DESTROYEDCELL} alt="destroyed cell"></img>
              ) : null}
            </div>
          );
        });
      })}
    </div>
  );
};
export { EnemyBoardComponent };
