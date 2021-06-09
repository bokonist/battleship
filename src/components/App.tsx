import { useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeSwitcher from "./utility-components/ThemeSwitcher";
import "../styles/App.css";
import socket from "../connections/socketConnection";

import { GameBoardComponent } from "./GameBoardComponent";
import { EnemyBoardComponent } from "./EnemyBoardComponent";
import { GameInfo } from "./GameInfo";
import { GameController } from "../game/modules/GameController";

function App() {
  let [theme, setTheme] = useState(true);
  const toggleTheme = () => {
    setTheme(!theme);
  };
  useEffect(() => {
    socket.on("connection-details", (playerNumber) => {
      console.log(`You are player #${playerNumber}`);
    });
    socket.on("enemy-details", (data) => {
      console.log(`You are ${socket.id} and your enemy is ${data}`);
    });
    socket.on("receiveAttack", (position) => {
      let [x, y] = position.split(",");
      console.log(x, y);
      x = Number(x);
      y = Number(y);
      GameController.receiveAttack(x, y);
    });
    socket.on("receiveEnemyView", (enemyGrid) => {
      console.log(enemyGrid);
      GameController.updateEnemyBoard(enemyGrid);
    });
    return () => {
      socket.close();
    };
  }, []);
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeSwitcher toggleTheme={toggleTheme} />
      <div className={"App" + (theme ? "-dark" : "-light")}>
        <GameBoardComponent></GameBoardComponent>
        <GameInfo></GameInfo>
        <EnemyBoardComponent></EnemyBoardComponent>
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
