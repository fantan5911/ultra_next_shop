import { IUser } from "../types/user.types";


export default class UserDto {
    id: string;
    email: string;
    username: string;
    avatarUrl: string | null;
    isActivated: boolean;
    isBanned: boolean;
    acceptedTerms: boolean;
    cartId: string | null;

    constructor(model: IUser) {
        this.id = model.id;
        this.email = model.email;
        this.username = model.username;
        this.avatarUrl = model.avatarUrl;
        this.isActivated = model.isActivated;
        this.isBanned = model.isBanned;
        this.acceptedTerms = model.acceptedTerms;
        this.cartId = model.cartId;
    }
}