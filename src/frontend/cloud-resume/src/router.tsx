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
