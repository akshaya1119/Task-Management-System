import React, { useState, useEffect } from 'react';
import NotificationService from '../../services/NotificationService';

const NotificationBox = ({ isOpen, onClose, userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId || !isOpen) return;

    const fetchNotifications = async () => {
      try {
        const { allNotifications } = await NotificationService.getNotifications(userId);
        setNotifications(allNotifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId, isOpen]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (notificationId) => {
    try {
      await NotificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => n.id === notificationId ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead(userId);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  return (
    <>
      {/* Offcanvas Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}

      {/* Offcanvas Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-500 hover:underline"
          >
            Mark All as Read
          </button>
          <button onClick={onClose} className="text-xl font-bold text-gray-600 hover:text-red-500">×</button>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
          {notifications.length ? (
            notifications.map((n, index) => (
              <div
                key={index}
                className={`p-3 rounded shadow-sm ${n.isRead ? 'bg-gray-100' : 'bg-blue-50 border-l-4 border-blue-400'}`}
              >
                <div>{n.message}</div>
                {!n.isRead && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-sm text-blue-500 hover:underline mt-1"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">No notifications available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationBox;
