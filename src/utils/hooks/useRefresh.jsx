import { useState, useCallback } from 'react';

// Custom hook for handling refreshing state and refresh action
export const useRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return { refreshing, onRefresh };
};
