import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon, HomeIcon, ClipboardDocumentListIcon, PlusCircleIcon, ViewColumnsIcon, UsersIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import NotificationBox from '../pages/Notification/NotificationBox';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="bg-blue-900 text-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2">
                            🎟️ TicketSystem
                        </Link>
                    </div>
                    <div>
                        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white rounded-md px-2 py-1 w-72">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search tickets, users, etc..."
                                className="w-full text-black bg-transparent focus:outline-none"
                            />
                            <button type="submit" className="text-blue-900 font-bold">
                                🔍
                            </button>
                        </form>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/dashboard" className="flex items-center gap-1 hover:text-gray-300 transition">
                            <HomeIcon className="h-5 w-5" />
                        </Link>
                        <Link to="/dashboard/all-ticket" className="flex items-center gap-1 hover:text-gray-300 transition">
                            <ClipboardDocumentListIcon className="h-5 w-5" />
                        </Link>
                        <Link to="/dashboard/add-ticket" className="flex items-center gap-1 hover:text-gray-300 transition">
                            <PlusCircleIcon className="h-5 w-5" />
                        </Link>
                        <Link to="/dashboard/kanban-board" className="flex items-center gap-1 hover:text-gray-300 transition">
                            <ViewColumnsIcon className="h-5 w-5" />
                        </Link>
                        <Link to="/dashboard/masters" className="flex items-center gap-1 hover:text-gray-300 transition">
                            <UsersIcon className="h-5 w-5" />
                        </Link>
                        <Link to="/profile" className="flex items-center gap-1 hover:text-gray-300 transition">
                            <UserCircleIcon className="h-5 w-5" />
                        </Link>

                        {/* Notification Icon */}
                        <div className="relative">
                            <button onClick={toggleNotifications} className="focus:outline-none relative">
                                <BellIcon className="h-6 w-6" />
                            </button>
                            {showNotifications && (
                                <NotificationBox onClose={() => setShowNotifications(false)} userId={"687b6217fece4c25bb1f6f01"} />
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <button onClick={toggleNotifications} className="focus:outline-none">
                            <BellIcon className="h-6 w-6" />
                        </button>
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

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-2 text-white hover:text-gray-300">
                        <HomeIcon className="h-5 w-5" /> Dashboard
                    </Link>
                    <Link to="/dashboard/all-ticket" className="flex items-center gap-2 text-white hover:text-gray-300">
                        <ClipboardDocumentListIcon className="h-5 w-5" /> Tickets
                    </Link>
                    <Link to="/dashboard/add-ticket" className="flex items-center gap-2 text-white hover:text-gray-300">
                        <PlusCircleIcon className="h-5 w-5" /> Create
                    </Link>
                    <Link to="/dashboard/kanban-board" className="flex items-center gap-2 text-white hover:text-gray-300">
                        <ViewColumnsIcon className="h-5 w-5" /> Kanban Board
                    </Link>
                    <Link to="/dashboard/masters" className="flex items-center gap-2 text-white hover:text-gray-300">
                        <UsersIcon className="h-5 w-5" /> Master
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 text-white hover:text-gray-300">
                        <UserCircleIcon className="h-5 w-5" /> Profile
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
