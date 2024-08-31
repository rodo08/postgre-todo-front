import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Auth from "../components/Auth";
import Menu from "../pages/Menu";
import Wall from "../pages/Wall";
import Tasks from "../pages/Tasks";
import TarotHut from "../pages/TarotHut";
import LayoutMenu, { ProtectedRoutes } from "../Layouts/LayoutMenu";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "auth",
        element: <Auth />,
      },

      {
        path: "menu",
        element: <LayoutMenu />,
        children: [
          { path: "", element: <Menu /> },
          { path: "wall", element: <Wall /> },
          { path: "tasks", element: <Tasks /> },
          { path: "tarot-hut", element: <TarotHut /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
