import RouterContainer from "./routes/RouterContainer";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme/theme";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
