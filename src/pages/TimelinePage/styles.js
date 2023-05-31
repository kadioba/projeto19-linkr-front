import styled from "styled-components";

export const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: charcoal;
    display: flex;
    /* flex-direction: column; */
    /* align-items: center; */
    justify-content: center;
`

export const TimelineContainer = styled.main`
    width: 100vw;
    max-width: 600px;
    /* margin-top: 150px; */
`

export const TimelineTitle = styled.h1`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    margin-bottom: 43px;
`

export const TrendingHashtagsContainer = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    margin-top: 107px;
    margin-left: 25px;
    padding: 9px 16px;
    box-sizing: border-box;

    @media (max-width: 890px) {
        display: none;
    }
`

export const TrendingHashtagsTitle = styled.h2`
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 27px;
line-height: 40px;
color: #FFFFFF;
`

export const ContentDivider = styled.div`
width: 100%;
height: 0px;
border: 1px solid #484848;
margin-top: 12px;
margin-bottom: 22px;
`