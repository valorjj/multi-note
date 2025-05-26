import './App.css';


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