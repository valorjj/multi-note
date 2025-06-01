import './App.css';
import Login from "./components/Login.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>
            {/*<SyncTestComponent*/}
            {/*    serverUrl="sync-test-channel"*/}
            {/*    userId={`user-${Math.floor(Math.random() * 1000)}`}*/}
            {/*/>*/}
        </BrowserRouter>
    )
}

export default App