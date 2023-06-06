import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: charcoal;
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  gap: 0px 25px;
  justify-content: center;
`;

export const HashtagPageContainer = styled.main`
  width: 100%;
  max-width: 600px;
`;

export const HashtagTitle = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin-bottom: 43px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const TrendingHashtagsContainer = styled.div`
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  margin-top: 107px;
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
