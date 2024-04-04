import axios from "axios";

 
 // Set config defaults when creating the instance
const http = axios.create({
    baseURL: 'http://localhost:3000'
  });
  
  // Alter defaults after instance has been created

  export default http;
