import {useCallback, useState} from 'react';
import {useWebSocket} from "../hooks/useWebSocket.ts";

// 아이템 상태를 위한 인터페이스 정의
interface ItemState {
    checked: boolean;
    lastBy: string | null;
}

// 컴포넌트 props 인터페이스 정의
interface SyncTestComponentProps {
    serverUrl: string;
    userId: string;
}

// 서버 메시지 인터페이스 정의
interface ServerMessage {
    id: string;
    checked: boolean;
    user: string;
}

const SyncTestComponent = ({serverUrl, userId}: SyncTestComponentProps) => {
    // 타입 지정된 상태 정의
    const [items, setItems] = useState<Record<string, ItemState>>({} as Record<string, ItemState>);
    // 서버에서 온 업데이트 처리
    const handleMessage = useCallback((data: unknown) => {
        // 타입 가드를 추가하여 데이터 검증
        if (
            typeof data === 'object' && data !== null &&
            'id' in data && 'checked' in data && 'user' in data
        ) {
            const serverMessage = data as ServerMessage;
            setItems(prev => ({
                ...prev,
                [serverMessage.id]: {
                    checked: serverMessage.checked,
                    lastBy: serverMessage.user
                }
            }));
        } else {
            console.error('잘못된 메시지 형식:', data);
        }
    }, []);

    // WebSocket 연결
    const {readyState, sendMessage} = useWebSocket(serverUrl, handleMessage);

    // 사용자가 체크박스 클릭했을 때 호출
    const onCheck = (id: string, checked: boolean) => {
        // 1) 로컬 UI 업데이트
        setItems(prev => ({
            ...prev,
            [id]: {checked, lastBy: userId}
        }));
        // 2) 서버에 이벤트 전송
        sendMessage({id, checked, user: userId});
    };

    return (
        <div>
            <p>WebSocket 상태: {['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][readyState]}</p>
            <div style={{display: 'flex', gap: '1rem'}}>
                {/* 예시로 1~5번 체크박스 렌더 */}
                {[1, 2, 3, 4, 5].map(n => {
                    const key = `checkbox-${n}`;
                    const state = items[key] || {checked: false, lastBy: null};
                    return (
                        <div key={key} style={{textAlign: 'center'}}>
                            <input
                                type="checkbox"
                                id={key}
                                checked={state.checked}
                                onChange={e => onCheck(key, e.target.checked)}
                            />
                            <label htmlFor={key}>#{n}</label>
                            <div style={{fontSize: '0.75rem', color: '#555'}}>
                                {state.lastBy && `by ${state.lastBy}`}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SyncTestComponent;