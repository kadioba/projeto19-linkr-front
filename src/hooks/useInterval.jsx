import { useRef, useEffect } from "react";

export default function useInterval(callback, delay) { // A custom React hook for creating intervals in components
  const intervalIdRef = useRef(null); // Reference to store the interval ID
  const callbackRef = useRef(callback); // Reference to store the current callback function
  
  useEffect(() => {
    callbackRef.current = callback; // Update the stored callback function when it changes
  }, [callback]);
  
  useEffect(() => {
    const executeCallback = () => callbackRef.current(); // Function to execute the current callback function
    
    if (typeof delay === "number") {
      intervalIdRef.current = window.setInterval(executeCallback, delay); // Set the interval and store the interval ID
      return () => window.clearInterval(intervalIdRef.current); // Clear the interval when the component unmounts or when the delay changes
    }
  }, [delay]);
  
  return intervalIdRef; // Return the reference to the interval ID
}
