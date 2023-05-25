export interface userInterface {
    id: number;
    username: string;
    email: string;
    status: boolean;
    recoverToken: string | null;
    recoverTokenDate: string | null;
}

export interface userInterfaceApi {
    user: {
        id: number;
        username: string;
        email: string;
        status: boolean;
        recoverToken: string | null;
        recoverTokenDate: string | null;
    }
}