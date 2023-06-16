import jwt_decode from 'jwt-decode';

function decodeToken(token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      // Handle error, such as token validation failure
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  
export { decodeToken };