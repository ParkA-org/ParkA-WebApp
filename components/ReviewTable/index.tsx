import { useMemo } from "react"
import { Review } from "utils/types"
import { useTable } from 'react-table'

type ComponentProps = {
    reviews: Review[]
}

export default function ReviewTable({ reviews }: ComponentProps) {

    const formattedData = reviews.map(review => {
        return { timeStamp: review.createdAt, title: review.title, body: review.review, calification: review.calification, image: review.parking.mainPicture, checkInDate: review.reservation.checkInDate }
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
                accessor: 'timeStamp',
            },
            {
                Header: 'Titulo',
                accessor: 'title',
            },
            {
                Header: 'Comentario',
                accessor: 'body',
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

                                    borderBottom: 'solid 3px red',

                                    background: 'aliceblue',

                                    color: 'black',

                                    fontWeight: 'bold',

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

                        <tr {...row.getRowProps()}>

                            {row.cells.map(cell => {

                                return (

                                    <td

                                        {...cell.getCellProps()}

                                        style={{

                                            padding: '10px',

                                            border: 'solid 1px gray',

                                            background: 'papayawhip',

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
            <style jsx>{`
                .table{
                    border: 'solid 1px blue';
                    margin-top: 1.5em;
                }
            `}</style>
        </table>
    )
}