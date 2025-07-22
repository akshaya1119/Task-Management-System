import React, { useState, useEffect } from 'react';
import NotificationService from '../../services/NotificationService';  // Adjust the path if necessary

const NotificationBox = ({ onClose, userId }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications when the component is mounted
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await NotificationService.getNotifications(userId);
        setNotifications(fetchedNotifications.allNotifications);  // Assuming response is an array of notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);  // Re-fetch when userId changes

  // Mark a single notification as read
  const MarkAsRead = async (notificationId) => {
    try {
      await NotificationService.markAsRead(notificationId); // Call API to mark as read
      // Update the local state by marking the notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const MarkAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead(userId); // Call API to mark all as read
      // Update the local state to set all notifications as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <div className="absolute top-16 right-4 w-72 bg-white text-black rounded-lg shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Notifications</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">×</button>
        <button
          onClick={MarkAllAsRead}
          className="text-blue-500 font-bold text-sm"
        >
          Mark All as Read
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {/* Render notifications dynamically */}
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className={`bg-gray-100 p-2 rounded ${notification.isRead ? 'bg-gray-200' : ''}`}
            >
              <div>{notification.message}</div>
              {!notification.isRead && (
                <button
                  onClick={() => MarkAsRead(notification.id)}
                  className="text-sm text-blue-500"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="bg-gray-100 p-2 rounded">No notifications available.</div>
        )}
      </div>
    </div>
  );
};

export default NotificationBox;
