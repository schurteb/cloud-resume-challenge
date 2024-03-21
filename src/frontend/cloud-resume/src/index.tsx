import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Localhost } from "@thirdweb-dev/chains";
import "./styles/globals.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = process.env.NODE_ENV === "production" ? Ethereum : Localhost;

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    {/*<ThirdwebProvider activeChain={activeChain}
      autoConnect={true}
      dAppMeta={{
        name: "My App",
        description: "My app description",
        logoUrl: "https://example.com/logo.png",
        url: "https://example.com",
        isDarkMode: true,
      }}
    >*/}
      
      <RouterProvider router={router} />
    {/*</ThirdwebProvider>*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
