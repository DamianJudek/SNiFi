import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.MuiList-root {
    background-color: ${({ theme }) => theme.palette.black} !important;
    border-radius: 5px  !important;
}

.MuiPaper-root {
    border-radius: 5px !important;
    padding: 5px;
    background-color: ${({ theme }) => theme.palette.black} !important;
}
`;

export default GlobalStyle;
