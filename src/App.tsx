import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Setting up the project environment | ReactJS</h1>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
