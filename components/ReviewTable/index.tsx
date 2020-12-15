import { useMemo, useState, useContext } from "react"
import { UserContext } from "context/UserContext"
import { Review } from "utils/types"
import { useTable } from 'react-table'
import { parseISOString } from "utils/functions"
import ModalPortal from "components/Modal"
import { BsStarFill, BsStar } from "react-icons/bs"
import { Container, ModalContainer, ModalText, Avatar, UserInfo, ReviewDate, ModalTitle, TableHeader, TableCell, TableRow, ReviewBody } from "./styles"

type ComponentProps = {
    reviews: Review[]
}

function ModalCard(userReview: Review) {
    const { user } = useContext(UserContext)
    const { createdAt, title, review, calification } = userReview
    let stars = []
    for (let i = 0; i < calification; i++) {
        stars.push(<BsStarFill color="goldenrod" size="2em" />)
    }
    for (let i = calification; i < 5 && stars.length != 5; i++) {
        stars.push(<BsStar size="2em" />)
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

    const graphicStars = (amountSelected) => {
        let res = []
        for (let i = 0; i < 5; i++) {
            if (i < amountSelected) {
                res.push(<BsStarFill fill="#D8DC2A" size="1.5em" />)
            } else {
                res.push(<BsStar fill="#D8DC2A" size="1.5em" />)
            }
        }
        return res
    }

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
                Cell: (row) => {
                    return <ReviewBody> {row.cell.value}</ReviewBody >
                },
                accessor: 'review',
            },
            {
                Header: 'Calificación',
                Cell: (row) => {
                    return <p> {graphicStars(row.cell.value)} </p>
                },
                accessor: 'calification',
            },
            {
                Header: 'Imagen',
                Cell: (row) => {
                    return <div><img src={row.cell.value} style={{ width: "230px", height: "150px" }} /></div>
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
        <Container>
            <table {...getTableProps()} className="table">

                <thead>

                    {headerGroups.map(headerGroup => (

                        <TableRow {...headerGroup.getHeaderGroupProps()}>

                            {headerGroup.headers.map(column => (

                                <TableHeader
                                    {...column.getHeaderProps()}
                                >

                                    {column.render('Header')}

                                </TableHeader>

                            ))}

                        </TableRow>

                    ))}

                </thead>

                <tbody {...getTableBodyProps()}>

                    {rows.map(row => {

                        prepareRow(row)

                        return (

                            <TableRow {...row.getRowProps()} onClick={() => {
                                setSelectedReview(row.original)
                                setShowModal(true)
                            }}>

                                {row.cells.map(cell => {

                                    return (

                                        <TableCell
                                            {...cell.getCellProps()}
                                        >

                                            {cell.render('Cell')}

                                        </TableCell>

                                    )

                                })}

                            </TableRow>

                        )

                    })}

                </tbody>
                {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                    <ModalCard {...selectedReview} />
                </ModalPortal>}
                <style jsx>{`
            `}</style>
            </table>
        </Container>
    )
}
