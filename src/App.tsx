import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.tsx";
import Home from "./components/Home.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Home/>}/>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
            {/*<SyncTestComponent*/}
            {/*    serverUrl="sync-test-channel"*/}
            {/*    userId={`user-${Math.floor(Math.random() * 1000)}`}*/}
            {/*/>*/}
        </BrowserRouter>
    )
}

export default App