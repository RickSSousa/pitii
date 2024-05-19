import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UsersProvider } from "./contexts/UsersContext";
import { ProductsProvider } from "./contexts/ProductsContext";

ReactDOM.render(
  <React.StrictMode>
    <UsersProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </UsersProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
