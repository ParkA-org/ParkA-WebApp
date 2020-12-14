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
    profilePicture
  }
}
`

export const GET_LOGGED_USER = gql`
query GetLogUser {
  getLoggedUser {
    name
    lastName
    email
    profilePicture
    confirmed
    userInformation {
      documentNumber
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
      make {
        name
        icon
      }
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
    mainPicture
    latitude
    longitude
    information
    sector
    direction
    countParking
    priceHours
    isAvailable
    verified
  }
}
`

export const GET_PARKINGS = gql`
query GetParkings($filterV: FilterInput!) {
  getAllParkings(input: $filterV) {
    id
    countParking
    latitude
    longitude
    published
    parkingName
    priceHours
    isAvailable
    mainPicture
  	pictures
    user{
      id
    }
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

export const GET_PARKING_WITH_ID = gql`
query GetParkingWithId($id: String!){
  getParkingById(id: $id){
    id
    parkingName
    direction
    sector
    latitude
    longitude
    priceHours
    countParking
    isAvailable
    verified
    information
    mainPicture
    pictures
    user {
      id
    }
    features {
      id
      name
    }
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

export const GET_USER_PAYMENTS = gql`
query GetPaymentsMethods {
  getAllUserPayments {
    id
    cardHolder
    expirationDate
    digit
    activated
    card {
      id
      name
    }
  }
}
`

export const GET_CLIENT_RESERVATIONS = gql`
query GetClientReservations{
  getAllUserReservationsAsClient {
    id
    checkInDate
    checkOutDate
    total
    status
    parking {
      id
      mainPicture
      latitude
      longitude
    }
    vehicle {
      id
    }
    client {
      id
    }
  }
}
`

export const GET_OWNER_RESERVATIONS = gql`
query GetOwnerReservations{
  getAllUserReservationsAsOwner {
    id
    checkInDate
    checkOutDate
    total
    status
    client {
      id
    }
    vehicle {
      id
    }
    parking {
      id
      mainPicture
    }
  }
}
`

export const GET_RESERVATION_BY_ID = gql`
query GetReservationById($var: GetReservationById!) {
  getReservationById(getReservationByIdInput: $var){
    checkInDate
    checkOutDate
    vehicle {
      alias
      model {
        id
        name
      }
      licensePlate
      mainPicture
    } 
    paymentInfo {
      expirationDate
      cardHolder
      digit
      card {
        id
        name
      }
      activated
    }
    parking {
      user {
        id
      }
      mainPicture
      latitude
      longitude
      priceHours
      parkingName
      features {
        id
        name
      }
    }
    total
  }
  
}
`

export const GET_PAYMENTS = gql`
query GetPayments{
  getAllUserPayments{
		id,
    cardHolder,
    expirationDate,
    digit,
    activated,
    card{
      id,
      name
    },
  }
}
`

export const GET_PARKING_REVIEWS = gql`
query GetAllParkingReviews($gprI: GetAllParkingReviewInput!) {
  getAllParkingReviews(getAllParkingReviewInput: $gprI) {
    id
    title
    calification
    createdAt
    review
    user {
      name
      lastName
      profilePicture
    }
    parking {
      id
      rating
    }
  }
}
`

export const GET_USER_REVIEWS = gql`
  query GetAllUserReviews {
    getAllUserReviews {
      title
      calification
      review
      createdAt
      parking {
        id
        mainPicture
      }
      reservation {
        checkInDate
      }
    }
  }
`