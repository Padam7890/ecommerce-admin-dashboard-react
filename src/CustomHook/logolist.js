import { useEffect, useState } from "react";
import http from "../Utils/http"; // Assuming http is an axios instance

const useLogosList = () => {
   const [logosList, setLogosList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     fetchLogosList();
   }, []);

   const fetchLogosList = async () => {
     try {
       const response = await http.get("/logos");
       setLogosList(response.data.logo);
       setIsLoading(false);
     } catch (error) {
       setError(error);
       setIsLoading(false);
     }
   }

   
   
   return {logosList, setLogosList, isLoading, error, fetchLogosList };
}

export default useLogosList;
