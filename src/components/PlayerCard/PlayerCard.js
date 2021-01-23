import React, {useEffect, useState} from 'react'
import styled from "styled-components"

const PlayerCard = ({player, players, setPlayers}) => {
    const [shots, setShots] = useState([null, null, null])
    
    useEffect(() => {
    
    }, [players])
    
    const handleShots = (e) => {
        let shotCopy = [...shots]
        shotCopy[e.target.id] = parseInt(e.target.value)
        setShots(shotCopy)
    }
    
    const validScore = () => {
        let copyPlayers = [...players]
        
        // calcul sum shots
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        let totalShotPoint = shots.reduce(reducer)
        
        copyPlayers[player.order].playerScore -= totalShotPoint
        copyPlayers[player.order].nbLaunch += 1
        setPlayers(copyPlayers)
        setShots([null, null, null])
    }
    
    return (
        <CardPlayer>
            <BlockAvatarName>
                <p>{player.name}</p>
                <img src={player.avatar} alt={player.name} />
                <p>{player.playerScore}/{player.score}</p>
            </BlockAvatarName>
            <BlockShots>
                {shots.map((shot, i) => {
                    return (
                        <input key={i}
                               id={i}
                               type="number"
                               value={shots[i] || ""}
                               onChange={handleShots}
                               autoComplete="off"
                        />
                    )
                })}
            </BlockShots>
            <div>
                <button type='button' onClick={validScore}>Fin du tour</button>
            </div>
        </CardPlayer>
    )
}
const CardPlayer = styled.div`
    width: 90%;
    margin: .7rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: lightblue;
`

const BlockAvatarName = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        text-align: center;
    }
    img {
        width: 90px;
        height: 90px;
        object-fit: cover;
    }
`
const BlockShots = styled.div`
    width: 30%;
    input {
      width: 100%;
    }
`

export default PlayerCard