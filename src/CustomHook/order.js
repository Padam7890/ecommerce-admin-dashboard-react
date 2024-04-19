import { useEffect, useState } from "react";
import http from "../Utils/http"; // Assuming http is an axios instance

const useOrderList = () => {
   const [orderList, setOrderList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
    fetchOrderList();
   }, []);

   const fetchOrderList = async () => {
     try {
       const response = await http.get("/order");
       setOrderList(response.data.order);
       setIsLoading(false);
     } catch (error) {
       setError(error);
       setIsLoading(false);
     }
   }

   
   
   return {orderList, isLoading, error, fetchOrderList };
}

export default useOrderList;