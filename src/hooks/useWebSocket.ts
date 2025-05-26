import {useCallback, useEffect, useRef, useState} from 'react';

export function useWebSocket(url: string, onMessage: (data: unknown) => void) {
    const socketRef = useRef<WebSocket | null>(null);
    const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);

    useEffect(() => {
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WebSocket 연결됨');
            setReadyState(socket.readyState);
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };
        socket.onerror = (e) => {
            console.error('WebSocket 에러', e);
        };
        socket.onclose = () => {
            console.log('WebSocket 종료');
            setReadyState(WebSocket.CLOSED);
        };

        return () => {
            socket.close();
        };
    }, [url, onMessage]);

    // 메시지 전송 함수
    const sendMessage = useCallback((payload: unknown) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(payload));
        }
    }, []);

    return {readyState, sendMessage};
}