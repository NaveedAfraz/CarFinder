const useLocalStorage = (key, initialValue) => {
  // Get stored value from localStorage or use initialValue
  const storedValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing ${key} in localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;