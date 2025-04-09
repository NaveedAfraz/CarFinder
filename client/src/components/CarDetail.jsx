import React from "react";
import { X, Heart, Check } from "lucide-react";

const CarDetail = ({
  car,
  darkMode,
  isInWishlist,
  onWishlistToggle,
  onClose,
}) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`relative max-w-3xl w-full rounded-lg shadow-xl overflow-hidden ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } transition-colors duration-300`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
          aria-label="Close details"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {car.brand} {car.model}
                </h2>
                <p className="text-lg">{car.year}</p>
              </div>

              <button
                onClick={() => onWishlistToggle(car)}
                className={`p-2 rounded-full ${
                  isInWishlist
                    ? "bg-red-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                } transition-colors duration-300`}
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className="h-6 w-6"
                  fill={isInWishlist ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold mb-4">
                ${car.price.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <span className="text-sm font-medium opacity-70">
                    Fuel Type
                  </span>
                  <div className="font-semibold">{car.fuelType}</div>
                </div>

                <div>
                  <span className="text-sm font-medium opacity-70">
                    Seating
                  </span>
                  <div className="font-semibold">
                    {car.seatingCapacity} People
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium opacity-70">
                    Mileage
                  </span>
                  <div className="font-semibold">{car.mileage}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Contact Dealer
              </button>
              <button className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                Book Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
