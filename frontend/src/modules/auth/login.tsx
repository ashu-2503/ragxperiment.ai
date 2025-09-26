import React, { useState } from "react";
import { authService } from "../../api/auth.service";
import { useNavigate } from "react-router-dom";
import { ToasterService } from "../../components/common/Toastr";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await authService.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      ToasterService.typeSuccess("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      const msg = err?.error || "Login failed";
      ToasterService.typeError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleLogin}
        className="p-4 border rounded shadow-sm bg-white"
        style={{ minWidth: "320px", maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;

