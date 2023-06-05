import styled from "styled-components";

export const ContainerSearchBar = styled.div`
    width: 40%;
    min-height: 45px;
    height: auto;
    position: absolute;
	top: 13.5px;
	left: 30%;
    ${(props) => !props.header ? "display: none;" : "display: flex;"};
    flex-direction: column;
    background-color: #E7E7E7;
    border-radius: 8px;
    overflow: hidden;

    @media (max-width: 890px) {
        ${(props) => props.header ? "display: none;" : "display: flex;"};
        width: calc(100% - 30px);
        margin: 10px auto 20px auto;
        position: static;
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

export const ContainerSearchResults = styled.div`
    width: 100%;
    max-height: 108px;
    height: auto;
    ${(props) => !props.display ? "display: none;" : "display: flex;"};
    flex-direction: column;
    overflow-y: auto;

    >div{
        width: 100%;
        height: 54px;
        background-color: #E7E7E7;
        display: flex;
        align-items: center;
        gap: 0px 12px;
        flex-shrink: 0;
        cursor: pointer;

        >img{
            width: 39px;
            height: 39px;
            border-radius: 304px;
            object-fit: cover;
            margin-left: 17px;
        }

        >p{
            width: 350px;
            height: 23px;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #515151;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

`;