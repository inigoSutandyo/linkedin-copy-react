import { useEffect, useState } from "react";
import { WsUrl } from "../utils/Server";


const useSocket = (id: number) => {
    const [socket, setSocket] = useState<WebSocket>()

    useEffect(() => {
      if (socket) {
        socket.close()
      }
      setSocket(new WebSocket(WsUrl(`/websocket?id=${id}`)) ) 
    }, [id])

    return socket
}

const connect = (socket: WebSocket) => {

    socket.onopen = () => {
        console.log("Successfully Connected");
    };

    socket.onmessage = msg => {
        console.log(JSON.parse(msg.data));
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };
}

const sendMsg = (msg: string, socket: WebSocket) => {
    console.log("sending msg: ", msg);
    socket.send(msg);
};

export {useSocket, connect, sendMsg}