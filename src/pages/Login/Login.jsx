import { useEffect, useRef, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);
  const { login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`login ${loading ? "login--loading" : ""}`}>
      {loading ? (
        <div className="login-loading-screen">
          <img src={netflix_spinner} alt="Loading" />
        </div>
      ) : (
        <>
          <img src={logo} alt="logo" className="login-logo" />
          <div className="login-form">
            <h1>{signState}</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                setLoading(true);
                timeoutRef.current = setTimeout(() => {
                  login();
                  navigate("/home");
                }, 1200);
              }}
            >
              {signState === "Sign Up" && (
                <input type="text" placeholder="Your name" required />
              )}
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button>{signState}</button>
              <div className="form-help">
                <div className="remember">
                  <input type="checkbox" />
                  <label htmlFor="">Remember Me</label>
                </div>
                <p>Need Help?</p>
              </div>
            </form>

            <div className="form-switch">
              {signState === "Sign In" ? (
                <p>
                  New to Netflix?{" "}
                  <span
                    onClick={() => {
                      setSignState("Sign Up");
                    }}
                  >
                    Sign Up Now
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setSignState("Sign In");
                    }}
                  >
                    Sign In Now
                  </span>
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
