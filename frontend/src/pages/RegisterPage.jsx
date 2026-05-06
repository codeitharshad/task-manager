import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  //register
  const handleRegister = async () => {
    try {
      setError("");

      await registerUser(formData);

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      if (error.response?.data) {
        const errors = Object.values(error.response.data);

        setError(errors[0]);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
      <div className="bg-gray-900 border border-gray-800 p-10 rounded-2xl w-full max-w-md shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>

          <p className="text-gray-400">Register as a team member</p>
        </div>

        {error && (
          <div className="bg-red-600 mb-5 p-3 rounded-lg text-sm">{error}</div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 outline-none"
          />

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
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-semibold"
          >
            Register
          </button>
        </div>

        {/* LOGIN LINK */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?
          <Link to="/" className="text-blue-400 ml-2 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
