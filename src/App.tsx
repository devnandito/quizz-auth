import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:9000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                if (content.message === 'unautheticated') {
                  setUsername("");
                }
            }
        )();
    });


    return (
        <div className="App">
            <BrowserRouter>
                <Nav username={username} setUsername={setUsername}/>

                <main className="form-signin">
                    <Route path="/" exact component={() => <Home username={username}/>}/>
                    <Route path="/login" component={() => <Login setUsername={setUsername}/>}/>
                    <Route path="/register" component={Register}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;