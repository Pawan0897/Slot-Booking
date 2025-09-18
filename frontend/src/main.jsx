import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes } from "react-router";
import Layouts from "./Components/Layouts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/Store";
import { Provider } from "react-redux";
const queryclient = new QueryClient();
createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryclient}>
        <BrowserRouter>
          <Layouts />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>

);
