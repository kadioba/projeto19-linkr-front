import styled from "styled-components";

export const ContainerUserPage = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    gap: 0px 25px;
`;

export const ContentUserPage = styled.div`
    width: 610px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: start;

    >div:nth-of-type(1){
        width: 100%;
        min-height: 64px;
        height: auto;
        display: flex;
        align-items: center;
        margin-bottom: 40px;

        @media (max-width: 520px) {
            flex-direction: column;
            align-items: center;
            gap: 5px 0px;
        }
        
        >img{
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 26.5px;
            margin-left: 18px;
            margin-right: 18px;
        }

        >p{
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 700;
            font-size: 43px;
            line-height: 64px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    >div:nth-of-type(2){
        width: 100%;
        min-height: 500px;
        height: auto;
        gap: 16px 0px;
        display: flex;
        flex-direction: column;
    }
`;

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
