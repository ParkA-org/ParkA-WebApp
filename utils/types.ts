
//Refers to the type where { id, name } are the only fields needed
export type BasicEntity = {
    __typename: string;
    name: string;
    id: string;
}

export interface CountriesData {
    countries: BasicEntity[]
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
    makes: Maker[]
}

export interface ColorsData {
    colorExteriors: BasicEntity[]
}

export interface TypeVehiclesData {
    typeVehicles: BasicEntity[]
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
    licenseplate: string;
    mainpicture: UploadFile;
    type_vehicle: BasicEntity;
    color_exterior: BasicEntity;
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