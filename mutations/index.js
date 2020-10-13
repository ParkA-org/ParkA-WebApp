import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation CreateUser($cuInput: createUserInput!){
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
  mutation UpdateUser($user: updateUserInput) {
    updateUser(input: $user) {
      user {
        id
      }
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
mutation ValidateEmail($emInput: ValidateEmailCodeInput!){
  validateEmailCode(validateEmailCodeInput: $emInput){
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
mutation UpdateVehicle($uvInput: updateVehicleInput!){
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
    parkingName
    calendar
    priceHours
    mainPicture
    isAvailable
    sector
    direction
    information
  }
}
`