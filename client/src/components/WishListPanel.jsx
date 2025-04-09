import React from "react";
import { X, Heart, Eye, Trash } from "lucide-react";

const WishlistPanel = ({
  wishlist,
  darkMode,
  onWishlistToggle,
  onViewDetails,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-40 w-80 overflow-y-auto transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Wishlist ({wishlist.length})</h2>
        <button
          onClick={onClose}
          className={`p-2 rounded-full ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors duration-300`}
          aria-label="Close wishlist"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 p-4">
          <Heart className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Your wishlist is empty. Add cars you like to compare them later.
          </p>
        </div>
      ) : (
        <div className="p-2">
          {wishlist.map((car) => (
            <div
              key={car.id}
              className={`flex items-center p-2 mb-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-colors duration-300`}
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-16 h-16 object-cover rounded mr-3"
              />
              <div className="flex-1">
                <h3 className="font-medium">
                  {car.brand} {car.model}
                </h3>
                <p className="text-sm opacity-75">
                  ${car.price.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => onViewDetails(car)}
                  className={`p-1.5 rounded-full ${
                    darkMode
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition-colors duration-300`}
                  aria-label="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onWishlistToggle(car)}
                  className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                  aria-label="Remove from wishlist"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPanel;
