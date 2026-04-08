import { User } from "../generated/prisma/client";
import { IUser } from "../types/user.types";


export default class UserDto {
    id: string;
    email: string;
    isActivated: boolean;
    isBanned: boolean;
    acceptedTerms: boolean;

    constructor(model: User) {
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.isBanned = model.isBanned;
        this.acceptedTerms = model.acceptedTerms;
    }
}