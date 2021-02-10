import React, {useLayoutEffect} from "react"
import styled, {keyframes} from "styled-components"
import {Link} from "react-router-dom"
import dartsHomePageBg from "../assets/dartsHomePageBg.jpg"


const HomePage = () => {
    
    useLayoutEffect(() => {
        generateBlock()
    },[])
    
    const generateBlock = () => {
        return [...Array(400)].map((x, i) =>
            <Blocks key={i} bg={dartsHomePageBg} lastrow={i < 280 && "true"} delay={i * 0.02} />)
    }
    
    return (
        <ContainerPage>
            <BlockTitle>
                <h1>jeux flechette</h1>
            </BlockTitle>
            <BlockButton>
                {/*<Circle/>*/}
                <ButtonPlay to="/options">Jouer</ButtonPlay>
            </BlockButton>
            <BlockBanner>
                {generateBlock()}
            </BlockBanner>
        </ContainerPage>
    )
}

const BlockTitle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
    
    h1 {
        text-align: center;
        font-size: 3.5rem;
        margin: 1.4rem;
    }
`

const animateBlocks = (bg,isLastRow) => keyframes`
  0% {
    opacity: 0;
    transform: scale(0) ${!isLastRow ? 'translateY(0)' : 'translateY(30vh)'};
  }
  50% {
    opacity: 1;
    background-image: url(${bg});
    background-attachment: fixed;
    /*background-size: cover;*/
    background-position: center 65%;
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
    background-image: url(${bg});
    background-attachment: fixed;
    /*background-size: cover;*/
    background-position: center 65%;
  }
`

const animateButton = keyframes`
    0% {opacity: 0}100% {opacity: 1}
`


const ContainerPage = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #14161a;
    overflow: hidden;
`


const BlockButton = styled.div`
    position: absolute;
    left: 50%;
    bottom: 10vh;
    transform: translateX(-50%);
    opacity: 0;
    animation: 2s linear 7s forwards ${animateButton};
    transition: opacity 1s ease-in, transform 0.4s cubic-bezier(0.23,1.83,0.42,1.19);
    z-index: 1;
    
    &:hover {
        transform: translateX(-50%) scale(1.1) ;
    }
`



const ButtonPlay = styled(Link)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 2rem;
    letter-spacing: 3px;
    color: aliceblue;
    cursor: pointer;
`

const BlockBanner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
`

const Blocks = styled.div.attrs(props => ({
    style: {
        animationDelay: props.delay + 's'
    },
}))`
    animation: ${props => animateBlocks(props.bg,props.lastrow)};
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    position: relative;
    display: block;
    width: 5vw;
    height: 5vh;
    
    &:nth-child(even){
        animation-duration: 1s;
    }
    &:nth-child(7n+3){
        animation-duration: 2.5s;
    }
    &:nth-child(7n+7){
        animation-duration: 1.5s;
    }
`

export default HomePage