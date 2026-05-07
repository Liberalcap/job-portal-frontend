import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start loading when location changes
    setIsLoading(true);

    // Simulate page load time and stop loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms loading time

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
