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

export const CREATE_ACCOUNT = gql`
mutation createNewAccount($userAccount: createAccountDatumInput) {
  createAccountDatum(input: $userAccount) {
    accountDatum {
      id
      document
      document_type {
        name
      }
      placeofbirth
    }
  }
}
`

export const CREATE_PAYMENTINFO = gql`
mutation createNewPayment($userPaymentInfo: createPaymentInformationInput) {
  createPaymentInformation(input: $userPaymentInfo){
    paymentInformation {
      id
      name
    }
  }
}
`

export const LOGIN_USER = gql`
mutation loginUser($loggedUser: UsersPermissionsLoginInput!) {
  login(input: $loggedUser) {
    jwt
    user {
      username
    }
  }
}
`

export const FORGOT_PASSWORD = gql`
mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
`

export const RESET_PASSWORD = gql`
mutation resetPassword($password: String!, $passwordConfirmation: String!, $code: String!) {
  resetPassword(password: $password, passwordConfirmation: $passwordConfirmation, code: $code) {
    jwt
    user {
      username
    }
  }
}
`