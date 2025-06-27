import React, { useState } from 'react';
import { Link } from 'react-router';
import logo from "../assets/pulse.PNG";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#F4FAF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-12 w-12 w-auto object-contain" />
          </div>
          <div className="hidden md:flex space-x-16 text-lg">
            <Link to="/" className="text-gray-700 hover:text-[#612D2D] hover:underline transition">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#612D2D] hover:underline transition">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-[#612D2D] hover:underline transition">Services</Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#612D2D] hover:underline transition">Contact</Link>
          </div>
          
          <div>
            <Link to="/register" className="btn hidden md:inline-block bg-[#A5D395] px-4 py-1 rounded-full">Login / Signup</Link>
          </div>
  
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600 transition">About</Link>
          <Link to="/services" className="block text-gray-700 hover:text-blue-600 transition">Services</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
