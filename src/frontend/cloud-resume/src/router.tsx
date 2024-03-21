import App from "./App";
import "./styles/globals.css";
import { createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import FullPage from "./pages/FullPage";
import CrowdfundingRootPage from "./pages/CrowdfundingRootPage";
import CrowdfundingIndexPage from "./pages/CrowdfundingIndexPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <FullPage />
      },
      {
        path: "crowdfunding",
        element: <CrowdfundingRootPage />,
        children: [
          {
            index: true,
            element: <CrowdfundingIndexPage />
          },
          {
            path: "create",
            element: <div>Hello crowdfunding create!</div>
          },
          {
            path: "manage/:contract",
            loader: ({ params }) => {
              return params;
            },
            element: <div>Hello crowdfunding manage!</div>
          },
        ]
      },
      {
        path: "pricing",
        element: <div>Hello pricing!</div>
      },
      {
        path: "blog",
        element: <div>Hello blog!</div>
      }
    ]
  }
]);

export default router;
