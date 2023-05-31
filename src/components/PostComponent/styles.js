import styled from "styled-components";

export const PostContainer = styled.div`
    width: 100%;
    height: 276px;
    background-color: black;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    padding: 22px;
    box-sizing: border-box;
    h1{
        color: white;
    }
`
export const PictureAndLikes = styled.div`
    display: flex;
    background-color: red;
    flex-direction: column;
    align-items: center;
    margin-right: 19px;
    img {
        height: 50px;
        width: 50px;
        border-radius: 26.5px;
        margin-bottom: 19px;
    }
    h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: white;
    }
`
export const PostContent = styled.div`
        width: 100%;
`
export const AuthorName = styled.h1`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: white;
`

export const PostText = styled.p`
    height: 52px;
    left: 328px;
    top: 519px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    color: #B7B7B7;
`

export const LinkContent = styled.div`
width: 100%;
height: 155px;
border: 1px solid #4D4D4D;
border-radius: 11px;
`
