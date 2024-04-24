import { useEffect, useState } from "react";
import http from "../Utils/http"; // Assuming http is an axios instance

const usetestimonialList = () => {
   const [testimonialList, setTestimonialList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
    fetchTestimonialList();
   }, []);

   const fetchTestimonialList = async () => {
     try {
       const response = await http.get("/cilents");
       setTestimonialList(response.data.testimonials);
       setIsLoading(false);
     } catch (error) {
       setError(error);
       setIsLoading(false);
     }
   }

   
   
   return { testimonialList, isLoading, error, fetchTestimonialList };
}

export default usetestimonialList;
