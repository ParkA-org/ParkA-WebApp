import { useMemo, useState, useContext } from "react"
import { UserContext } from "context/UserContext"
import { Review } from "utils/types"
import { useTable } from 'react-table'
import { parseISOString } from "utils/functions"
import ModalPortal from "components/Modal"
import { BsStarFill, BsStar } from "react-icons/bs"
import { ModalContainer, ModalText, Avatar, UserInfo, ReviewDate, ModalTitle } from "./styles"

type ComponentProps = {
    reviews: Review[]
}

function ModalCard(userReview: Review) {
    const { user } = useContext(UserContext)
    const { createdAt, title, review, calification } = userReview
    let stars = []
    for (let i = 0; i < calification; i++) {
        stars.push(<BsStarFill color="goldenrod" />)
    }
    for (let i = calification; i < 5 && stars.length != 5; i++) {
        stars.push(<BsStar />)
    }
    return (
        <ModalContainer>
            <Avatar src={user.profilePicture ? user.profilePicture : "/placeholders/image.png"} alt="user avatar" />
            <UserInfo>
                <h3>{`${user.name}`}</h3>
                <div>
                    {stars}
                </div>
            </UserInfo>
            <ReviewDate style={{ marginRight: "2em" }}>
                {`${parseISOString(createdAt).toLocaleDateString('es-ES')}`}
            </ReviewDate>
            <ModalTitle>
                {title}
            </ModalTitle>
            <ModalText>
                {review}
            </ModalText>
        </ModalContainer >
    )
}

export default function ReviewTable({ reviews }: ComponentProps) {
    const [showModal, setShowModal] = useState(false)
    const [selectedReview, setSelectedReview] = useState<Review>()
    const formattedData = reviews.map(review => {
        return { createdAt: review.createdAt, title: review.title, review: review.review, calification: review.calification, image: review.parking.mainPicture, checkInDate: review.reservation.checkInDate }
    })

    const data = useMemo(
        () => formattedData,
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Fecha',
                Cell: (row) => {
                    return <p>{(new Date(row.cell.value)).toLocaleDateString('es-ES')}</p>
                },
                accessor: 'createdAt',
            },
            {
                Header: 'Titulo',
                accessor: 'title',
            },
            {
                Header: 'Comentario',
                accessor: 'review',
            },
            {
                Header: 'Calificación',
                accessor: 'calification',
            },
            {
                Header: 'Imagen',
                Cell: (row) => {
                    return <div><img src={row.cell.value} style={{ width: "100px", height: "100px" }} /></div>
                },
                accessor: 'image',
            },
            {
                Header: 'Fecha reservación',
                Cell: (row) => {
                    return <p>{(new Date(row.cell.value)).toLocaleDateString('es-ES')}</p>
                },
                accessor: 'checkInDate',
            }

        ],

        []

    )



    const {

        getTableProps,

        getTableBodyProps,

        headerGroups,

        rows,

        prepareRow,

    } = useTable({ columns, data })

    return (
        <table {...getTableProps()} className="table">

            <thead>

                {headerGroups.map(headerGroup => (

                    <tr {...headerGroup.getHeaderGroupProps()}>

                        {headerGroup.headers.map(column => (

                            <th

                                {...column.getHeaderProps()}

                                style={{
                                    background: '#63C7B2',
                                    padding: '0.5em',
                                    color: 'black',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }}

                            >

                                {column.render('Header')}

                            </th>

                        ))}

                    </tr>

                ))}

            </thead>

            <tbody {...getTableBodyProps()}>

                {rows.map(row => {

                    prepareRow(row)

                    return (

                        <tr {...row.getRowProps()} onClick={() => {
                            setSelectedReview(row.original)
                            setShowModal(true)
                        }}>

                            {row.cells.map(cell => {

                                return (

                                    <td

                                        {...cell.getCellProps()}

                                        style={{

                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: '#077187',
                                            color: 'white'
                                        }}

                                    >

                                        {cell.render('Cell')}

                                    </td>

                                )

                            })}

                        </tr>

                    )

                })}

            </tbody>
            {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                <ModalCard {...selectedReview} />
            </ModalPortal>}
            <style jsx>{`
                .table{
                    border: 'solid 1px blue';
                    margin-top: 1.5em;
                }
            `}</style>
        </table>
    )
}
