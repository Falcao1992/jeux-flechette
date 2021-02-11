import React from 'react'
import styled from "styled-components"


const EndGame = ({rank}) => {
    
    return (
        <ContainerRank>
            <h2>Résultats de la partie</h2>
            {rank && rank.map((playerRanked, index) => {
                return (
                    <BlockPlayerRank rank={index + 1} key={index}>
                        <small>{index + 1}</small>
                        <img src={playerRanked.avatar} alt="" />
                        <div>
                            <p>{playerRanked.name}</p>
                            <span>{playerRanked.nbLaunch} lancés</span>
                        </div>
                    </BlockPlayerRank>
                )
            })}
        </ContainerRank>
    )
}

const ContainerRank = styled.section`
  h2 {
      margin-bottom: 2.8rem;
  }
`

const BlockPlayerRank = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${props => props.rank === 1 ? "12vh" : props.rank === 2 ? "10vh" : props.rank === 3 ? "8vh" : "6vh"};
    margin: 1.4rem auto;
    border-radius: 10px;
    background: rgba(255,255,255,0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.5);
    border-right: 1px solid rgba(255,255,255,0.2);
    border-bottom: 1px solid rgba(255,255,255,0.2);
    small {
      width: 10%;
      font-size: ${props => props.rank === 1 ? "6vh" : props.rank === 2 ? "5vh" : props.rank === 3 ? "4vh" : "3vh"};
      text-align: center;
    }
    img {
      width: ${props => props.rank === 1 ? "40%" : props.rank === 2 ? "35%" : props.rank === 3 ? "30%" : "25%"};;
      height: inherit;
      object-fit: cover;
    }
    > div {
        margin-left: auto;
        margin-right: .7rem;
    }
`

export default EndGame