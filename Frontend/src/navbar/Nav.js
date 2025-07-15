import React from 'react';
import { Home, LayoutGrid, Ticket, Folder, Users, Settings } from 'lucide-react';

const Nav = () => {
  const navItems = [
    { name: 'Dashboard', icon: <Home className="w-4 h-4 mr-2" />, active: true },
    { name: 'Kanban Board', icon: <LayoutGrid className="w-4 h-4 mr-2" /> },
    { name: 'All Tickets', icon: <Ticket className="w-4 h-4 mr-2" /> },
    { name: 'Projects', icon: <Folder className="w-4 h-4 mr-2" /> },
    { name: 'Team', icon: <Users className="w-4 h-4 mr-2" /> },
    { name: 'Settings', icon: <Settings className="w-4 h-4 mr-2" /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">TicketFlow</h2>
      <nav className="space-y-4">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className={`flex items-center text-sm font-medium hover:text-blue-600 transition-colors ${item.active ? 'text-blue-600' : 'text-gray-700'}`}
          >
            {item.icon}
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Nav;