import { useEffect, useState } from "react";

interface UseWebSocketResult {
  messages: string[];
  sendMessage: (message: string) => void;
}

const useWebSocket = (url: string): UseWebSocketResult => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`${url}?market_symbol=market1`);
    setWs(socket);

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

    await fetch("http://localhost:9000/publish", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        market_symbol: "market1",
      }),
    });
  };

  return { messages, sendMessage };
};

export default useWebSocket;
