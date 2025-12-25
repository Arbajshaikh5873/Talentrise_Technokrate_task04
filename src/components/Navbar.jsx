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
    <nav
      className={`shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-r from-blue-600 to-purple-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{darkMode ? "🌙" : "☀️"}</div>
            <h1 className="text-2xl font-bold text-white">Todo Manager</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleThemeToggle}
              className={`p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                darkMode
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-indigo-900 text-white hover:bg-indigo-800"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>

            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                darkMode
                  ? "bg-purple-600 text-white hover:bg-purple-500"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
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
