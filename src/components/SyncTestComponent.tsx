import React, {useCallback, useState} from 'react';
import {useWebSocket} from "../hooks/useWebSocket.ts";

const SyncTestComponent = ({serverUrl, userId}) => {
// { [itemId]: { checked: boolean, lastBy: userId } }
    const [items, setItems] = useState({});

    // 서버에서 온 업데이트 처리
    const handleMessage = useCallback((data) => {
        // 예: { id: 'checkbox-1', checked: true, user: 'userA' }
        setItems(prev => ({
            ...prev,
            [data.id]: {checked: data.checked, lastBy: data.user}
        }));
    }, []);

    // WebSocket 연결
    const {readyState, sendMessage} = useWebSocket(serverUrl, handleMessage);

    // 사용자가 체크박스 클릭했을 때 호출
    const onCheck = (id, checked) => {
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