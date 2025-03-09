import { useEffect, useState, useRef, useCallback } from "react";

const useWebSocket = (url: string, reconnectInterval: number = 5000) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return; // Prevent duplicate connections
    }

    console.log("Attempting WebSocket connection...");
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };

    ws.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      ws.close(); // Close to trigger reconnect
    };

    ws.onclose = () => {
      console.warn("WebSocket disconnected, retrying...");
      setIsConnected(false);
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, reconnectInterval); // Retry after delay
    };

    socketRef.current = ws;
  }, [url, reconnectInterval]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      socketRef.current?.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connectWebSocket]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("Cannot send message, WebSocket is not connected.");
    }
  };

  return { messages, sendMessage, isConnected };
};

export default useWebSocket;
