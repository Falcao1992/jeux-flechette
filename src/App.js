import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import HomePage from "./components/HomePage"
import Options from "./components/Options"

function App() {
    const [players, setPlayers] = useState([])
    
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/options">
                    <Options players={players} setPlayers={setPlayers} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
