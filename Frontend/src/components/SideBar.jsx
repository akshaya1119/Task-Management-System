import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white hidden md:block">
      <div className="h-full p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block hover:bg-blue-800 p-2 rounded">Home</Link>
          <Link to="/dashboard/tickets" className="block hover:bg-blue-800 p-2 rounded">Tickets</Link>
          <Link to="/dashboard/settings" className="block hover:bg-blue-800 p-2 rounded">Settings</Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
