import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App.jsx";
import "flowbite/dist/flowbite.min.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserContextProvider from "./components/Context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./components/Context/CartContext.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <UserContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
