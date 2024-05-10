import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import router from "./router";
import queryClient from "./services/queryClient";
import GlobalStyles from "./styles/GlobalStyles";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
        <Toaster />
        <GlobalStyles />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
