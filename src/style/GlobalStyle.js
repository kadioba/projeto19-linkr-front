import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box !important;
        font-family: "Lato", sans-serif;
        font-weight: 400;
    }
    :root {
        --white: #FFFFFF;
        --gray: #9F9F9F;
        --darkGray: #151515;
        --charcoal: #333333;
        --facebookBlue: #1877F2;
        --black: #171717;
    }
    body {
        height: 100vh;
        min-width: 375px;
        background-color: var(--charcoal);
    }
`;
