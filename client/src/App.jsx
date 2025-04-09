import React, { useState, useEffect, useCallback } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Header from "./components/header";
import FilterSection from "./components/FilterSection";
import CarCard from "./components/CarCard";
import CarDetail from "./components/CarDetail";
import Pagination from "./components/Pagination";
import WishlistPanel from "./components/WishListPanel";
import useLocalStorage from "./hooks/useLocalStorage";
import { fetchCars, fetchCarById } from "./services/api";

const queryClient = new QueryClient();

const AppWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

function App() {
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("carFinderFilters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          brand: "",
          minPrice: "",
          maxPrice: "",
          fuelType: "",
          seatingCapacity: "",
          searchTerm: "",
          sortBy: "",
        };
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  // console.log('Pagination state:', { currentPage, totalPages, itemsPerPage });

  const [darkMode, setDarkMode] = useState(false);
  // console.log('Dark mode:', darkMode);

  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  // console.log('Wishlist state:', { count: wishlist.length, isOpen: isWishlistOpen });

  const [selectedCar, setSelectedCar] = useState(null);
  // console.log('Selected car:', selectedCar?.id);

  const {
    data: cars,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cars", filters, currentPage, itemsPerPage],
    queryFn: async () => {
      const results = await fetchCars(filters, currentPage, itemsPerPage);
      // console.log('Fetched page results:', { page: currentPage, count: results.length })
      const allResults = await fetchCars(filters, 1, Number.MAX_SAFE_INTEGER);
      // console.log('Total filtered results:', allResults.length);
      setTotalPages(Math.ceil(allResults.length / itemsPerPage));
      return results;
    },
    keepPreviousData: true,
    staleTime: 30000,
  });

  useEffect(() => {
    const savedWishlist = localStorage.getItem("carFinderWishlist");
    // console.log('Loading wishlist from storage:', savedWishlist ? JSON.parse(savedWishlist).length : 0);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // console.log('Saving wishlist to storage:', wishlist.length);
    localStorage.setItem("carFinderWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    localStorage.setItem("carFinderFilters", JSON.stringify(newFilters));
    queryClient.invalidateQueries(["cars"]);
  }, []);

  useEffect(() => {
    queryClient.invalidateQueries(["cars"]);
  }, [filters]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    // console.log('Toggling dark mode');
  };

  const toggleWishlist = (car) => {
    // console.log('Toggle wishlist for car:', car.id);
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.id === car.id);

      if (isInWishlist) {
        return prev.filter((item) => item.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  const isCarInWishlist = (carId) => {
    // console.log('Checking wishlist for car:', carId);
    return wishlist.some((car) => car.id === carId);
  };

  const handlePageChange = (page) => {
    // console.log('Page change:', { from: currentPage, to: page, maxPages: totalPages });
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewDetails = (car) => {
    // console.log('Viewing details for car:', car.id);
    setSelectedCar(car);
  };

  const toggleWishlistPanel = () => {
    // console.log('Toggling wishlist panel');
    setIsWishlistOpen((prev) => !prev);
  };

  // console.log('Render state:', {
  //   carsCount: cars?.length,
  //   isLoading,
  //   isError,
  //   currentPage,
  //   totalPages
  // });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900");
    } else {
      document.body.classList.remove("bg-gray-900");
    }
    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, [darkMode]);

  return (
    <div className={darkMode ? "text-white" : "text-gray-800"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <FilterSection
            onFilterChange={handleFilterChange}
            darkMode={darkMode}
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isLoading
              ? "Loading cars..."
              : `Found ${cars ? cars.length : 0} cars`}
          </h2>

          <button
            onClick={toggleWishlistPanel}
            className={`flex items-center px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors duration-300`}
          >
            <span className="mr-2">❤️</span>
            Wishlist ({wishlist.length})
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isError ? (
          <div
            className={`p-4 rounded-lg text-center ${
              darkMode ? "bg-red-900" : "bg-red-100"
            }`}
          >
            <p>Error loading cars: {error?.message || "Unknown error"}</p>
            <button
              onClick={() => queryClient.invalidateQueries(["cars"])}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : cars && cars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  darkMode={darkMode}
                  isInWishlist={isCarInWishlist(car.id)}
                  onWishlistToggle={toggleWishlist}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            <div className="mt-8 mb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                darkMode={darkMode}
              />
            </div>
          </>
        ) : (
          <div
            className={`p-8 rounded-lg text-center ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">😕 No Results</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters to find more cars.
            </p>
          </div>
        )}
      </main>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetail
          car={selectedCar}
          darkMode={darkMode}
          isInWishlist={isCarInWishlist(selectedCar.id)}
          onWishlistToggle={toggleWishlist}
          onClose={() => setSelectedCar(null)}
        />
      )}

      {/* Wishlist Panel */}
      <WishlistPanel
        wishlist={wishlist}
        darkMode={darkMode}
        onWishlistToggle={toggleWishlist}
        onViewDetails={handleViewDetails}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      {/* Overlay for wishlist panel on mobile */}
      {isWishlistOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsWishlistOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default AppWrapper;
