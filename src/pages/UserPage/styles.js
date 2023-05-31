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

    >div{
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
            text-align: center;
        }
    }
`;

