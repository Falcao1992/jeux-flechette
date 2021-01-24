import React, {useEffect, useState} from 'react'
import PlayerCard from "../PlayerCard/PlayerCard"

const Game = ({players, setPlayers}) => {
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [rank, setRank] = useState([])
    
    useEffect(() => {
        updatedRank()
    }, [rank])
    
    const updatedRank = () => {
        console.log("UPDATED RANK")
        let copyPlayers = players.filter((player) => !rank.includes(player))
        setPlayers(copyPlayers)
    }
    
    return (
        <div>
            <h1>le jeu commence</h1>
            {<p>{players[currentPlayer] && players[currentPlayer].name}</p>}
            <div>
                {players && players.map((player, index) => {
                    return (
                        <PlayerCard key={index}
                                    player={player}
                                    players={players}
                                    setPlayers={setPlayers}
                                    currentPlayer={currentPlayer}
                                    setCurrentPlayer={setCurrentPlayer}
                                    turnToPlay={currentPlayer === index}
                                    rank={rank}
                                    setRank={setRank}
                        />
                    )
                })}
            </div>
            <div>
                {rank && rank.map((playerRanked, index) => {
                    return (
                        <div key={index}>
                            <p>{index + 1}{playerRanked.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Game