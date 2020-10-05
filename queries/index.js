import { gql } from "@apollo/client"
export const GET_COUNTRIES = gql`
query GetCountries {
  countries {
    id
    name
  }
}`

export const GET_USER = gql`
query GetUser($id: ID!){
  user(id: $id) {
    username
    lastname
    name
    email
    profilepicture
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