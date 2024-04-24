import { useState, useEffect } from 'react';
import http from '../Utils/http';

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProductList();
  }, []);


  const fetchProductList = async () => {
    try {
      const response = await http.get("/products", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      });
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
