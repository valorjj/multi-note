import './App.css'
import SyncTestComponent from "./components/SyncTestComponent.tsx";

function App() {
    // 웹소켓 대신 BroadcastChannel 이름을 전달
    return (
        <>
            <SyncTestComponent
                serverUrl="sync-test-channel"
                userId={`user-${Math.floor(Math.random() * 1000)}`}
            />
        </>
    )
}

export default App