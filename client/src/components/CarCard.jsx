import React from "react";
import { Heart, DollarSign, Fuel, Users, TrendingUp } from "lucide-react";

const CarCard = ({
  car,
  darkMode,
  isInWishlist,
  onWishlistToggle,
  onViewDetails,
}) => {
  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onWishlistToggle(car)}
          className={`absolute top-2 right-2 p-1.5 rounded-full 
            ${
              isInWishlist
                ? "bg-red-500 text-white"
                : darkMode
                ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            } transition-colors duration-300`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className="h-5 w-5"
            fill={isInWishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm mb-2">{car.year}</p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm">${car.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-1" />
            <span className="text-sm">{car.fuelType}</span>
          </div>

          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{car.seatingCapacity} seats</span>
          </div>

          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">{car.mileage}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(car)}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
