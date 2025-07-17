import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Devsernal.png';


const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-black text-gray-900 dark:text-white flex justify-between items-center">
      {/* Left: Logo */}
      <Link to="/">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Devsernal Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
      </Link>

      {/* Center: Navigation */}
        <nav className="flex gap-6 text-lg font-medium">
        <Link to="/tools" className="hover:text-[#33691E] transition">
            Tools
        </Link>
        <Link to="/saved" className="hover:text-[#33691E] transition">
            Saved Tools
        </Link>
        </nav>

      {/* Right: Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
    </header>
  );
};

export default AppLayout;
