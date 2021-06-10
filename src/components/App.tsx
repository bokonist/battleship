import { useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeSwitcher from "./utility-components/ThemeSwitcher";
import "../styles/App.css";
import socket from "../connections/socketConnection";

import { GameBoardComponent } from "./GameBoardComponent";
import { EnemyBoardComponent } from "./EnemyBoardComponent";
import { GameInfo } from "./GameInfo";
import { GameController } from "../game/modules/GameController";
import { EnemyBoard } from "../game/modules/EnemyBoard";
import { GameBoard } from "../game/modules/GameBoard";

function App() {
  let [theme, setTheme] = useState(true);
  let [enemyBoardString, setEnemyBoardString] = useState(
    EnemyBoard.getGrid().toString()
  );
  let [boardString, setBoardString] = useState(
    GameBoard.getViewForEnemy().toString()
  );
  const toggleTheme = () => {
    setTheme(!theme);
  };
  useEffect(() => {
    socket.on("connection-details", (playerNumber) => {
      console.log(`You are player #${playerNumber}`);
    });
    socket.on("enemy-details", (enemyPlayerID) => {
      console.log(`You are ${socket.id} and your enemy is ${enemyPlayerID}`);
    });
    socket.on("receiveAttack", (position) => {
      GameController.receiveAttack(position);
      setBoardString(GameBoard.getViewForEnemy().toString());
    });
    socket.on("receiveEnemyView", (enemyGrid) => {
      GameController.updateEnemyBoard(enemyGrid);
      setEnemyBoardString(EnemyBoard.getGrid().toString());
    });
    socket.on("server-message", (message) => {
      console.log(message);
    });
    return () => {
      socket.close();
    };
  }, []);
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeSwitcher toggleTheme={toggleTheme} />
      <div className={"App" + (theme ? "-dark" : "-light")}>
        <GameBoardComponent boardString={boardString}></GameBoardComponent>
        <GameInfo></GameInfo>
        <EnemyBoardComponent
          enemyBoardString={enemyBoardString}
        ></EnemyBoardComponent>
        <div className="attributions">
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
