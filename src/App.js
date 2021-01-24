import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import HomePage from "./components/HomePage"
import Options from "./components/Options"
import Game from "./components/Game/Game"
import PlayerContext from "./components/context/PlayerContext"

function App() {
    const [players, setPlayers] = useState([])
    
    const contextPlayersValue = {
        players,
        updatePlayers: setPlayers
    }
    
    return (
        <PlayerContext.Provider value={contextPlayersValue}>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/options">
                        <Options />
                    </Route>
                    <Route path="/game">
                        <Game />
                    </Route>
                </Switch>
            </Router>
        </PlayerContext.Provider>
    )
}

export default App
