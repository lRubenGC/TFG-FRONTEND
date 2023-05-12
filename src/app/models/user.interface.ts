export interface userInterface {
    user: {
        id: number;
        username: string;
        email: string;
        status: boolean;
        recoverToken: string | null;
        recoverTokenDate: string | null;
    }
}