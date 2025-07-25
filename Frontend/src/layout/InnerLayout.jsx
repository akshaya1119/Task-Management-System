import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const InnerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-grey">
      {/* Top Navbar */}
      <Navbar />

      {/* Content section with sidebar + main */}
      <div className="flex flex-1">
        {/* Sidebar */}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InnerLayout;
