import { useState, useEffect } from "react"
import Layout from "./layout"
import { useQuery } from "@apollo/client";
import { GET_USER_REVIEWS } from "queries";
import { Review } from "utils/types";
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;

interface ReviewData {
    getAllUserReviews: Review[]
}

export default function ReviewPage() {
    const [userReviews, setUserReviews] = useState<Review[]>([])
    const { loading, error, data } = useQuery<ReviewData>(GET_USER_REVIEWS, {
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        if (data && data.getAllUserReviews) {
            setUserReviews(data.getAllUserReviews)
            console.log(userReviews)
        }
    }, [data])

    const dataExample = [
        {
            "__typename": "Review",
            "title": "Excelente parqueo",
            "calification": 4.5,
            "review": "El parqueo se ve igual que en la foto y muy bueno el trato",
            "createdAt": "2020-11-23T18:36:22.311Z",
            "parking": {
                "__typename": "Parking",
                "id": "ce658432-075b-45cc-98ce-4fc3761221ba",
                "mainPicture": "https://parka-api-bucket-aws.s3.amazonaws.com/parqueo2_89e234acd5.png"
            },
            "reservation": {
                "__typename": "Reservation",
                "checkInDate": "2020-12-10T12:00:22.343Z"
            }
        },
        {
            "__typename": "Review",
            "title": "Parqueo muy malo",
            "calification": 2.5,
            "review": "Muy duro el parqueo pero me robaron una goma",
            "createdAt": "2020-11-23T18:38:22.592Z",
            "parking": {
                "__typename": "Parking",
                "id": "ce658432-075b-45cc-98ce-4fc3761221ba",
                "mainPicture": "https://parka-api-bucket-aws.s3.amazonaws.com/parqueo2_89e234acd5.png"
            },
            "reservation": {
                "__typename": "Reservation",
                "checkInDate": "2020-12-10T12:00:22.343Z"
            }
        }
    ]

    return (
        <Layout pageTitle="Reviews de usuarios">
            {/* {userReviews.length > 0 ? */}
            {/* <div className="wrapper"> */}
            <Table
                height={400}
                data={dataExample}
                onRowClick={data => {
                    console.log(data);
                }}
            >
                <Column width={70} align="center" fixed>
                    <HeaderCell style={{ backgroundColor: 'red' }}>Title</HeaderCell>
                    <Cell style={{ color: "#333" }} dataKey="title" />
                </Column>

                <Column width={200} fixed>
                    <HeaderCell>calification</HeaderCell>
                    <Cell dataKey="calification" />
                </Column>

                {/* <Column width={200}>
                        <HeaderCell>Parking Picture</HeaderCell>
                        <Cell dataKey="parking.mainPicture" />
                    </Column>

                    <Column width={200}>
                        <HeaderCell>Reservation Date</HeaderCell>
                        <Cell dataKey="reservation.checkInDate" />
                    </Column> */}
                {/* 
          <Column width={200}>
            <HeaderCell>Street</HeaderCell>
            <Cell dataKey="street" />
          </Column>

          <Column width={300}>
            <HeaderCell>Company Name</HeaderCell>
            <Cell dataKey="companyName" />
          </Column>

          <Column width={300}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {rowData => {
                function handleAction() {
                  alert(`id:${rowData.id}`);
                }
                return (
                  <span>
                    <a onClick={handleAction}> Edit </a> |{' '}
                    <a onClick={handleAction}> Remove </a>
                  </span>
                );
              }}
            </Cell>
          </Column> */}
                {/* </Table>
                    <style jsx>
                        {`
                        .wrapper {
                            background-color: #333;
                        }
                    `}
                    </style>
                </div> */}
            </Table>
            {/* : <h2>No haz hecho ninguna reseña por el momento</h2>} */}
        </Layout>
    )
}