
//Refers to the type where { id, name } are the only fields needed
export type BasicEntity = {
    __typename: string;
    name: string;
    id: string;
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

export interface CountriesData {
    countries: BasicEntity[]
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