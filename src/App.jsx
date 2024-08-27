import { useState } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex items-center">
        <div className="w-full flex justify-center p-4">
          {!authToken ? <Auth /> : <Outlet />}
          {/* {authToken && <Profile />} */}
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default App;
