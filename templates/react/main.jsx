import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";

const root = document.getElementById("root");

const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  // ...
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);