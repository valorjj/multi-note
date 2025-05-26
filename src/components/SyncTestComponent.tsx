import {useFirebaseSync} from "../hooks/useFirebaseSync.ts";

// 컴포넌트 props 인터페이스 정의
interface SyncTestComponentProps {
    serverUrl: string;
    userId: string;
}

const SyncTestComponent = ({serverUrl, userId}: SyncTestComponentProps) => {
    // Firebase 동기화 훅 사용 (serverUrl은 여기서 데이터 경로로 사용)
    const {items, updateItem} = useFirebaseSync(serverUrl, userId) as {
        items: { [key: string]: { checked: boolean; lastBy: string | null } };
        updateItem: (id: string, checked: boolean) => void;
    };

    // 사용자가 체크박스 클릭했을 때 호출 - Firebase 연동
    const onCheck = (id: string, checked: boolean) => {
        updateItem(id, checked);
    };

    return (
        <div>
            <p>동기화 상태: {Object.keys(items).length > 0 ? '동기화됨' : '로딩 중...'}</p>
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