import { jwtDecode } from "jwt-decode";

// Define the decodeToken function
const decodeToken = (token) => {
  try {
    // Use jwtDecode to decode the token
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    // Check if the token has an expiration time and if it's in the future
    if (decodedToken.exp && decodedToken.exp > currentTime) {
      // Token is not expired
      return decodedToken;
    } else {
      // Token is expired
      return null;
    }
  } catch (error) {
    // Handle token decoding error
    console.error('Error decoding token:', error);
    return null;
  }
};
export default decodeToken;
