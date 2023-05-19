import jwtDecode from 'jwt-decode';

// Gets token and decodes it
export function decodeToken(): tokenObject {
    const token = localStorage.getItem('cw-token');

    if (token) {
      // Decodes token
      const decodedToken: tokenDecoded = jwtDecode(token);

      // Get expiration time and compares with actual date
      const expirationTime = decodedToken.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp > expirationTime) {
        return {
          hasToken: false
        };
      } else {
        const userId = decodedToken.id;
  
        return {
          hasToken: true,
          userId: userId
        };
      }

    }

    return {
      hasToken: false
    }
    
}



export interface tokenDecoded {
    id: number;
    iat: number;
    exp: number;
}

export interface tokenObject {
    hasToken: boolean;
    userId?: number;
}