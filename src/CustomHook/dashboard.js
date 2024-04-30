import { useState, useEffect } from 'react';
import http from '../Utils/http';

const useDashboardDetails = () => {
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      setIsLoading(true);
      try {
        const response = await http.get("/dashboard");
        setDashboardDetails(response.data.data);
        setError(null);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchDashboardDetails();

    // Clean-up function
    return () => {
      // If needed, perform any clean-up here
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return { dashboardDetails, isLoading, error };
};

export default useDashboardDetails;
