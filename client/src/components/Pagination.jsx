import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange, darkMode }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);
   
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
 
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
 
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  const buttonClass = darkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
    : "bg-white hover:bg-gray-100 text-gray-800 border-gray-300";

  const activeClass = darkMode
    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
    : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700";

  return (
    <nav className="flex justify-center mt-3 h-32" aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px">
    
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 ml-0 leading-tight ${buttonClass} rounded-l-lg border ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            } transition-colors duration-300`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </li>
 
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span
                className={`px-3 py-2 leading-tight ${buttonClass} border transition-colors duration-300`}
              >
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 leading-tight border transition-colors duration-300 ${
                  currentPage === page ? activeClass : buttonClass
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
  
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 leading-tight ${buttonClass} rounded-r-lg border ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            } transition-colors duration-300`}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
