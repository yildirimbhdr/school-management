import { UserTypes } from "../enums/UserTypes.enum";

export interface JwtPayload {
    email: string;
    phone: string;
    name: string;
    lastname: string;
    id: number;
    type: UserTypes;
}