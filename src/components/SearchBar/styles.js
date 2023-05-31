import styled from "styled-components";

export const ContainerSearchBar = styled.div`
    width: 563px;
    min-height: 45px;
    height: auto;
    ${(props) => !props.header ? "display: none;" : "display: flex;"};
    flex-direction: column;

    @media (max-width: 890px) {
        ${(props) => props.header ? "display: none;" : "display: flex;"};
        width: calc(100% - 30px);
        margin: 10px auto 20px auto;
    }

`;

export const SearchBar = styled.div`
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;

    >input{
        width: calc(100% - 53px);
        height: 100%;
        margin-left: 14px;
        border: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C6C6C6;
        
        ::placeholder{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #C6C6C6;
        }

        :focus{
            outline: none;
        }
    }

    >svg{
        font-size: 21px;
        color: #C6C6C6;
    }
`;