import React, { useState } from "react";
import { authService } from "../../api/auth.service";
import { ToasterService } from "../../components/common/Toastr";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSignup triggered");
    setLoading(true);

    // --- FRONTEND VALIDATIONS ---
    if (name.length < 3 || name.length > 50) {
      ToasterService.typeError("Name must be between 3 and 50 characters.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToasterService.typeError("Invalid email format.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      ToasterService.typeError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      ToasterService.typeError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // --- API CALL ---
    try {
      await authService.signup({ name, email, password });
      ToasterService.typeSuccess("Signup successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      const msg = err.error || "Signup failed";
      ToasterService.typeError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSignup}
        className="p-5 border rounded shadow-sm bg-white" 
        style={{ minWidth: "460px", maxWidth: "500px" }}
      >
        <h2 className="mb-4 text-center">Sign Up</h2>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>

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

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
