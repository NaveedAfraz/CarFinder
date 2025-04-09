export const fetchCars = async (filters, page = 1, limit = 10) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockCars
      .filter((car) => {
        if (filters.brand && car.brand !== filters.brand) return false;
        if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
        if (filters.minPrice && car.price < filters.minPrice) return false;
        if (filters.maxPrice && car.price > filters.maxPrice) return false;
        if (
          filters.seatingCapacity &&
          car.seatingCapacity < filters.seatingCapacity
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (!filters.sortBy) return 0;
        return filters.sortBy === "priceLowToHigh"
          ? a.price - b.price
          : b.price - a.price;
      })
      .slice((page - 1) * limit, page * limit);
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const fetchCarById = async (carId) => {
  try {
     
    // const response = await fetch(`${API_BASE_URL}/cars/${carId}`);
    // if (!response.ok) throw new Error('Failed to fetch car details');
    // const data = await response.json();
    // return data;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const car = mockCars.find((car) => car.id === parseInt(carId));
    if (!car) throw new Error("Car not found");
    return car;
  } catch (error) {
    console.error(`Error fetching car with ID ${carId}:`, error);
    throw error;
  }
};

export const mockCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: "32 mpg",
    image: "https://via.placeholder.com/300x200?text=Toyota+Camry",
    features: ["Backup Camera", "Bluetooth", "Navigation", "Sunroof"],
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 23000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: "35 mpg",
    image: "https://via.placeholder.com/300x200?text=Honda+Civic",
    features: ["Backup Camera", "Bluetooth", "Apple CarPlay"],
  },
  {
    id: 3,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    fuelType: "Electric",
    seatingCapacity: 5,
    mileage: "358 miles (range)",
    image: "https://via.placeholder.com/300x200?text=Tesla+Model+3",
    features: ["Autopilot", "Navigation", "Premium Sound System"],
  },
  {
    id: 4,
    brand: "Ford",
    model: "F-150",
    year: 2023,
    price: 38000,
    fuelType: "Gasoline",
    seatingCapacity: 6,
    mileage: "24 mpg",
    image: "https://via.placeholder.com/300x200?text=Ford+F-150",
    features: ["Backup Camera", "Touchscreen", "Trailer Hitch"],
  },
  {
    id: 5,
    brand: "BMW",
    model: "X5",
    year: 2023,
    price: 62000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: "30 mpg",
    image: "https://via.placeholder.com/300x200?text=BMW+X5",
    features: [
      "Leather Seats",
      "Navigation",
      "Premium Sound System",
      "Sunroof",
    ],
  },
  {
    id: 6,
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2023,
    price: 58000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: "28 mpg",
    image: "https://via.placeholder.com/300x200?text=Mercedes+E-Class",
    features: [
      "Leather Seats",
      "Navigation",
      "Premium Sound System",
      "Sunroof",
    ],
  },
  {
    id: 7,
    brand: "Chevrolet",
    model: "Tahoe",
    year: 2023,
    price: 52000,
    fuelType: "Gasoline",
    seatingCapacity: 8,
    mileage: "21 mpg",
    image: "https://via.placeholder.com/300x200?text=Chevrolet+Tahoe",
    features: ["Third Row Seating", "Navigation", "Backup Camera"],
  },
  {
    id: 8,
    brand: "Volkswagen",
    model: "Golf",
    year: 2023,
    price: 25000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: "33 mpg",
    image: "https://via.placeholder.com/300x200?text=Volkswagen+Golf",
    features: ["Bluetooth", "Backup Camera", "Touchscreen"],
  },
  {
    id: 9,
    brand: "Hyundai",
    model: "Tucson",
    year: 2023,
    price: 27000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: "38 mpg",
    image: "https://via.placeholder.com/300x200?text=Hyundai+Tucson",
    features: ["Apple CarPlay", "Android Auto", "Backup Camera"],
  },
  {
    id: 10,
    brand: "Nissan",
    model: "Rogue",
    year: 2023,
    price: 29000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: "30 mpg",
    image: "https://via.placeholder.com/300x200?text=Nissan+Rogue",
    features: ["Bluetooth", "Backup Camera", "Navigation"],
  },
  {
    id: 11,
    brand: "Audi",
    model: "Q5",
    year: 2023,
    price: 48000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: "29 mpg",
    image: "https://via.placeholder.com/300x200?text=Audi+Q5",
    features: ["Leather Seats", "Navigation", "Premium Sound System"],
  },
  {
    id: 12,
    brand: "Kia",
    model: "Telluride",
    year: 2023,
    price: 35000,
    fuelType: "Gasoline",
    seatingCapacity: 8,
    mileage: "26 mpg",
    image: "https://via.placeholder.com/300x200?text=Kia+Telluride",
    features: ["Third Row Seating", "Backup Camera", "Apple CarPlay"],
  },
  {
    id: 13,
    brand: "Subaru",
    model: "Outback",
    year: 2023,
    price: 30000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: "33 mpg",
    image: "https://via.placeholder.com/300x200?text=Subaru+Outback",
    features: ["All-Wheel Drive", "Backup Camera", "Apple CarPlay"],
  },
  {
    id: 14,
    brand: "Lexus",
    model: "RX",
    year: 2023,
    price: 49000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    mileage: "31 mpg",
    image: "https://via.placeholder.com/300x200?text=Lexus+RX",
    features: ["Leather Seats", "Navigation", "Premium Sound System"],
  },
  {
    id: 15,
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 28000,
    fuelType: "Gasoline",
    seatingCapacity: 5,
    mileage: "30 mpg",
    image: "https://via.placeholder.com/300x200?text=Mazda+CX-5",
    features: ["Leather Seats", "Backup Camera", "Bluetooth"],
  },
];
