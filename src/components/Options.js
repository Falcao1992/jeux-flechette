import React, {useContext, useState} from 'react'
import {useHistory} from "react-router-dom"
import styled, {keyframes} from "styled-components"
import PlayerContext from "./context/PlayerContext"
import {Icon} from '@iconify/react'
import fileImageOutlined from '@iconify/icons-ant-design/file-image-outlined'


const Options = () => {
    const [currentPlayerName, setCurrentPlayerName] = useState('')
    const [currentPlayerAvatar, setCurrentPlayerAvatar] = useState('')
    const [score, setScore] = useState('')
    
    const {players, updatePlayers} = useContext(PlayerContext)
    
    let history = useHistory()
    
    const addPlayer = (e) => {
        e.preventDefault()
        if (currentPlayerName !== '' && score !== '' && currentPlayerAvatar !== '') {
            let newPlayer = {
                name: currentPlayerName,
                avatar: currentPlayerAvatar,
                score: score,
                shots: ['', '', ''],
                order: players.length,
                nbLaunch: 0,
                playerScore: score
            }
            let copyPlayer = players
            
            copyPlayer.push(newPlayer)
            updatePlayers(copyPlayer)
            
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
        <ContainerPage>
            <ColorBlock />
            <ColorBlock />
            <ColorBlock />
            
            <Box>
                <Square animdelay={0} />
                <Square animdelay={2} />
                <Square animdelay={3} />
                <Square animdelay={4} />
                <Square animdelay={5} />
                <Container>
                    <ContainerForm>
                        <h2>Options de la partie</h2>
                        <FormStylized onSubmit={addPlayer}>
                            <FormInputBlock>
                                <input value={score}
                                       onChange={(e) => setScore(e.target.value)}
                                       type="text"
                                       placeholder="Score de la partie"
                                       id="score"
                                />
                            </FormInputBlock>
                            
                            <FormInputBlock splitchild>
                                <input value={currentPlayerName}
                                       onChange={(e) => setCurrentPlayerName(e.target.value)}
                                       type="text"
                                       id="namePlayer"
                                       placeholder="Nom du joueur"
                                       disabled={!score}
                                />
                                
                                <label htmlFor="avatarPlayer">
                                    <Icon icon={fileImageOutlined} />
                                </label>
                                <input onChange={loadAvatar}
                                       type="file"
                                       id="avatarPlayer"
                                       placeholder="Avatar du joueur"
                                       disabled={!score}
                                />
                            </FormInputBlock>
                            <BlockPreviewAvatar>
                                {currentPlayerAvatar !== "" && <img src={currentPlayerAvatar} alt="" />}
                            </BlockPreviewAvatar>
                            <FormInputBlock>
                                <input type="submit" disabled={!score} value="Ajouter Joueur" />
                            </FormInputBlock>
                        </FormStylized>
                        <ContainerAvatars>
                            {players.map((player, index) => {return <img key={index} src={player.avatar} alt={player.name} />})}
                        </ContainerAvatars>
                        <FormInputBlock>
                            <button onClick={handleSubmit} disabled={!score || players.length <= 0}>Lancer Partie !!!
                            </button>
                        </FormInputBlock>
                    </ContainerForm>
                </Container>
            </Box>
        </ContainerPage>
    )
}
const ContainerAvatars = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.4rem;
   
    img {
      width: 25%;
      height: 10vh;
      object-fit: cover;
      padding: 5px;
    }
`

const BlockPreviewAvatar = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.4rem;
    img {
      width: 50%;
      margin: auto;
    }
`

const animateSquares = keyframes`
    0%,100% {
        transform: translateY(-40px);
    }
    50% {
        transform: translateY(40px);
    }
`

const ContainerPage = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to bottom, #2b218e, #dff1ff);
    overflow: hidden;
`

const ColorBlock = styled.div`
    position: absolute;
    filter: blur(150px);
    &:nth-child(1) {
        top: 0;
        width: 50%;
        left: 23%;
        height: 35%;
        background: #ff359b;
    }
    &:nth-child(2) {
        bottom: 0;
        left: 5%;
        width: 37%;
        height: 45%;
        background: #fffd87;
    }
    &:nth-child(3) {
        bottom: 8%;
        right: 9%;
        width: 18%;
        height: 37%;
        background: #00d2ff;
    }
`

const Box = styled.div`
    position: relative;
    width: 85%;
    @media (min-width: 768px) {
        width: 50%;
    }
    @media (min-width: 1200px) {
        width: 30%;
    }
`

const Square = styled.div`
    position: absolute;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.5);
    border-right: 1px solid rgba(255,255,255,0.2);
    border-bottom: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    animation: ${animateSquares} 5s linear infinite;
    animation-delay: calc(-1s * ${props => props.animdelay});
   
    &:nth-child(1) {
        top: -50px;
        right: -60px;
        width: 100px;
        height: 100px;
    }
    &:nth-child(2) {
        top: 150px;
        left: -80px;
        width: 120px;
        height: 120px;
        z-index: 2;
    }
    &:nth-child(3) {
        bottom: 50px;
        right: -35px;
        width: 80px;
        height: 80px;
        z-index: 2;
    }
    &:nth-child(4) {
        bottom: -65px;
        left: 100px;
        width: 50px;
        height: 50px;
    }
    &:nth-child(5) {
        top: -70px;
        left: 140px;
        width: 60px;
        height: 60px;
    }
`

const Container = styled.div`
    position: relative;
    margin: auto;
    min-height: 70vh;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.5);
    border-right: 1px solid rgba(255,255,255,0.2);
    border-bottom: 1px solid rgba(255,255,255,0.2);
`

const ContainerForm = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.4rem;
    h2 {
        position: relative;
        color: white;
        font-size: 1.4rem;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 2.4rem;
        
        &:before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 80px;
            height: 4px;
            background: white;
        }
    }
`

const FormStylized = styled.form`
    display: flex;
    flex-direction: column;
`

const FormInputBlock = styled.div`
    width: 100%;
    display: ${props => props.splitchild && "flex"};
    justify-content: ${props => props.splitchild && "space-between"};
    align-items: ${props => props.splitchild && "center"};
    margin-top: 1.4rem;
    
    svg {
        font-size: 2.8rem;
        padding: .7rem;
        color: white;
        border-radius: 35px;
        border: 1px solid rgba(255,255,255,0.5);
        border-right: 1px solid rgba(255,255,255,0.2);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
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
        padding: .7rem 1.4rem;
        border-radius: 35px;
        border: 1px solid rgba(255,255,255,0.5);
        border-right: 1px solid rgba(255,255,255,0.2);
        border-bottom: 1px solid rgba(255,255,255,0.2);
        font-size: 1rem;
        letter-spacing: 1px;
        color: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        
        &::placeholder {
            color: white;
        }
    }
    button {
        cursor: pointer;
        transition: background-color .5s ease-in-out;
    }
    button:hover {
        background-color: rgb(241 18 18 / 50%);;
    }
`

export default Options