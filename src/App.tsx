import './App.css'
import SyncTestComponent from "./components/SyncTestComponent.tsx";

const serverUrl = 'ws://localhost:8080/ws'; // Spring Boot WebSocket 엔드포인트
const userId = `user-${Math.floor(Math.random() * 1000)}`; // 예시 랜덤 ID


function App() {

    return (
        <>
            <SyncTestComponent serverUrl={serverUrl} userId={userId}/>
        </>
    )
}

export default App
