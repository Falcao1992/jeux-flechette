import React, {useEffect, useState, useContext} from 'react'
import PlayerCard from "../PlayerCard/PlayerCard"
import PlayerContext from "../context/PlayerContext"

const Game = () => {
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [rank, setRank] = useState([])
    
    const {players, updatePlayers} = useContext(PlayerContext)
    
    useEffect(() => {
        updatedRank()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rank])

    const updatedRank = () => {
        console.log("UPDATED RANK")
        let copyPlayers = players.filter((player) => !rank.includes(player))
        updatePlayers(copyPlayers)
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