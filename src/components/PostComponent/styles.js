import styled from "styled-components";

export const PostOuterContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  background-color: #1E1E1E;
  margin-bottom: 16px;

`;

export const PostContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #171717;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  box-sizing: border-box;
  h1 {
    color: white;
  }
`;

export const PictureAndLikes = styled.div`
  width: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    height: 50px;
    width: 50px;
    border-radius: 26.5px;
    margin-bottom: 19px;
    margin-top: 17px;
    object-fit: cover;
    cursor: pointer;
  }

  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: white;
    cursor: default;
  }
`;
export const PostContent = styled.div`
  width: calc(100% - 86px);
`;
export const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 19px;
    >div{
        display: flex;
        align-items: center;
        margin-right: 23px;

        >svg{
          cursor: pointer;
        }

        @media (max-width: 600px) {
          margin-right: 0px;
        }
    }
; 
`

export const AuthorName = styled.h1`
  width: 300px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;              
  text-overflow: ellipsis;

  :hover {
    text-decoration: underline;
  }
`;

export const PostText = styled.p`
  height: auto;
  width: calc(100% - 20px);
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  margin-bottom: 20px;
  color: #b7b7b7;
  word-break: break-word;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const LinkContent = styled.a`
  width: calc(100% - 20px);
  margin-bottom: 20px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
  text-decoration: inherit;

  @media (max-width: 600px) {
    width: 100%;
  }

  div {
    width: 70%;
    height: 100%;
    padding: 20px 20px;
  }
  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-bottom: 5px;
    height: 38px;
    overflow: hidden;
  }
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
    height: 39px;
    overflow: hidden;
  }
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    height: 13px;
    overflow: hidden;
  }
`;
export const ImageContent = styled.img`
  width: 30%;
  height: 100%;
  object-fit: cover;
  border-radius: 0px 12px 13px 0px;
`;

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* padding-top: 120px; */
  box-sizing: border-box;
`;

export const tagStyle = {
  fontWeight: "bold",
  color: "#FFFFFF",
  cursor: "pointer",
};

export const EspacoIcones = styled.div`
  width: 12px;
`;

export const ContentInput = styled.textarea`
  width: calc(100% - 20px);
  height: 44px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4c4c4c;
  margin-bottom: 13px;
  background: #ffffff;
  border-radius: 7px;
  border: none;
  resize: none; 
`;

