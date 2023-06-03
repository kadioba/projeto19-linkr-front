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
  h1 {
    color: white;
  }
`;
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
  }
`;
export const PostContent = styled.div`
  width: 100%;
`;
export const AuthorName = styled.h1`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: white;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const PostText = styled.p`
  height: 52px;
  overflow: hidden;
  left: 328px;
  top: 519px;

  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;

  color: #b7b7b7;
`;

export const LinkContent = styled.a`
  width: 100%;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
  text-decoration: inherit;
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

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
  div {
    display: flex;
    align-items: center;
  }
`;

export const EspacoIcones = styled.div`
  width: 12px;
`;

export const ContentInput = styled.textarea`
  width: 100%;
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
`;
