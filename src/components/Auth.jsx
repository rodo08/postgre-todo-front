import { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { HomeIllustration } from "../components/Icons";

const Auth = () => {
  const [cookies, setCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);
  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const data = await response.json();

      if (data.detail) {
        setError(data.detail);
      } else {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);

        navigate("/menu");

        window.location.reload();
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container grid md:grid-cols-2 sm:grid-cols-1 my-auto">
        <div className="flex flex-col justify-center items-center">
          <HomeIllustration />
        </div>

        <div
          className="flex flex-col justify-center items-center"
          ref={formRef}
        >
          <h2 className="pt-8 highlight">Welcome to Eclectica!</h2>
          <p className="text-center pb-8">
            Switch the buttons below either if you already have an account{" "}
            <br />
            <strong> hit Sign In</strong> or
            <strong> hit Sign up</strong> to join!
          </p>
          <div className="flex gap-10 pb-10">
            <button
              onClick={() => viewLogin(false)}
              style={{
                backgroundColor: isLogIn ? "rgb(255, 255, 255)" : "#d1b8ff",
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => viewLogin(true)}
              style={{
                backgroundColor: !isLogIn ? "rgb(255, 255, 255)" : "#d1b8ff",
              }}
            >
              Sign In
            </button>
          </div>
          <div className="auth-container-box">
            <form
              className="flex flex-col justify-between h-[340px] gap-4 "
              onSubmit={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
            >
              <h1 className="highlight text-center">
                {isLogIn ? "Sign In" : "Sign Up"}
              </h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogIn && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
              <div className="flex justify-end">
                {isLoading ? (
                  <h2>Loading...</h2>
                ) : (
                  <button className="">Submit</button>
                )}
              </div>

              {error && <p className="highlight">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
