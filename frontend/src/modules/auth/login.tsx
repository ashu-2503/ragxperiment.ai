import React, { useState } from "react";
import "../../style.css";

interface LoginProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    onLogin();
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2 className="auth-title">Login</h2>

        <label className="auth-label">
          Email
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="auth-label">
          Password
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="auth-button login-button">
          Login
        </button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <button type="button" className="link-button" onClick={onSwitchToSignup}>
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
