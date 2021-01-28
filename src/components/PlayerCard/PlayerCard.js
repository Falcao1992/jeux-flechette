import React, {useState, useContext} from 'react'
import styled from "styled-components"
import {PlayerContext} from "../../PlayerContext"

const PlayerCard = ({player, currentPlayer, setCurrentPlayer, turnToPlay, rank, setRank}) => {
    const [shots, setShots] = useState([null, null, null])
    const {players, updatePlayers} = useContext(PlayerContext)
    
    const handleShots = (e) => {
        let shotCopy = [...shots]
        shotCopy[e.target.id] = parseInt(e.target.value)
        setShots(shotCopy)
    }
    
    const promisePoint = () => {
        return new Promise((resolve, reject) => {
            let copyPlayers = [...players]
            copyPlayers[currentPlayer].nbLaunch += 1
            const reducer = (accumulator, currentValue) => accumulator + currentValue
            let totalShotPoint = shots.reduce(reducer)
            
            if (player.playerScore - totalShotPoint < 0) {
                console.log("plus petit que 0")
                updatePlayers(copyPlayers)
                resolve('plus petit que 0')
            } else if (player.playerScore - totalShotPoint === 0) {
                console.log("partie gagner")
                copyPlayers[currentPlayer].playerScore -= totalShotPoint
                updatePlayers(copyPlayers)
                setRank([...rank, player])
                resolve('partie gagner')
            } else {
                console.log("continue a jouer")
                copyPlayers[currentPlayer].playerScore -= totalShotPoint
                updatePlayers(copyPlayers)
                resolve('continue a jouer')
            }
        })
    }
    
    const validScore = async () => {
        console.log("VALID SCORE")
        setShots([null, null, null])
        const result = await promisePoint()
        if (currentPlayer === players.length - 1) {
            console.log('if player')
            setCurrentPlayer(0)
        } else if (result === 'partie gagner') {
            console.log("include player")
        } else {
            console.log('else player')
            setCurrentPlayer(currentPlayer + 1)
        }
    }

return (
    <CardPlayer active={turnToPlay}>
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
                           disabled={!turnToPlay}
                    />
                )
            })}
        </BlockShots>
        <div>
            <button type='button'
                    onClick={validScore}
                    disabled={!turnToPlay}>Fin du tour
            </button>
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
    background-color: ${props => props.active ? "green" : "lightblue"};
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