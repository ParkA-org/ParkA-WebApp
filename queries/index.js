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
    profilepicture
    email
    lastname
    name
    confirmed
  }
}
`