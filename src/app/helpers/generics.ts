import jwtDecode from 'jwt-decode';
import { getTokenFromIndexedDB } from './indexedDB';

// Gets token and decodes it
export async function decodeToken(): Promise<tokenObject> {
    const token = await getTokenFromIndexedDB();
    
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