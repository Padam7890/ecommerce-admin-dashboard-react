import { useState, useEffect } from "react";
import axios from "axios";
import http from "../Utils/http";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    return () => {
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await http.get("/categories");
      setCategories(response.data.categories);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { categories, isLoading, error, fetchCategories };
};

export default useCategories;
