import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import styled from "styled-components"


const Options = ({players, setPlayers}) => {
    const [currentPlayerName, setCurrentPlayerName] = useState('')
    const [currentPlayerAvatar, setCurrentPlayerAvatar] = useState('')
    const [score, setScore] = useState('')
    
    let history = useHistory();
    
    const addPlayer = (e) => {
        e.preventDefault()
        if (currentPlayerName !== '' && score !== '' && currentPlayerAvatar !== '') {
            let newPlayer = {
                name: currentPlayerName,
                avatar: currentPlayerAvatar,
                score: score,
                shots: ['','',''],
                order: players.length,
                nbLaunch: 0,
                playerScore: score
            }
            setPlayers([...players, newPlayer])
            setCurrentPlayerName('')
            setCurrentPlayerAvatar('')
        }
    }
    
    const loadAvatar = (e) => {
        try {
            const file = e.target.files[0]
            const reader = new FileReader()
            
            reader.readAsDataURL(file)
            reader.onloadend = (event) => {
                setCurrentPlayerAvatar(() => event.target.result)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    const handleSubmit = () => {
        history.push('/game')
    }
    
    return (
        <div>
            <div>
                <h1>Options</h1>
            </div>
            
            <FormStylized>
                <FormInputBlock>
                    <label htmlFor="score">Score de la partie :</label>
                    <input value={score}
                           onChange={(e) => setScore(e.target.value)}
                           type="text"
                           id="score"
                    />
                </FormInputBlock>
                
                <FormInputBlock>
                    <label htmlFor="namePlayer">Nom du joueur :</label>
                    <input value={currentPlayerName}
                                onChange={(e) => setCurrentPlayerName(e.target.value)}
                                type="text"
                                id="namePlayer"
                                disabled={!score}
                    />
                
                </FormInputBlock>
                <div>
                    <label htmlFor="avatarPlayer">Avatar du joueur: </label>
                    <input onChange={loadAvatar}
                           type="file"
                           id="avatarPlayer"
                           disabled={!score}
                    />
                </div>
                
                {currentPlayerAvatar !== "" &&
                <div>
                    <PreviewAvatar src={currentPlayerAvatar} alt="" />
                </div>}
                
                <button onClick={addPlayer} disabled={!score}>Ajouter Joueur</button>
            </FormStylized>
            
            {players.map((player, index) => {
                return (
                    <div key={index}>
                        <p>{player.name}</p>
                    </div>
                )
            })}
            <div>
                <button onClick={handleSubmit} disabled={!score || players.length <= 0}>Lancer Partie !!!</button>
            </div>
        </div>
    )
}

const FormStylized = styled.form`
    display: flex;
    flex-direction: column;
`

const FormInputBlock = styled.div`
    display: flex;
    justify-content: space-between;
`
const PreviewAvatar = styled.img`
    width: 100%;
`
export default Options