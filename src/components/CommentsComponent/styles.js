import styled from "styled-components";

export const CommentContainer = styled.div`
  width: 100%;
  height: auto;
`;

export const CommentInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 19px 25px 25px;
  img{
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    margin-right: 14px;
  }
  form{
    background-color: #252525;
    border-radius: 8px;
    width: 100%;
    height: 39px;
    border: none;
    display: flex;
    align-items: center;
    padding: 0px 15px;
  }
  input{
    width: 100%;
    height: 17px;
    background-color: none;
    border: none;
    font-family: 'Lato';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
    background-color: transparent;
    margin-right: 5px;
    :focus{
      outline: none;
    }
  }

`;