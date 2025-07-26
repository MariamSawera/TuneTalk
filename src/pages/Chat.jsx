import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', {
        message,
        time: new Date().toLocaleTimeString(),
      });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Real-Time Chat</h2>

      <div className="h-64 overflow-y-auto border p-2 mb-2 bg-white text-black rounded">
        {chat.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <span className="text-sm text-gray-600">{msg.time}:</span> {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 rounded text-black"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-cyan-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
