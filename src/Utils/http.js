import axios from "axios";

 
 // Set config defaults when creating the instance
const http = axios.create({
    baseURL: 'https://api-ecommerce-app-express.onrender.com/'
  });
  
  // Alter defaults after instance has been created

  export default http;
