import styled from "styled-components";

export const ContainerNavBar = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    margin-bottom: 53px;

    @media (max-width: 890px) {
        margin-bottom: 0px;
    }
`;

export const LogoText = styled.p`
    width: 108px;
    height: 54px;
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    margin-left: 28px;
`;

export const ContainerUserActions = styled.div`
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 17px;
    gap: 0px 5px;
    position: relative;

    >svg{
        font-size: 50px;
        color: white;
        cursor: pointer;
    }

    >img{
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        object-fit: cover;
    }

    >div{
        width: 150px;
        height: 47px;
        background: #171717;
        border-radius: 0px 0px 20px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: -55px;
        left: -25px;
        cursor: pointer;

        >p{
            width: 57px;
            height: 20px;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            line-height: 20px;
            letter-spacing: 0.05em;
            color: #FFFFFF;
        }
    }
`