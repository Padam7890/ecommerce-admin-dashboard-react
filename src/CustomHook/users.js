import { useEffect, useState } from "react";
import http from "../Utils/http";

const useUserList = () => {
    const [UserList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
     fetchUserList();
    }, []);
 
    const fetchUserList = async () => {
      try {
        const response = await http.get("/auth/users");
        setUserList(response.data.user);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
 
    
    
    return {UserList, isLoading, error, fetchUserList };
 }
 
 export default useUserList;