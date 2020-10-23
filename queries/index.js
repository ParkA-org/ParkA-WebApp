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

export const GET_FEATURES = gql`
query GetFeatures {
  getAllFeatures {
    id
    name
  }
}
`

export const GET_USER = gql`
query GetUser($id: String!){
  getUserById(id: $id){
    id
    name
    lastName
    email
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

export const GET_MAKES = gql`
query GetMakes{
  getAllMakes{
    id
    name
    models {
      id
      name
    }
  }
}
`

export const GET_COLORS = gql`
query GetColors{
  getAllColors{
    id
    name
  }
}
`

export const GET_BODY_STYLES = gql`
query GetBodyStyles{
  getAllBodyStyles{
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

export const GET_VEHICLE_BY_ID = gql`
query GetVehicle($vehicleId: GetVehicleByIdInput!){
  getVehicleById(getVehicleByIdInput: $vehicleId) {
    id
    licensePlate
    detail
    alias
    bodyStyle {
      id
      name
    }
    year
    colorExterior {
      id
      name
    }
    model {
      id
      make
      name
    }
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
  getAllUserVehicles {
    id
    alias
    detail
    year
    licensePlate
    mainPicture 
    bodyStyle {
      name
    }
    colorExterior {
      name
    }
    model {
      make {
        icon
        name
      }
      name
    }
    verified
    }
}
`;

export const GET_USER_PARKINGS = gql`
query GetUserParkings{
  getAllUserParkings {
    id
    parkingName
    calendar
    mainPicture
    latitude
    longitude
    information
    sector
    direction
    countParking
    priceHours
  }
}
`

export const GET_PARKINGS = gql`
query GetParkings{
  getAllParkings {
    id
    parkingName
    calendar
    mainPicture
    latitude
    longitude
    information
    sector
    direction
    countParking
  }
}
`

export const GET_PARKING_WITH_ID = gql`
query GetParkingWithId($id: String!){
  getParkingById(id: $id){
    id
    parkingName
    direction
    sector
    priceHours
    countParking
    isAvailable
    verified
    information
    mainPicture
    pictures
  }
}
`