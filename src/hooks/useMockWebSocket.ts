// src/hooks/useMockWebSocket.ts
import {useCallback, useEffect, useState} from 'react';

export function useMockWebSocket(channelName: string, onMessage: (data: unknown) => void) {
    const [readyState, setReadyState] = useState<number>(0); // 0: CONNECTING
    const [channel, setChannel] = useState<BroadcastChannel | null>(null);

    useEffect(() => {
        try {
            const broadcastChannel = new BroadcastChannel(channelName);
            setChannel(broadcastChannel);
            setReadyState(1); // 1: OPEN

            broadcastChannel.onmessage = (event) => {
                onMessage(event.data);
            };

            return () => {
                broadcastChannel.close();
                setReadyState(3); // 3: CLOSED
            };
        } catch (err) {
            console.error('BroadcastChannel 지원되지 않음:', err);
            setReadyState(3); // 3: CLOSED
        }
    }, [channelName, onMessage]);

    const sendMessage = useCallback((payload: unknown) => {
        if (channel && readyState === 1) {
            channel.postMessage(payload);
        }
    }, [channel, readyState]);

    return {readyState, sendMessage};
}