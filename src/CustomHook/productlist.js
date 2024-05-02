import { useState, useEffect } from 'react';
import http from '../Utils/http';
import { useNavigate } from 'react-router-dom';

const useProductList = () => {
  const nav = useNavigate()
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProductList();
  }, []);


  const fetchProductList = async () => {
    try {
      const response = await http.get("/products");
      setProducts(response.data.products);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  
  return { products, isLoading, error, fetchProductList,setProducts };
};

export default useProductList;
