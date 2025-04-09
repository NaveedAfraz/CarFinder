import React from "react";
import { Car } from "lucide-react";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header
      className={`py-4 px-6 flex justify-between items-center ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } shadow-md transition-colors duration-300`}
    >
      <div className="flex items-center">
        <Car className="h-8 w-8 mr-2" />
        <span className="text-xl font-semibold">CarFinder</span>
      </div>

      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded-md focus:outline-none transition duration-300 ${
          darkMode
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
