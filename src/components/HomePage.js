import React from "react"
import styled, {keyframes} from "styled-components"
import {Link} from "react-router-dom"
import dartsHomePageBg from "../assets/dartsHomePageBg.jpg"


const HomePage = () => {
    
    const generateBlock = () => {
        return [...Array(100)].map((x, i) =>
            <Blocks key={i} bg={dartsHomePageBg} delay={i * 0.05} />)
    }
    
    return (
        <ContainerPage>
            <BlockButton>
                <ButtonPlay to="/options">Jouer</ButtonPlay>
            </BlockButton>
            <BlockBanner>
                {generateBlock()}
            </BlockBanner>
        </ContainerPage>
    )
}
const animate = (bg) => keyframes`
  0% {
    opacity: 0;
    transform: scale(0) translateY(1000px);
  }
  50% {
    opacity: 1;
    background-image: url(${bg});
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
    background-image: url(${bg});
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
  }
`

const animateButton = keyframes`
    0% {opacity: 0}100% {opacity: 1}
`

const ContainerPage = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`

const BlockButton = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    animation: 2s linear 6s forwards ${animateButton};
    transition: opacity 1s ease-in;
    z-index: 1;
`

const ButtonPlay = styled(Link)`
    font-weight: 700;
    color: red;
    font-size: 10vw;
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
    animation: ${props => animate(props.bg)};
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    position: relative;
    display: block;
    width: 10vw;
    height: 10vh;
    
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