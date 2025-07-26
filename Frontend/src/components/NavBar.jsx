import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon, HomeIcon, ClipboardDocumentListIcon, PlusCircleIcon, ViewColumnsIcon, UsersIcon, UserCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import NotificationBox from '../pages/Notification/NotificationBox';
import useAuthStore from '../stores/authStore';
import NotificationService from '../services/NotificationService';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dismissedTempPassword, setDismissedTempPassword] = useState(false);
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const login = useAuthStore((state) => state.login);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleNotifications = () => setShowNotifications(!showNotifications);
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const userId = user?._id || "";
    const [unreadCount, setUnreadCount] = useState(0);
    console.log(userId)
    // Show temp password reminder if user has auto-generated password and skipped changing it
    const showTempPasswordReminder = user && (user.isAutoGenPass === true || user.requirePasswordChange === true) && user.skipPasswordChange === true && !dismissedTempPassword;

    useEffect(() => {
        const fetchUnreadCount = async () => {
            if (!userId) return;
            try {
                const { allNotifications } = await NotificationService.getNotifications(userId);
                const count = (allNotifications || []).filter(n => !n.isRead).length;
                setUnreadCount(count);
                console.log(count)
            } catch (e) {
                console.error("Error loading notif count", e);
            }
        };
        fetchUnreadCount();
    }, [userId, showNotifications]);

    const handleDismissReminder = () => {
        setDismissedTempPassword(true);
    };

    return (
        <>
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
                                <button onClick={() => setShowNotifications(!showNotifications)} className="relative focus:outline-none">
                                    <BellIcon className="h-6 w-6 text-white" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center 
      justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black bg-red-600 
      rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}

                                </button>
                                <NotificationBox isOpen={showNotifications} onClose={() => setShowNotifications(false)} userId={userId} />
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

            {/* Temporary Password Reminder Banner */}
            {showTempPasswordReminder && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="text-sm text-yellow-800">
                                <strong>Reminder:</strong> You're using a temporary password.
                                <button
                                    onClick={() => navigate('/changepassword')}
                                    className="ml-2 text-yellow-600 hover:text-yellow-900 underline font-medium"
                                >
                                    Change it now
                                </button>
                            </p>
                        </div>
                        <button
                            onClick={handleDismissReminder}
                            className="text-yellow-400 hover:text-yellow-600 focus:outline-none"
                            title="Dismiss reminder"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
