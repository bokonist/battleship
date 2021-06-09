import socket from "../../connections/socketConnection";
import { GameBoard } from "./GameBoard";
import { EnemyBoard } from "./EnemyBoard";
const GameController = (() => {
  const sendAttack = (posX: number, posY: number) => {
    socket.emit("sendAttack", [posX, posY]);
  };
  const receiveAttack = (position: [number, number]) => {
    GameBoard.hit(position);
    socket.emit("sendEnemyView", GameBoard.getViewForEnemy());
  };
  const updateEnemyBoard = (grid: number[][]) => {
    EnemyBoard.setGrid(grid);
    console.log("My enemy's grid is currenly ", EnemyBoard.getGrid());
  };
  return {
    sendAttack,
    receiveAttack,
    updateEnemyBoard,
  };
})();

export { GameController };
