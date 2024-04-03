import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data.products);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  return { products, isLoading, error, fetchProductList };
};

export default useProductList;
