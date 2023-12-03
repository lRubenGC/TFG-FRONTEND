export interface loginInterface {
  email: String;
  password: String;
}

export interface registerInterface {
  username: String;
  email: String;
  password: String;
}

export interface tokenDecoded {
  id: number;
  iat: number;
  exp: number;
}

export interface userIdToken {
  isValidToken: boolean;
  userId?: number;
  token?: string;
}


export interface UserData {
  id: number;
  username: string;
  email: string;
  status: boolean;
  recoverToken: Date | null;
  recoverTokenDate: Date | null;
  img?: string;
  bg_img: string;
  csvDownloadDate: Date | null;
}
