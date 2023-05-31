import React from "react";

export default function useStickyState(defaultValue = "", key = "token") {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    try {
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (e) {
      console.error("Failed to parse JSON from localStorage:", e);
      return defaultValue;
    }
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
