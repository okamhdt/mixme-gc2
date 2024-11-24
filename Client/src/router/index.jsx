import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import App from "../pages/app/index";
import Menu from "../components/main/menu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
]);