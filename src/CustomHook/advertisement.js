import { useEffect, useState } from "react";
import http from "../Utils/http"; // Assuming http is an axios instance

const useAdvertisement = () => {
   const [adList, setadList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     fetchadvertismentList();
   }, []);

   const fetchadvertismentList = async () => {
     try {
       const response = await http.get("/advertisement");
       setadList(response.data.advertisment);
       setIsLoading(false);
     } catch (error) {
       setError(error);
       setIsLoading(false);
     }
   }

   
   
   return { adList, setadList, isLoading, error, fetchadvertismentList };
}

export default useAdvertisement;
