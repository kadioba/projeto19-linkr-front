import styled from "styled-components";

export const PostFormContainer = styled.form`
    width: 100%;
    height: 209px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    margin-bottom: 29px;

    >div:nth-of-type(1){
        width: 14%;
        display: flex;
        justify-content: center;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;

        >img{
            height: 50px;
            width: 50px;
            border-radius: 26.5px;
            margin-top: 16px;
            object-fit: cover;

            @media (max-width: 490px) {
                width: 40px;
                height: 40px;
            }
        }
    }

    >div:nth-of-type(2){
        width: 86%;
        height: 100%;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        display: flex;
        flex-direction: column;

        >div{
            width: calc(100% - 22px);
            display: flex;
            justify-content: end;
        }
    }
`
export const PostFormTitle = styled.h1`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-top: 21px;
    margin-bottom: 12px;
`

export const PostFormLinkInput = styled.input`
    width: calc(100% - 22px);
    height: 30px;
    background-color: #EFEFEF;
    border-radius: 5px;
    border: none;
    margin-bottom: 5px;
    padding: 5px 13px;
    box-sizing: border-box;

    :focus{
        outline: 1px solid #1877F2;
    }
`

export const PostFormTextInput = styled.textarea`
    width: calc(100% - 22px);
    height: 66px;
    background-color: #EFEFEF;
    border-radius: 5px;
    border: none;
    margin-bottom: 5px;
    padding: 5px 13px;
    box-sizing: border-box;
    resize: none;

    :focus{
        outline: 1px solid #1877F2;
    }
`

export const PostFormButton = styled.button`
    width: 112px;
    height: 31px;
    background: rgb(43,178,170);
    background: linear-gradient(90deg, rgba(43,178,170,1) 0%, rgba(24,119,242,1) 100%);
    border-radius: 5px;
    border: none;
    color: white;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    box-shadow: 1px 10px 2rem rgba(24, 119, 242, 0.5);
    transition: all 0.2s ease-in;
    cursor: pointer;

    :hover{
        box-shadow: 0px 5px 1rem rgba(24, 119, 242, 0.5);
    }
`
