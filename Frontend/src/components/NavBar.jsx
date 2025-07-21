import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/dashboard" className="text-xl font-bold">
                            🎟️ TicketSystem
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/dashboard" className="hover:text-gray-300 transition">
                            Dashboard
                        </Link>
                        <Link to="/dashboard/all-ticket" className="hover:text-gray-300 transition">
                            Tickets
                        </Link>
                        <Link to="/dashboard/add-ticket" className="hover:text-gray-300 transition">
                            Create
                        </Link>
                        <Link to="/dashboard/kanban-board" className="hover:text-gray-300 transition">
                            Kanban Board
                        </Link>
                        <Link to="/dashboard/view-users" className="hover:text-gray-300 transition">
                            Users
                        </Link>
                        <Link to="/profile" className="hover:text-gray-300 transition">
                            Profile
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            {menuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-2">
                    <Link to="/dashboard" className="block text-white hover:text-gray-300">
                        Dashboard
                    </Link>
                    <Link to="/dashboard/all-ticket" className="block text-white hover:text-gray-300">
                        Tickets
                    </Link>
                    <Link to="/dashboard/kanban-board" className="block text-white hover:text-gray-300">
                        Kanban Board
                    </Link>
                    <Link to="/dashboard/view-users" className="block text-white hover:text-gray-300">
                        Users
                    </Link>
                    <Link to="/profile" className="block text-white hover:text-gray-300">
                        Profile
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
