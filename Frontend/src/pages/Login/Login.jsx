import React, { useState } from 'react';
import useAuthStore from '../../stores/authStore'; // adjust path as needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include", // this allows cookies to be stored
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }


      // Save token if needed (optional — already in cookies)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user details with password flags
      const userWithFlags = {
        ...data.user,
        isAutoGenPass: data.isAutoGenPass || false,
        requirePasswordChange: data.requirePasswordChange || false
      };
      localStorage.setItem("user", JSON.stringify(userWithFlags));

      // Zustand store update
      login(userWithFlags);
      
      console.log("Login successful, user data:", userWithFlags);
      
      // Navigate to dashboard - ProtectedRoute will handle redirection to change password if needed
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
          Sign in to your account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:underline"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
