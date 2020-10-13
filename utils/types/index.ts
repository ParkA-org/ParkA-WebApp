
//Refers to the type where { id, name } are the only fields needed
export type BasicEntity = {
    __typename: string;
    name: string;
    id: string;
}

export interface BirthPlaceData {
    getAllCountries: BasicEntity[]
}

export interface NationalityData {
    getAllNationalities: BasicEntity[]
}

export interface FeaturesData {
    getAllFeatures: BasicEntity[]
}

export type MakerIcon = {
    __typename: string;
    name: string;
    alternativeText: string;
    previewUrl: string;
    url: string;
}

export type Maker = {
    id: string;
    name: string;
    icon: MakerIcon;
}

export interface MakersData {
    getAllMakes: {
        id: string;
        name: string;
        models: ModelsData[]
    }[]
}

export interface ColorsData {
    getAllColors: BasicEntity[]
}

export interface BodyStylesData {
    getAllBodyStyles: BasicEntity[]
}

export interface ModelsData {
    models: BasicEntity[]
}

export type Vehicle = {
    __typename: string;
    id: string;
    alias: string;
    detail: string;
    year: string;
    licensePlate: string;
    pictures: string[];
    mainPicture: string;
    bodyStyle: BasicEntity;
    colorExterior: BasicEntity;
    model: Model;
    verified: Boolean;
}

export type Make = {
    __typename: string;
    id: string;
    name: string;
    icon: UploadFile;
}

export type Model = {
    __typename: string;
    id: string;
    name: string;
    make: Make;
}

export type UploadFile = {
    __typename: string;
    alternativeText: string;
    url: string;
    name: string;
    previewUrl: string;
}

export type Coordinates = {
    lat?: number;
    lng?: number;
    time?: Date;
}


