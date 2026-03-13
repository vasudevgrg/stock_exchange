import { useEffect, useState } from "react";

interface UseWebSocketResult {
  messages: string[];
  sendMessage: (message: string) => void;
}

const useWebSocket = (url: string): UseWebSocketResult => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    console.log('socket: ', socket);
    setWs(socket);

    ws?.send("message", {action: "subscribe", market:"TATA/INR"})

    socket.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = async (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
