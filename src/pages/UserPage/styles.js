import styled, { keyframes } from "styled-components";

export const ContainerUserPage = styled.div`
<<<<<<< HEAD
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 0px 25px;
`;

export const ContentUserPage = styled.div`
  width: 610px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: start;

  @media (max-width: 620px) {
    width: 100%;
  }

  > div:nth-of-type(1) {
=======
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeaderUserPage = styled.div`
>>>>>>> main
    width: 100%;
    min-height: 64px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    @media (max-width: 890px) {
        flex-direction: column;
        align-items: center;
    }

    >div:nth-of-type(1){
        width: 610px;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: calc((100% - 936px) / 2);

        @media (max-width: 936px){
            margin-left: 0px;
        }

        @media (max-width: 610px){
            width: 100%;
        }

        @media (max-width: 520px) {
            flex-direction: column;
            align-items: center;
            gap: 5px 0px;
        }

        >img{
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 26.5px;
            margin-left: 18px;
            margin-right: 18px;
        }

        >p{
            width: 700px;
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 700;
            font-size: 43px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            word-break: break-all;

            @media (max-width: 610px) {
                width: 100%;
                justify-content: center;
                text-align: center;
            }
        }
    }

    >button{
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: calc((100% - 936px) / 2);
        border: none;
        cursor: pointer;

        @media (max-width: 936px){
            margin-right: 0px;
        }

        @media (max-width: 890px){
            margin-top: 20px;
        }
    }
`;

export const ContentUserPage = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    gap: 0px 25px;

    >div:nth-of-type(1){
        width: 610px;
        min-height: 500px;
        height: auto;
        gap: 16px 0px;
        display: flex;
        flex-direction: column;

        @media (max-width: 610px){
            width: 100%;
        }
    }
`;

export const TrendingHashtagsContainer = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    padding: 9px 16px;
    box-sizing: border-box;

  @media (max-width: 890px) {
    display: none;
  }
`;

export const TrendingHashtagsTitle = styled.h2`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
`;

export const ContentDivider = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid #484848;
  margin-top: 12px;
  margin-bottom: 22px;
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

export const ImagePlaceholder = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin-left: 18px;
  margin-right: 18px;
  animation: ${shimmerAnimation} 1.3s linear infinite;
  background: linear-gradient(to right, #f2f2f2, #dddddd);
`;

export const TextPlaceholder = styled.span`
  width: 300px;
  height: 43px;
  animation: ${shimmerAnimation} 1.3s linear infinite;
  background: linear-gradient(to right, #f2f2f2, #dddddd);

  @media (max-width: 610px) {
    width: 100%;
    height: 43px;
  }
`;
