import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation CreateUser($cuInput: CreateUserInput!){
  createUser(createUserInput: $cuInput){
    id
    name
    lastName
    email
    origin
    confirmed
  }
}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(updateUserInput: $user) {
        id
        name
        lastName
    }
  }
`


export const UPDATE_USER_INFORMATION = gql`
  mutation UpdateUserInfo($userInfo: UpdateUserInformationInput!) {
    updateUserInformation(updateUserInformationInput: $userInfo) {
        documentNumber
    }
  }
`

export const CONFIRM_EMAIL = gql`
mutation ConfirmEmail($ceInput: ConfirmEmailInput!){
  confirmEmail(confirmEmailInput: $ceInput){
   	email
  	origin
  }
}
`

export const VALIDATE_EMAIL = gql`
mutation ValidateEmail($veI: ValidateEmailCodeInput!){
  validateEmailCode(validateEmailCodeInput: $veI) {
    email
    origin
  }
}
`

export const CREATE_USER_INFO = gql`
mutation CreateUserInfo($cuiInput: CreateUserInformationInpuType!){
  createUserInformation(createUserInformationInpuType: $cuiInput){
    id
    birthDate
    telephoneNumber
    nationality {
      id
      name
    }
    placeOfBirth {
      id
      name
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
mutation LogUser($logInfo: LoginUserInput!){
  login(loginUserInput: $logInfo){
    JWT
    user {
      id
      name
      lastName
      email
      profilePicture
      confirmed
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

export const CREATE_VEHICLE = gql`
mutation CreateVehicle($cvInput: createVehicleInput!){
  createVehicle(createVehicleInput: $cvInput) {
    id
    licensePlate
    detail
  }
}
`

export const UPDATE_VEHICLE = gql`
mutation UpdateVehicle($uvInput: UpdateVehicleInput!){
  updateVehicle(
    updateVehicleInput: $uvInput
  ) {
    id
    licensePlate
    verified
    detail
  }
}
`

export const CREATE_PARKING = gql`
mutation CreateParking($cpInput: CreateParkingInput!){
  createParking(createParkingInput: $cpInput){
    id
    countParking
    latitude
    longitude
    published
    parkingName
    priceHours
    mainPicture
    calendar {
      id
      parkingId
      monday {
        start
        finish
      }
      tuesday {
        start
        finish
      }
      wednesday {
        start
        finish
      }
      thursday {
        start
        finish
      }
      friday {
        start
        finish
      }
      saturday {
        start
        finish
      }
      sunday {
        start
        finish
      }
    }
  }
}
`

export const EDIT_PARKING = gql`
mutation UpdateUserParking($epi: UpdateParkingInput!) {
  updateParking(updateParkingInput: $epi){
    ...BasicParkingInformation
  }
}
`