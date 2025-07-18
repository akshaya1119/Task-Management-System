import React from 'react';
import { Outlet } from 'react-router-dom';

const OuterLayout = () => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#003366',
    color: '#ffffff',
  };

  const mainStyle = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#003366',
    color: '#ffffff',
  };

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>
        <h2>Welcome to Ticket Management System</h2>
      </header>

      <main style={mainStyle}>
        <Outlet />
      </main>

      <footer style={footerStyle}>
        <p>&copy; 2025 Ticket System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OuterLayout;
