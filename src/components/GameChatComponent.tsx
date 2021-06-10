import "../styles/GameChat.css";
import socket from "../connections/socketConnection";
import { useEffect, useRef, useState } from "react";

interface Props {
  userName: string;
  updateUserName: (newusername: string) => void;
}
const GameChatComponent: React.FC<Props> = (props) => {
  const { userName, updateUserName } = props;
  const messageBoxRef = useRef<HTMLInputElement>(null);
  const userNameTextRef = useRef<HTMLInputElement>(null);
  const [messageLog, setMessageLog] = useState([
    { author: "Server", message: "You can chat here!" },
  ]);

  useEffect(() => {
    socket.on("chat-message", (message) => {
      if (messageLog.length > 8) {
        messageLog.shift();
      }
      setMessageLog([...messageLog, message]);
    });
    socket.on("server-message", (message) => {
      if (messageLog.length > 8) {
        messageLog.shift();
      }
      setMessageLog([...messageLog, message]);
    });
    return () => {
      socket.off("chat-message");
      socket.off("server-message");
    };
  }, [messageLog]);
  const sendMessage = () => {
    let message: Object;
    if (messageBoxRef.current !== null && messageBoxRef.current.value !== "") {
      message = { author: userName, message: messageBoxRef.current.value };
      socket.emit("chat-message", message);
      messageBoxRef.current.value = "";
    }
  };
  const changeUserName = () => {
    let newUserName = userNameTextRef.current
      ? userNameTextRef.current.value
      : userName;
    let message = { author: userName, message: "" };
    if (newUserName !== "" && newUserName !== "Server") {
      message = {
        author: userName,
        message: "I just changed my username to " + newUserName,
      };
      updateUserName(newUserName);
      socket.emit("chat-message", message);
    }
    if (userNameTextRef.current) {
      if (newUserName === "Server") {
        socket.emit("chat-message", {
          author: userName,
          message:
            "I tried changing my name to Server, but the server didn't let me, I'm a dummy",
        });
      }
      userNameTextRef.current.value = "";
    }
  };
  return (
    <div className="game-chat">
      <div className="chat-log">
        {messageLog.map((message, index) => {
          return (
            <div
              key={index}
              className={
                message.author === "Server"
                  ? "server-message chat-message"
                  : "user-message chat-message"
              }
            >
              <span className="message-author">{message.author}: </span>
              <span className="message-content">{message.message}</span>
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
      <div className="update-username">
        <input ref={userNameTextRef} type="text"></input>
        <button
          className="change-username-button"
          onClick={() => {
            changeUserName();
          }}
        >
          Change Username
        </button>
      </div>
    </div>
  );
};

export { GameChatComponent };
