import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Parking } from "utils/types"
import Layout from "../../layout";
import { GET_PARKING_WITH_ID } from "queries";
import ParkingForm from "components/ParkingForm/edit"
import { useLazyQuery } from "@apollo/client";

export default function EditParking(): JSX.Element {
    const router = useRouter()
    const { id } = router.query
    const [parking, setParking] = useState<Parking>(null)
    const [GetParkingWithId, { data, loading, error }] = useLazyQuery(GET_PARKING_WITH_ID)
    useEffect(() => {
        if (id) {
            GetParkingWithId({ variables: { id: id } })
        }
        if (data) {
            setParking(data.getParkingById)
        }

    }, [id, data])
    if (loading) return <h3>Cargando... </h3>
    if (error) return <h3>Error...</h3>

    return (
        <Layout pageTitle="Editar parqueo">
            {parking && <ParkingForm {...parking} />}
        </Layout>
    )
}