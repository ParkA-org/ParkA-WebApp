import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { GET_PARKING_WITH_ID } from "queries"
import { Parking } from "utils/types"
import { useEffect, useState } from "react"
import Layout from "../../layout"
import ReservationDetail from "components/ReservationDetail"
import PaymentMethod from "components/PaymentMethod"
export default function Checkout() {
    const router = useRouter()
    const [parking, setParking] = useState<Parking>(null)
    const [GetParkingWithId, { data, loading, error }] = useLazyQuery(GET_PARKING_WITH_ID)
    const { id } = router.query;
    useEffect(() => {
        if (id)
            GetParkingWithId({ variables: { id: id } })
        if (data)
            setParking(data.getParkingById)
    }, [data, router])
    return (
        <Layout pageTitle="Parking Checkout">
            <div className="container">
                <img src="/images/carsParked.webp" alt="parked cars" />
                <div className="pageContent">
                    {parking ? <ReservationDetail parking={parking} /> : <h3>Loading...</h3>}
                    <PaymentMethod />
                </div>
            </div>
            <style jsx>
                {`
                    .container {
                        display: grid;
                        justify-items: space-around;
                        text-align: center;
                        width: 80vw;
                        margin: 2em auto;
                    }

                    img {
                        width: 100%;
                        height: 50vh;
                        min-height: 400px;
                    }
                    .pageContent {
                        display: flex;
                        justify-content: space-between;
                        width: 85vw;
                    }
                `}
            </style>
        </Layout>

    )
}