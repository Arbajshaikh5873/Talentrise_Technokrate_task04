import React from "react";
import getDispatch from "../hooks/getDispatch";
import { useSelector } from "react-redux";
import { toggleTheme } from "../slice/themeSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";

// Navbar Component
function Navbar({ showForm, setShowForm }) {
  const dispatch = getDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Todo Manager</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 bg-white text-blue-600 dark:bg-gray-700 dark:text-white rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {showForm ? "Cancel" : "Add New Todo"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
