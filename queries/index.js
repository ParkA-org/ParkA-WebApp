import { gql } from "@apollo/client"

export const GET_BIRTH_PLACES = gql`
query GetCountries {
  getAllCountries {
    id
    name
  }
}`

export const GET_NATIONALITIES = gql`
query GetNationalities {
  getAllNationalities {
    id
    name
  }
}`

export const GET_USER = gql`
query GetUser($id: ID!){
  user(id: $id) {
    username
    profilepicture
    email
    lastname
    name
    confirmed
  }
}
`

export const GET_MODELS = gql`
query GetModels {
  models{
    id
    name
  }
}
`

export const GET_COLORS = gql`
query GetColors {
  colorExteriors{
    id
    name
  }
}
`

export const GET_VEHICLE_TYPES = gql`
query GetVehicleTypes{
  typeVehicles{
    id
    name
  }
}
`

export const GET_MAKERS = gql`
query GetMakers {
  makes{
    id
    name
    icon {
      name
      alternativeText
      previewUrl
      url
    }
  }
}
`

export const GET_USER_ACCOUNT_DATA = gql`
query GetUserAccountData($id: ID!){
  user(id: $id){
    account_data {
      id
    }
  }
}
`

export const GET_VEHICLE = gql`
query GetVehicle($id: ID!) {
  vehicle(id: $id){
    mainpicture {
      alternativeText
      url
    }
    model {
      name
      make {
        icon {
          alternativeText
          url
        }
        name
      }
    }
    id
    detail
    licenseplate
    year
    color_exterior {
      name
    }
    verified
  }
}
`;

export const GET_USER_VEHICLES = gql`
query GetAccountVehicles($id: ID!){
  accountDatum(id: $id){
    vehicles{
      mainpicture {
        alternativeText
        url
      }
      model {
        name
        make {
          icon {
            alternativeText
            url
          }
          name
        }
      }
      id
      detail
      licenseplate
      year
      color_exterior {
        name
      }
      verified
    }
  }
}
`

export const GET_ALL_VEHICLES = gql`
query GetVehicles{
  vehicles(limit: 10){
    id
    alias
    detail
    year
    licenseplate
    mainpicture {
      id
      url
    }
    type_vehicle {
      name
    }
    color_exterior {
      name
    }
    model {
      make {
        icon {
          url
        }
        name
      }
    }
    verified
  }
}
`;