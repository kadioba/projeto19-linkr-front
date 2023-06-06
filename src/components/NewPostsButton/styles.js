import styled from "styled-components";

export const NewPostsButton = styled.button`
  width: 611px;
  height: 61px;
  margin-bottom: 29px;
  background: rgb(43, 178, 170);
  background: linear-gradient(90deg, rgba(43, 178, 170, 1) 0%, rgba(24, 119, 242, 1) 100%);
  border-radius: 5px;
  border: none;
  color: white;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  box-shadow: 1px 10px 2rem rgba(24, 119, 242, 0.5);
  transition: all 0.2s ease-in;
  cursor: pointer;

  :hover {
    box-shadow: 0px 5px 1rem rgba(24, 119, 242, 0.5);
  }

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
