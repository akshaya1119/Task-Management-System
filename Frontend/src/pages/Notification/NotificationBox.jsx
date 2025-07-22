import React from 'react';

const NotificationBox = ({ onClose }) => {
    return (
        <div className="absolute top-16 right-4 w-72 bg-white text-black rounded-lg shadow-lg p-4 z-50">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Notifications</h2>
                <button onClick={onClose} className="text-red-500 font-bold text-xl">×</button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="bg-gray-100 p-2 rounded">✅ New ticket assigned to you</div>
                <div className="bg-gray-100 p-2 rounded">📢 System Maintenance Scheduled</div>
                <div className="bg-gray-100 p-2 rounded">📅 Kanban board updated</div>
            </div>
        </div>
    );
};

export default NotificationBox;
