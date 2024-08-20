import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
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
          className="flex flex-col gap-4 pb-20"
          onSubmit={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
        >
          <h1>{isLogIn ? "Sign In" : "Sign Up"}</h1>
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
            <button>Submit</button>
          </div>

          {/* <input type="submit" className="create" /> */}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Auth;
