import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Outlet } from "react-router-dom";
import Auth from "../components/Auth";
import Menu from "../pages/Menu";
import Wall from "../pages/Wall";
import Tasks from "../pages/Tasks";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: "/",
        element: <Auth />,
      },
      {
        path: "menu",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Menu />,
          },

          {
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "wall",
            element: <Wall />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
