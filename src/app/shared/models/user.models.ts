export interface UserData {
  id: number;
  username: string;
  email: string;
  status: boolean;
  recoverToken: Date | null;
  recoverTokenDate: Date | null;
  img: string;
  bg_img: string;
  csvDownloadDate: Date | null;
}
