import { Review } from "."

export type BasicEntity = {
    __typename: string;
    id: string;
    name: string;
}

export type CreateUserInformationInput = {
    paymentInformation?: string;

    documentNumber: string;

    vehicles?: string[];

    parkings?: string[];

    telephoneNumber?: string;

    birthDate: string;

    placeOfBirth: string;

    nationality: string;
}

export type CreateUserInput = {
    name: string;

    lastName: string;

    email: string;

    password: string;

    userInformation: string;

    profilePicture?: string;

    confirmed: boolean;

    origin: string;
}

export type User = {
    id: string;

    name: string;

    lastName: string;

    email: string;

    password: string;

    userInformation: UserInformation;

    profilePicture?: string;

    confirmed: boolean;

    origin: string;
    
    reviews: Review[]
}

export type UserInformation = {
    __typename: string;

    id: string;

    paymentInformation?: string;

    documentNumber: string;

    vehicles?: string[];

    parkings?: string[];

    telephoneNumber?: string;

    birthDate: string;

    placeOfBirth: BasicEntity;

    nationality: BasicEntity;
}
