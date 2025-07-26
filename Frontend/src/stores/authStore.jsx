// import { create } from 'zustand';

// const useAuthStore = create((set) => ({
//   isAuthenticated: !!localStorage.getItem('user'),
//   user: (() => {
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   })(),

//   login: (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     set({ isAuthenticated: true, user: userData });
//   },

//   logout: () => {
//     localStorage.removeItem('user');
//     set({ isAuthenticated: false, user: null });
//   },
// }));

// export default useAuthStore;


import { create } from 'zustand';

const useAuthStore = create((set) => {
  // Load from localStorage once when store initializes
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

  return {
    isAuthenticated: !!storedUser,
    user: storedUser,

    login: (userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      set({ isAuthenticated: true, user: userData });
    },

    logout: () => {
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: null });
    },

    setUser: (userData) => {
      set({ user: userData });
    }
  };
});

export default useAuthStore;
