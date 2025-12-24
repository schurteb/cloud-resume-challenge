// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import App from "./App";
import "./styles/globals.css";
import { createBrowserRouter } from "react-router-dom";
import FullPage from "./pages/FullPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <FullPage />
      }
    ]
  }
]);

export default router;
