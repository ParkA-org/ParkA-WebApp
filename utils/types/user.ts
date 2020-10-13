
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
    name: string;

    lastName: string;

    email: string;

    password: string;

    userInformation: string;

    profilePicture?: string;

    confirmed: boolean;

    origin: string;
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

    placeOfBirth: string;

    nationality: string;
}