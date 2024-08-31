import { useState } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  console.log(!authToken ? true : false);

  return (
    <div className="h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="container mx-auto flex items-center">
        <div className="w-full flex justify-center p-4">
          {/* {!authToken ? <Auth /> : <Outlet />} */}
          <Outlet />
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default App;
