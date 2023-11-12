export interface tokenDecoded {
  id: number;
  iat: number;
  exp: number;
}

export interface userIdToken {
  hasToken: boolean;
  userId?: number;
}
