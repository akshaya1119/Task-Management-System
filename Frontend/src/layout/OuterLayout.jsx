import React from 'react';
import { Outlet } from 'react-router-dom';

const OuterLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <header className="bg-blue-900 text-white text-center py-6 shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold">
          🎟️ Ticket Management System
        </h2>
      </header>

      <main className="flex flex-grow justify-center items-start p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-6xl bg-white p-6 sm:p-10 rounded-lg shadow-lg">
          <Outlet />
        </div>
      </main>

      <footer className="bg-blue-900 text-white text-center py-4 text-sm">
        &copy; 2025 Ticket System. All rights reserved.
      </footer>
    </div>
  );
};

export default OuterLayout;
