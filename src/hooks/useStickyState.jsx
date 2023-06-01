import { useEffect, useState } from "react";

// A custom hook that allows storing and retrieving a value in localStorage
// Usage: const [value, setValue] = useStickyState(initialValue, storageKey);

export default function useStickyState(initialValue = "", storageKey = "token") {
  // Function to retrieve the value from localStorage or use the initialValue
  function getStoredValue() {
    try {
      const stickyValue = window.localStorage.getItem(storageKey);
      const parsedValue = stickyValue !== null ? JSON.parse(stickyValue) : initialValue;
      return parsedValue;
    } catch (e) {
      console.error("Failed to parse JSON from localStorage:", e);
      return initialValue;
    }
  }

  // Retrieve the value from localStorage or use the initialValue
  const [value, setValue] = useState(getStoredValue);

  // Update the stored value in localStorage whenever it changes
  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  // Return the stored value and a function to update it
  return [value, setValue];
}
