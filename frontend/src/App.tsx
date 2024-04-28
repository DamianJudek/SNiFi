import RouterContainer from "./routes/RouterContainer";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
