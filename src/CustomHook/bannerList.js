import { useEffect, useState } from "react";
import http from "../Utils/http"; // Assuming http is an axios instance

const useBannerList = () => {
   const [bannerList, setBannerList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     fetchBannerList();
   }, []);

   const fetchBannerList = async () => {
     try {
       const response = await http.get("/banner");
       setBannerList(response.data.banner);
       setIsLoading(false);
     } catch (error) {
       setError(error);
       setIsLoading(false);
     }
   }
   
   return { bannerList, isLoading, error, fetchBannerList };
}

export default useBannerList;
