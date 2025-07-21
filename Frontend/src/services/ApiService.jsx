// This file contains a custom Axios instance for making API requests.
// It sets up a base URL and includes an interceptor for adding authentication tokens.
// To use, import this file and call methods like API.get(), API.post(), etc.

// Import axios library for making HTTP requests
import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_URL; // Base URL from Vite env or fallback

// Create an Axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to attach the token to all requests
API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP errors
      switch (error.response.status) {
        case 401:
          // Unauthorized: Clear token and redirect to login
          console.warn('Unauthorized access. Redirect to login or notify user.');
          // Implement redirect to login page here
          break;
        case 403:
          // Forbidden: Handle access denied
          console.error('Access denied');
          break;
        // Add more cases as needed
      }
    }
    return Promise.reject(error);
  }
);

export default API;
