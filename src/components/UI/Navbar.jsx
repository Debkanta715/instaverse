import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-b-2xl">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold text-pink-600">InstaVerse</span>
        <span className="text-xs text-gray-400">by D-Tech-Code</span>
      </Link>
      <div className="relative">
        {/* Profile button and dropdown placeholder */}
        <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:shadow-lg transition">
          <span className="material-icons text-gray-600">person</span>
        </button>
        {/* Dropdown menu placeholder */}
      </div>
    </nav>
  );
};

export default Navbar; 