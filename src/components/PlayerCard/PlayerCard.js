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
            <span>{player.playerScore}/{player.score}</span>
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
        <FormInputBlock>
            <button type='button'
                    onClick={validScore}
                    disabled={!turnToPlay}>Fin du tour
            </button>
        </FormInputBlock>
    </CardPlayer>
)
}
const CardPlayer = styled.div`
    position: relative;
    margin: .7rem auto;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-evenly;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.5);
    border-right: 1px solid rgba(255,255,255,0.2);
    border-bottom: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    &:before {
      position: absolute;
      left: 0;
      content: '';
      height: 20vh;
      width: 8px;
      background-color: ${props => props.active ? "#59e26a" : "transparent"};
    }
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
        width: 80%;
        height: 10vh;
        object-fit: cover;
        margin: .7rem 0;
    }
`
const BlockShots = styled.div`
    display: flex;
    width: 30%;
    justify-content: space-between;
    input {
      width: 30%;
    }
`

const FormInputBlock = styled.div`
    width: 30%;
    input[disabled] {
        opacity: .2;
    }
    input[type="file"] {
        display: none;
    }
    input[type="submit"] {
        background: white;
        color: #666;
        cursor: pointer;
        font-weight: 600;
    }
    input, button {
        width: ${props => props.splitchild ? "70" : "100"}%;
        background: rgba(255,255,255,0.2);
        outline: none;
        padding: .7rem;
        border-radius: 35px;
        border: 1px solid rgba(255,255,255,0.5);
        border-right: 1px solid rgba(255,255,255,0.2);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        font-size: 1rem;
        letter-spacing: 1px;
        color: white;
        box-shadow: 6px 6px 15px rgb(0 0 0 / 10%);
        
        &::placeholder {
            color: white;
        }
    }
    button {
        cursor: pointer;
        transition: background-color .5s ease-in-out;
    }
    button:hover {
        background-color: rgb(190 97 174);
    }
`

export default PlayerCard