import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  //input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //login
  const handleLogin = async () => {
    try {
      setError("");
      
      //save info tto local
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);

      //redirect
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
      <div className="bg-gray-900 border border-gray-800 p-10 rounded-2xl w-full max-w-md shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Task Manager</h1>

          <p className="text-gray-400">Login to continue</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-600 mb-5 p-3 rounded-lg text-sm">{error}</div>
        )}

        
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 outline-none"
          />

          
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>

        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            New user?
            <Link
              to="/register"
              className="text-blue-400 ml-2 hover:text-blue-300"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
