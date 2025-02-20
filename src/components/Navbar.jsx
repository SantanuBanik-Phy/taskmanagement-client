import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
        {/* Logo/Title */}
        <Link to="/" className="text-white text-3xl font-extrabold tracking-wide mb-2 md:mb-0 transition-transform transform hover:scale-110">
          Task Manager
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/about"
            className="text-white text-lg font-medium hover:text-teal-200 transition-colors duration-300"
          >
            About
          </Link>

          {/* User Authentication Section */}
          {/* Add any user-related content (e.g., login/logout) here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
