export interface userInterface {
    id: number;
    username: string;
    email: string;
    status: boolean;
    recoverToken: string | null;
    recoverTokenDate: string | null;
    img: string;
    bg_img: string;
}

export interface userInterfaceApi {
    user: {
        id: number;
        username: string;
        email: string;
        status: boolean;
        recoverToken: string | null;
        recoverTokenDate: string | null;
        img: string;
        bg_img: string;
    }
}