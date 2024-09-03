import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export const ProtectedRoutes = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies([
    "Email",
    "AuthToken",
  ]);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/" && cookies.AuthToken) {
      return navigate("/menu", { replace: true });
    }

    if (location.pathname === "/" && !cookies.AuthToken) {
      return navigate("/auth", { replace: true });
    }

    if (location.pathname === "/auth" && cookies.AuthToken) {
      return navigate("/menu", { replace: true });
    }

    if (!cookies.AuthToken) {
      return navigate("/auth", { replace: true });
    }
  }, [cookies.AuthToken, location.pathname]);

  return children;
};

const LayoutMenu = () => {
  return (
    <ProtectedRoutes>
      <Outlet />
    </ProtectedRoutes>
  );
};

export default LayoutMenu;
