import io from "socket.io-client";
let socket = io("http://127.0.0.1:4000");
export default socket;
