import styled from "styled-components";

export const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 20px;
  border-bottom: 1px solid #353535;
  img{
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    margin-right: 18px;
  }
  div{
    width: 100%;
  }
  h1{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #F3F3F3;
  }
  p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
  }
  strong{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
  }

`;
