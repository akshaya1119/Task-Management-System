import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4005', {
  transports: ['websocket'],
});

const SocketComponent = ({ userId }) => {
  useEffect(() => {
    if (!userId) return;

    socket.emit('join', userId);
    console.log('Joined room:', userId);

    // Example: Listen for some server event
    socket.on('message', (data) => {
      console.log('📨 New Message:', data);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, [userId]);

  return (
    <div className="p-4 bg-green-100 rounded">
      <h3 className="font-bold">Connected via Socket.IO</h3>
    </div>
  );
};

export default SocketComponent;
