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

export interface IUSER_DATA {
  id: number;
  username: string;
  email: string;
  status: boolean;
  recoverToken: Date | null;
  recoverTokenDate: Date | null;
  img?: string;
  bg_img: string | null;
  csvDownloadDate: Date | null;
}
