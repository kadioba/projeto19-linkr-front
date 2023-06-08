import styled from "styled-components";

export const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 262px;
  background: #333333;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #ffffff;
    margin-top: 38px;
    margin-bottom: 40px;
    width: 400px;

    @media (max-width: 400px) {
      width: 100%;
    }
  }
  div {
    display: flex;
    width: 295px;
    justify-content: space-between;
  }
`;

export const CancelButton = styled.button`
  width: 134px;
  height: 37px;
  background-color: #ffffff;
  border-radius: 5px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #1877f2;
  border: none;
`;

export const ConfirmButton = styled.button`
  width: 134px;
  height: 37px;
  background-color: #1877f2;
  border-radius: 5px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  border: none;
`;
