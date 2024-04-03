import { useState, useEffect } from 'react';
import axios from 'axios';

const useSubcategories = () => {
  const [subcategory, setSubcategories] = useState([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(true);
  const [errorSubcategories, setErrorSubcategories] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/subcategories");
        setSubcategories(response.data.subcategory);
        setIsLoadingSubcategories(false);
      } catch (error) {
        setErrorSubcategories(error);
        setIsLoadingSubcategories(false);
      }
    };

    fetchSubcategories();

    // Cleanup function (if necessary)
    return () => {
      // Cleanup code (if needed)
    };
  }, []);

  return { subcategory, isLoadingSubcategories, errorSubcategories };
};

export default useSubcategories;
