import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  width: 40%;
  min-width: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  a {
    color: white;
    font-size: 17px;
    line-height: 20px;
  }
  form {
    width: 80%;
    max-width: 429px;
  }
  @media (max-width: 768px) {
    width: 100%;
    min-width: 230px;
    margin-bottom: 91px;
    input,
    button {
      height: 55px;
    }
  }
`;

export const Banner = styled.div`
  width: 60%;
  height: 100vh;
  background-color: var(--darkGray);
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  color: white;
  user-select: none;
  position: relative;
  overflow: hidden;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-left: 7%;
  }
  h1 {
    font-family: "Passion One", sans-serif;
    font-size: 106px;
    line-height: 117px;
  }
  p {
    width: 80%;
    max-width: 442px;
    font-size: 43px;
    line-height: 64px;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    margin-bottom: 40px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    div {
      align-items: center;
      padding: 0px;
    }
    h1 {
      font-size: 76px;
      line-height: 76px;
    }
    p {
      font-size: 23px;
      max-width: 500px;
      line-height: 34px;
      text-align: center;
    }
    canvas {
      display: none;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 65px;
  border-radius: 6px;
  border: none;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 27px;
  padding-bottom: 5px;
  margin-bottom: 13px;
  padding-left: 17px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--gray);
  }
`;

export const Submit = styled.button`
  width: 100%;
  height: 65px;
  background-color: var(--facebookBlue);
  border-radius: 6px;
  border: none;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
  color: white;
  padding-bottom: 5px;
  margin-bottom: 22px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  :hover {
    filter: brightness(1.1);
  }
`;

