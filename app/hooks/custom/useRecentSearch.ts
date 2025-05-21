import { useLocalStorage } from "@mantine/hooks";

// Define a generic type T to make the hook flexible and reusable for any data type
export const useRecentSearched = <T>() => {
  // Use LocalStorage to store recent searches of type T[]
  const [recentSearches, setRecentSearches] = useLocalStorage<T[]>({
    key: "recent-searches",
    defaultValue: [],
  });

  // Add a search to recent searches
  const addToRecent = (search: T) => {
    if (search === undefined || search === null) {
      console.warn("Attempted to add an invalid search value.");
      return; // Ignore undefined or null values
    }

    setRecentSearches((currentSearches) => {
      // Check if search already exists, remove it to avoid duplication
      const updatedSearches = currentSearches.filter(
        // @ts-ignore
        (item) => item.name !== search.name
      );

      // Add the new search to the beginning of the array
      updatedSearches.unshift(search);

      // Limit the array to the most recent 5 searches
      if (updatedSearches.length > 5) {
        updatedSearches.pop();
      }

      return updatedSearches;
    });
  };

  // Delete a specific search from recent searches
  const deleteFromRecent = (search: T) => {
    setRecentSearches((currentSearches) => {
      const updatedSearches = currentSearches.filter((item) => item !== search);

      // If the search is not found, warn the user
      if (updatedSearches.length === currentSearches.length) {
        console.warn("Attempted to delete a non-existent search.");
      }

      return updatedSearches;
    });
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return {
    recentSearches,
    addToRecent,
    deleteFromRecent,
    clearRecentSearches,
  };
};
