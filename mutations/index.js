import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation CreateUser($user: createUserInput!) {
  createUser(input: $user) {
     user {
        id
    }
  }
}
`