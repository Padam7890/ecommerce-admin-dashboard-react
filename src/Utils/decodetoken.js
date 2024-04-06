import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  try {
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
    console.error('Error decoding token:', error);
    return null;
  }
};

export default decodeToken;
