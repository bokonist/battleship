import "../styles/GameBoard.css";
import { cellStates } from "../game/typeDefinitions.d";
import { GameBoard } from "../game/modules/GameBoard";
import DESTROYEDCELL from "../assets/destroyed_cell.png";

interface Props {
  boardString: string;
}

const GameBoardComponent: React.FC<Props> = (props) => {
  const gameBoard = GameBoard.getGrid();
  GameBoard.randomSetup();
  return (
    <div className="gameboard">
      {gameBoard.map((row, i) => {
        return row.map((cell, j) => {
          let className: string = "initial-cell gameboard-cell";
          switch (cell.cellState) {
            case cellStates.DESTROYED: {
              className = "destroyed-cell gameboard-cell";
              break;
            }
            case cellStates.MISSED: {
              className = "missed-cell gameboard-cell";
              break;
            }
            case cellStates.INITIAL: {
              className = "initial-cell gameboard-cell";
            }
          }
          if (cell.shipID > 0 && cell.cellState !== cellStates.DESTROYED) {
            className = "ship-cell gameboard-cell";
          }
          return (
            <div
              key={`${i}-${j}`}
              data-position={`${i}-${j}`}
              className={className}
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

export { GameBoardComponent };
