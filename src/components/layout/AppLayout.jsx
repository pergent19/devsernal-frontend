import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Devsernal.png";

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links array
  const navLinks = [
    { to: "/tools", label: "TOOLS" },
    { to: "/saved-items", label: "SAVED TOOLS" }
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Reusable theme toggle button component
  const ThemeToggleButton = ({ className, size = "w-6 h-6" }) => (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className}`}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <Sun className={size} /> : <Moon className={size} />}
    </button>
  );

  // Reusable navigation links component
  const NavigationLinks = ({ isMobile = false, onLinkClick }) => (
    <div className={isMobile ? "flex flex-col gap-6" : "flex gap-6 text-lg font-medium"}>
      {navLinks.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`hover:text-[#4ed8d5] transition ${
            isMobile
              ? "text-2xl font-medium py-4 border-b border-gray-100 dark:border-gray-800"
              : ""
          }`}
          onClick={onLinkClick}
        >
          {label}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className="w-full px-6 py-4 bg-white dark:bg-black text-gray-900 dark:text-white flex items-center">
        {/* Left: Logo */}
        <div className="w-50 flex items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Devsernal Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center Links */}
        <div className="flex-1 justify-center hidden md:flex">
          <nav>
            <NavigationLinks />
          </nav>
        </div>

        {/* Right: Dark Mode Toggle and Mobile Menu Button */}
        <div className="w-50 flex justify-end">
          <ThemeToggleButton />
          
          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition md:hidden"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? 
              <X className="w-6 h-6 text-gray-900 dark:text-white" /> : 
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            }
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop with opacity effect */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Menu Content */}
        <div
          className={`relative bg-white dark:bg-black h-full w-full flex flex-col transition-transform duration-300 ease-in-out ${
            mobileMenuOpen
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Devsernal Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8 dark:text-white text-center">
            <NavigationLinks isMobile={true} onLinkClick={closeMobileMenu} />
          </nav>

          {/* Footer with theme toggle */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 dark:text-white">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Theme</span>
              <ThemeToggleButton className="p-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;