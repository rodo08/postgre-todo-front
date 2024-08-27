import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Eclectica } from "./Icons";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const navigate = useNavigate();

  const signOut = () => {
    console.log("Sign out");
    removeCookie("Email");
    removeCookie("AuthToken");
    navigate("");
    //window.location.reload();
  };

  return (
    <div className="container mx-auto flex justify-between items-center gap-8 p-4">
      <div className="flex items-center gap-1">
        <Eclectica />
        <span className="text-3xl font-bold highlight md:flex hidden">
          eclectica
        </span>
      </div>

      {authToken ? (
        <div className="flex gap-4 items-center">
          <p>
            Welcome <b>{userEmail}</b>
          </p>
          <button onClick={signOut}>Sign out</button>
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
