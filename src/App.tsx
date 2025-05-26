import './App.css';
import SyncTestComponent from "./components/SyncTestComponent.tsx";


function App() {
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