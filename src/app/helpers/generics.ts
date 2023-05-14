import jwtDecode from 'jwt-decode';

// Gets token and decodes it
export function decodeToken(): tokenObject {
    const token = localStorage.getItem('cw-token');
    if (token) {
      const decodedToken: tokenDecoded = jwtDecode(token);
      const userId = decodedToken.id;

      return {
        hasToken: true,
        userId: userId
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