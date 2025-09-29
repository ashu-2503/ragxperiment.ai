import React, { useState } from "react";
import { authService } from "../../api/auth.service";
import { ToasterService } from "../../components/common/Toastr";
import { useNavigate } from "react-router-dom";
import logImg from "../../assets/images/log.svg";
import registerImg from "../../assets/images/register.svg";
import "../../styles/auth.css";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  // Toggle between sign-up and sign-in
  const [isSignUpMode, setSignUpMode] = useState(true);

  // --- SIGN UP STATE ---
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // --- LOGIN STATE ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // --- PASSWORD TOGGLE ---
  const [inputTypeSignup, setInputTypeSignup] = useState("password");
  const [inputTypeLogin, setInputTypeLogin] = useState("password");

  const togglePasswordSignup = () =>
    setInputTypeSignup(prev => (prev === "password" ? "text" : "password"));

  const togglePasswordLogin = () =>
    setInputTypeLogin(prev => (prev === "password" ? "text" : "password"));

  // --- SIGN UP ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);

    if (name.length < 3 || name.length > 50) {
      ToasterService.typeError("Name must be between 3 and 50 characters.");
      setSignupLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      ToasterService.typeError("Invalid email format.");
      setSignupLoading(false);
      return;
    }

    if (signupPassword.length < 8) {
      ToasterService.typeError("Password must be at least 8 characters.");
      setSignupLoading(false);
      return;
    }

    if (signupPassword !== confirmPassword) {
      ToasterService.typeError("Passwords do not match.");
      setSignupLoading(false);
      return;
    }

    try {
      await authService.signup({
        name,
        email: signupEmail,
        password: signupPassword,
      });
      ToasterService.typeSuccess("Signup successful! Please login.");
      setSignUpMode(false); // automatically switch to login
    } catch (err: any) {
      const msg = err?.error || "Signup failed";
      ToasterService.typeError(msg);
      console.error(err);
    } finally {
      setSignupLoading(false);
    }
  };

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      ToasterService.typeError("Invalid email format.");
      setLoginLoading(false);
      return;
    }

    try {
      const data = await authService.login({
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      ToasterService.typeSuccess("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      const msg = err?.error || "Login failed";
      ToasterService.typeError(msg);
      console.error(err);
    } finally {
      setLoginLoading(false);
    }
  };

  // Toggle handler for panel buttons
  const toggleMode = () => setSignUpMode(prev => !prev);

  return (
    <div className={`container1 ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* SIGN IN FORM */}
          <form className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign In</h2>

            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type={inputTypeLogin}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <i
                className="fas fa-eye"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordLogin}
              />
            </div>

            <button type="submit" className="btn solid" disabled={loginLoading}>
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* SIGN UP FORM */}
          <form className="sign-up-form" onSubmit={handleSignup}>
            <h2 className="title">Sign Up</h2>

            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type={inputTypeSignup}
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <i
                className="fas fa-eye"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordSignup}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type={inputTypeSignup}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn" disabled={signupLoading}>
              {signupLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      {/* PANELS */}
      <div className="panels-container">
        {/* LEFT PANEL */}
        <div className="panel left-panel">
          <div className="content">
            
            <h3>New here?</h3>
            <p>Sign up and start using the app!</p>
            <button className="btn transparent" onClick={toggleMode}>
              Sign up
            </button>
          </div>
          <img src={logImg} className="image" alt="Login" />
        </div>

        {/* RIGHT PANEL */}
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Login and get started!</p>
            <button className="btn transparent" onClick={toggleMode}>
              Sign in
            </button>
          </div>
          <img src={registerImg} className="image" alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
