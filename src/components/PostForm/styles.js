import styled from "styled-components";

export const PostFormContainer = styled.form`
    width: 100%;
    height: 209px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    padding: 22px;
    box-sizing: border-box;
    margin-bottom: 29px;
    div{
        width: 100%;
    }
    img{
        height: 50px;
        width: 50px;
        border-radius: 26.5px;
        margin-right: 16px;
    }
`
export const PostFormTitle = styled.h1`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
`

export const PostFormLinkInput = styled.input`
    width: 100%;
    height: 30px;
    background-color: #EFEFEF;
    border-radius: 5px;
    border: none;
    margin-bottom: 5px;
    padding: 5px 13px;
    box-sizing: border-box;
`

export const PostFormTextInput = styled.textarea`
    width: 100%;
    height: 66px;
    background-color: #EFEFEF;
    border-radius: 5px;
    border: none;
    margin-bottom: 5px;
    padding: 5px 13px;
    box-sizing: border-box;
`

export const PostFormButton = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    border-radius: 5px;
    border: none;
    color: white;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    margin: auto;
`
