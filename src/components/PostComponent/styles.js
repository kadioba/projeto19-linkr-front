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
    margin-bottom: 16px;
    h1{
        color: white;
    }
`
export const PictureAndLikes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 19px;
    img {
        height: 50px;
        width: 50px;
        border-radius: 26.5px;
        margin-bottom: 19px;
        object-fit: cover;
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

export const LinkContent = styled.a`
width: 100%;
height: 155px;
border: 1px solid #4D4D4D;
border-radius: 11px;
display: flex;
text-decoration: inherit;
div{
    width: 70%;
    height: 100%;
    padding: 20px 20px;

}
h1{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
    margin-bottom: 5px;
    height: 38px;
    overflow: hidden;
}
p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
    margin-bottom: 13px;
    height: 39px;
    overflow: hidden;
}
h2{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
    height: 13px;
    overflow: hidden;
}
`
export const ImageContent = styled.img`
    width: 30%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px 12px 13px 0px;
`

export const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* padding-top: 120px; */
    box-sizing: border-box;
`

export const Hashtag = styled.span`
    color: tomato;
    font-weight: bold;

    :hover{
        cursor: pointer;
    }
`;