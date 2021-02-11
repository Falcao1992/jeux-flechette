import React, {useContext, useEffect, useState} from 'react'
import PlayerCard from "../PlayerCard/PlayerCard"
import {PlayerContext} from "../../PlayerContext"
import styled, {keyframes} from "styled-components"
import EndGame from "../EndGame/EndGame"

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
                    {<h2>{players[currentPlayer] && 'Au tour de ' + players[currentPlayer].name}</h2>}
                    <ContainerPlayerCard display={players.length > 0 && "true"}>
                        {players &&  players.map((player, index) => {
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
                    </ContainerPlayerCard>
                    {rank.length > 0 && <EndGame rank={rank} />}
                </Container>
            </Box>
        </ContainerPage>
    )
}

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

const animateSquares = keyframes`
    0%,100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(70px);
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
    animation: ${animateSquares} 7s linear infinite;
    animation-delay: calc(0.5s * ${props => props.animdelay});
   
    &:nth-child(1) {
        top: -50px;
        right: -60px;
        width: 100px;
        height: 100px;
    }
    &:nth-child(2) {
        top: 150px;
        left: -100px;
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
        bottom: -30px;
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
    padding: .7rem;
    min-height: 70vh;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.5);
    border-right: 1px solid rgba(255,255,255,0.2);
    border-bottom: 1px solid rgba(255,255,255,0.2);
    
    h2 {
        position: relative;
        color: white;
        font-size: 1.4rem;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: .7rem;
        padding: .7rem 0;
        
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

const ContainerPlayerCard = styled.div`
    display: ${props => props.display ? "block" : "none"};
    margin: 1.4rem 0;
`

export default Game