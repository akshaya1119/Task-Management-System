import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    // Simple email format check (not perfect)
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setSubmitted(true);

    // TODO: Replace with actual API call
    console.log('Password reset link sent to:', email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
          Forgot Password
        </h2>

        {submitted ? (
          <div className="text-green-600 text-center">
            ✅ A reset link has been sent to your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="text-sm text-gray-600 text-center mt-6">
          Remembered your password?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Go back to login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
