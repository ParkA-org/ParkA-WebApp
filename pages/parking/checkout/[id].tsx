import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { GET_PARKING_WITH_ID } from "queries"
import { Parking, ReservationInput } from "utils/types"
import { useEffect, useState } from "react"
import Layout from "../../layout"
import ReservationDetail from "components/ReservationDetail"
import MapFragment from "components/MapFragment"
import PaymentMethod from "components/PaymentMethod"

export default function Checkout() {

    const router = useRouter()
    const [parking, setParking] = useState<Parking>(null)
    const [GetParkingWithId, { data, loading, error }] = useLazyQuery(GET_PARKING_WITH_ID)
    const [checkout, setCheckout] = useState<ReservationInput>({})
    const { id } = router.query;

    useEffect(() => {
        if (id)
            GetParkingWithId({ variables: { id: id } })
        if (data)
            setParking(data.getParkingById)
    }, [data, router])

    useEffect(() => {
        if (parking)
            setCheckout({ ...checkout, parking: parking.id, owner: parking.user.id })
    }, [parking])

    return (
        <Layout pageTitle="Parking Checkout">
            <div className="container">
                {parking && <MapFragment coordinates={{ lat: parseFloat(parking.latitude), lng: parseFloat(parking.longitude) }} />}
                <div className="pageContent">
                    {parking ? <ReservationDetail parking={parking} checkout={checkout} setCheckout={setCheckout} /> : <h3>Cargando...</h3>}
                    <PaymentMethod checkout={checkout} setCheckout={setCheckout} />
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