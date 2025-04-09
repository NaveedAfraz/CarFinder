import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";

const FilterSection = ({ onFilterChange, darkMode }) => {
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    fuelType: "",
    seatingCapacity: "",
    sortBy: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Memoize static data
  const staticData = useMemo(
    () => ({
      brands: [
        "Toyota",
        "Honda",
        "Tesla",
        "Ford",
        "BMW",
        "Mercedes-Benz",
        "Chevrolet",
        "Volkswagen",
        "Hyundai",
        "Nissan",
        "Audi",
        "Kia",
        "Subaru",
        "Lexus",
        "Mazda",
      ],
      fuelTypes: ["Gasoline", "Diesel", "Electric", "Hybrid"],
    }),
    []
  );

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, searchTerm });
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, searchTerm, onFilterChange]);

  const handleReset = useCallback(() => {
    const emptyFilters = {
      brand: "",
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      seatingCapacity: "",
      sortBy: "",
    };
    setFilters(emptyFilters);
    setSearchTerm("");
    localStorage.removeItem("carFinderFilters");
    onFilterChange({ ...emptyFilters, searchTerm: "" });
  }, [onFilterChange]);

  const bgClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800";
  const inputClass = darkMode
    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
    : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500";

  return (
    <div
      className={`${bgClass} p-4 rounded-lg shadow-md transition-colors duration-300`}
    >
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="searchTerm"
            className={`block w-full p-4 pl-10 text-sm rounded-lg ${inputClass} transition-colors duration-300`}
            placeholder="Search by model, brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Brand Filter */}
        <div>
          <label htmlFor="brand" className="block mb-2 text-sm font-medium">
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            className={`block w-full p-2 text-sm rounded-lg ${inputClass} transition-colors duration-300`}
            value={filters.brand}
            onChange={handleFilterChange}
          >
            <option value="">All Brands</option>
            {staticData.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filters */}
        <div>
          <label htmlFor="minPrice" className="block mb-2 text-sm font-medium">
            Min Price ($)
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            className={`block w-full p-2 text-sm rounded-lg ${inputClass} transition-colors duration-300`}
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block mb-2 text-sm font-medium">
            Max Price ($)
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            className={`block w-full p-2 text-sm rounded-lg ${inputClass} transition-colors duration-300`}
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>

        {/* Fuel Type Filter */}
        <div>
          <label htmlFor="fuelType" className="block mb-2 text-sm font-medium">
            Fuel Type
          </label>
          <select
            id="fuelType"
            name="fuelType"
            className={`block w-full p-2 text-sm rounded-lg ${inputClass} transition-colors duration-300`}
            value={filters.fuelType}
            onChange={handleFilterChange}
          >
            <option value="">All Fuel Types</option>
            {staticData.fuelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Seating Capacity Filter */}
        <div>
          <label
            htmlFor="seatingCapacity"
            className="block mb-2 text-sm font-medium"
          >
            Min Seating Capacity
          </label>
          <select
            id="seatingCapacity"
            name="seatingCapacity"
            className={`block w-full p-2 text-sm rounded-lg ${inputClass} transition-colors duration-300`}
            value={filters.seatingCapacity}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="2">2+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="7">7+</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block mb-2 text-sm font-medium">
            Sort By
          </label>
          <select
            id="sortBy"
            name="sortBy"
            className={`block w-full p-2 text-sm rounded-lg ${inputClass} transition-colors duration-300`}
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="">None</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleReset}
          className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300`}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(FilterSection);
