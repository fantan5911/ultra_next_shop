export interface IUser {
    id: string;
    email: string;
    username: string;
    avatarUrl: string | null;
    isActivated: boolean;
    isBanned: boolean;
    cartId: string | null;
    acceptedTerms: boolean;
}