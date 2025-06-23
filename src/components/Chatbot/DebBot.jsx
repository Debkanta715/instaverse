import React, { useState } from 'react';
// import { motion } from 'framer-motion';

const DebBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Chatbot Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open DebBot chatbot"
      >
        <span className="text-3xl">🤖</span>
      </button>
      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl p-4 z-50 animate-fade-in flex flex-col">
          <div className="font-bold text-pink-600 mb-2">DebBot</div>
          <div className="text-gray-600 mb-4">Hi, I'm your friend Debkanta. I'm here to help! Just ask me anything.</div>
          <div className="flex-1 overflow-y-auto mb-2">{/* Chat messages will go here */}</div>
          <input className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Type your message..." />
        </div>
      )}
    </div>
  );
};

export default DebBot; 