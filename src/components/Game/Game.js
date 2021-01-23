import React from 'react'
import PlayerCard from "../PlayerCard/PlayerCard"

const Game = ({players, setPlayers}) => {
    
    return (
        <div>
            {players && players.map((player, index) => {
                return (
                    <PlayerCard key={index} player={player} players={players} setPlayers={setPlayers} />
                )
            })}
        </div>
    )
}

export default Game