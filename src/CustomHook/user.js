import { useEffect, useState } from "react";
import http from "../Utils/http"; // Assuming http is an axios instance

const useUserInfoList = () => {
    const [userinfo, setuserinfo] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
    fetchuserinfo();
   }, []);

   const fetchuserinfo = async () => {
     try {
       const res = await http.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setuserinfo(res.data.user)
       setIsLoading(false);
     } catch (error) {
       setError(error);
       setIsLoading(false);
     }
   }

   
   
   return {userinfo, isLoading, error, fetchuserinfo };
}

export default useUserInfoList;