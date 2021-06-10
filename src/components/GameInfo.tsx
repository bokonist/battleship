import "../styles/GameInfo.css";
import socket from "../connections/socketConnection";
import { useEffect, useRef, useState } from "react";

interface Props {}
const GameInfo: React.FC<Props> = (props) => {
  const messageBoxRef = useRef<HTMLInputElement>(null);
  const [messageLog, setMessageLog] = useState([
    { author: "Server", message: "You can chat here!" },
  ]);

  useEffect(() => {
    socket.on("chat-message", (message) => {
      setMessageLog([...messageLog, message]);
    });
    socket.on("server-message", (message) => {
      setMessageLog([...messageLog, message]);
    });
  }, [messageLog]);
  const sendMessage = () => {
    let message: Object;
    if (messageBoxRef.current !== null && messageBoxRef.current.value !== "") {
      message = { author: socket.id, message: messageBoxRef.current.value };
      socket.emit("chat-message", message);
      messageBoxRef.current.value = "";
    }
  };
  return (
    <div>
      <div className="chat-log">
        {messageLog.map((message, index) => {
          return (
            <div key={index}>
              <div className="message-author">{message.author}</div>
              <div className="message-content">{message.message}</div>
            </div>
          );
        })}
      </div>
      <div className="compose-message">
        <input ref={messageBoxRef} type="text"></input>
        <button
          className="send-message-button"
          onClick={() => {
            sendMessage();
          }}
        >
          Send message
        </button>
      </div>
    </div>
  );
};

export { GameInfo };
