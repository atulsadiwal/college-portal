'use client';

import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-white text-3xl font-bold tracking-wide hover:opacity-90">
          College<span className="text-yellow-400">Portal</span>
        </a>

        <nav className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300"
          >
            About
          </a>
          <a
            href="/program"
            className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300"
          >
            Programs
          </a>
          <a
            href="/contact"
            className="text-white text-lg py-2 hover:text-yellow-400 transition duration-300"
          >
            Contact
          </a>

          <Link
            href="/login"
            className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition duration-300"
          >
            Login
          </Link>
        </nav>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="bg-blue-800 md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a
              href="#"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#programs"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </a>
            <a
              href="#contact"
              className="text-white text-lg hover:text-yellow-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              href="/login"
              className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
