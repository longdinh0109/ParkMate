import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi"; // ✅ import API login

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await authApi.login({ email, password });
        console.log("✅ Login success:", res.data);

        // Lưu token (tuỳ backend trả về accessToken hay token)
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        alert("Login successful!");
        navigate("/partner-home"); // 👉 đổi path tuỳ trang sau login
      } catch (err) {
        console.error("❌ Login failed:", err);
        setApiError("Invalid email or password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
            <span className="text-white text-xl font-bold">P</span>
          </div>
          <h2 className="text-xl font-semibold">Parking Partner</h2>
          <p className="text-sm text-gray-500">Partner Login</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* API error */}
          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
