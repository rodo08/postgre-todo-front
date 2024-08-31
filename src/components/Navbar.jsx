import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Eclectica } from "./Icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies(null);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const navigate = useNavigate();

  const signOut = () => {
    setIsLoading(true);
    try {
      console.log("Sign out");
      removeCookie("Email");
      removeCookie("AuthToken");
      navigate("/");
      window.location.reload();
    } catch {
      console.log("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex justify-between items-center gap-8 p-4">
      <Link to={authToken ? "/menu" : "/"}>
        <div className="w-full flex items-center gap-1">
          <Eclectica />
          <span className="text-3xl font-bold highlight md:flex hidden">
            eclectica
          </span>
        </div>
      </Link>

      {authToken ? (
        <div className="flex gap-4 items-center">
          <p>
            Welcome <b>{userEmail}</b>
          </p>
          <button onClick={signOut}>
            {isLoading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <p className="text-black-500 text-xl text-[#ba94ff] leading-6">
            Hop on!
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
