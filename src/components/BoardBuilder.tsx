import { Stage, Layer, Rect, Text, KonvaNodeComponent } from "react-konva";
import Konva from "konva";
import { GameBoard } from "../game/modules/GameBoard";
import "../styles/BoardBuilder.css";
import { Orientation } from "../game/typeDefinitions.d";
import { MutableRefObject, useRef, useState } from "react";
import { LayerConfig } from "konva/lib/Layer";
GameBoard.randomSetup();

interface Props {}
const BoardBuilder: React.FC<Props> = (props) => {
  const StageRef = useRef(null);
  const LayerRef = useRef<Konva.Layer>(null);
  const [triggerBit, setTriggerUpdate] = useState(true);
  const snapToNearestCell = (ship: any) => {
    ship.position({ x: ship.x(), y: ship.y() });
  };
  return (
    <Stage ref={StageRef} height={800} width={800}>
      <Layer ref={LayerRef}>
        <Text
          fontSize={20}
          text="drag and drop ships to grid, click on ship to change orientation"
          align="center"
          draggable
        ></Text>
        {GameBoard.getViewForEnemy().map((row, i) =>
          row.map((cell, j) => {
            return (
              <Rect
                key={`${i}-${j}-cell`}
                x={i * 16 * 3 + 5}
                y={j * 16 * 3 + 5}
                width={16 * 3}
                height={16 * 3}
                fill="black"
                draggable
                _useStrictMode
              ></Rect>
            );
          })
        )}
        {GameBoard.getShips().map((ship, i) => {
          return (
            <Rect
              key={`${i}-ship`}
              x={i * 16 + 16 * 3 * 4}
              y={700}
              height={
                ship.orientation === Orientation.UPRIGHT
                  ? 16 * 3 * ship.length
                  : 16 * 3
              }
              width={
                ship.orientation === Orientation.SIDEWAYS
                  ? 16 * 3 * ship.length
                  : 16 * 3
              }
              fill="red"
              draggable
              onClick={(e) => {
                if (ship.orientation === Orientation.SIDEWAYS) {
                  ship.orientation = Orientation.UPRIGHT;
                } else {
                  ship.orientation = Orientation.SIDEWAYS;
                }
                //console.log(GameBoard.getShips());
                if (LayerRef && LayerRef.current !== null)
                  LayerRef.current.draw();
                setTriggerUpdate(!triggerBit);
              }}
              onDragEnd={(e) => {
                snapToNearestCell(e.target);
              }}
            ></Rect>
          );
        })}
      </Layer>
    </Stage>
  );
};
export { BoardBuilder };
