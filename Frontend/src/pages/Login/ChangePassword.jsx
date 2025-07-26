import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

const ChangePassword = () => {
  const [userId, setUserId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSkipForNow = () => {
    // Update user data to temporarily skip password change for this session
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      const updatedUser = { 
        ...currentUser, 
        skipPasswordChange: true // Temporary flag for this session
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      login(updatedUser);
    }
    
    navigate('/dashboard');
  };

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser._id);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!oldPassword || !newPassword || !confirmPassword) {
      return setMessage({ type: 'error', text: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return setMessage({ type: 'error', text: 'New passwords do not match' });
    }

    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        oldPassword,
        newPassword,
        confirmPassword,
      }, {
        withCredentials: true
      });

      setMessage({ type: 'success', text: response.data.message || 'Password updated successfully! Redirecting to dashboard...' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Update user data to reflect that password is no longer auto-generated
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) {
        const updatedUser = { ...currentUser, isAutoGenPass: false, requirePasswordChange: false };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        login(updatedUser);
      }
      
      // Redirect to dashboard after successful password change
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // 2 second delay to show success message
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'An error occurred while changing password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Change Password</h2>
      
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Security Recommendation:</strong> You're currently using a temporary or auto-generated password. 
          For better security, we recommend changing it to something personal and memorable. 
          You can also skip this step and change it later if you prefer.
        </p>
      </div>

      {message.text && (
        <div
          className={`mb-4 text-sm text-center font-medium ${
            message.type === 'error' ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            type="password"
            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none mb-3"
        >
          {loading ? 'Updating...' : 'Change Password'}
        </button>
      </form>

      {/* Skip Option */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSkipForNow}
          className="text-sm text-gray-600 hover:text-gray-800 underline focus:outline-none"
          disabled={loading}
        >
          Skip for now, I'll change it later
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
