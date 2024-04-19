import { useEffect, useState } from "react";
import http from "../Utils/http"; // Assuming http is an axios instance

const useMenusList = () => {
   const [menusList, setMenusList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
    fetchMenusList();
   }, []);

   const fetchMenusList = async () => {
     try {
       const response = await http.get("/menu");
       setMenusList(response.data.menu);
       setIsLoading(false);
     } catch (error) {
       setError(error);
       setIsLoading(false);
     }
   }

   
   
   return {menusList, isLoading, error, fetchMenusList };
}

export default useMenusList;