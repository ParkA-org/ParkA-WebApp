import { useContext, useEffect } from "react"
import styled from "styled-components"
import Layout from "pages/layout"
import DeleteIcon from "components/Icons/Delete"
import VehicleCard from "components/VehicleCard"
import ReservationCard from "components/ReservationCard"
import { CircularButton } from "components/ProfileSection/styles"
import IconButton from "components/IconButton"
import Carousel from "components/Carousel"
import { UserContext } from "context/UserContext"
import { useRouter } from "next/router"
import { useLazyQuery } from "@apollo/client";
import { GET_VEHICLE_BY_ID } from "queries"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    text-align: left;
    & > section {
        margin-bottom: 2em;
        text-align: left;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export default function DetailVehicle() {
    const router = useRouter()
    const { token } = useContext(UserContext)
    const [GetVehicle, { data, loading, error }] = useLazyQuery(GET_VEHICLE_BY_ID, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })
    useEffect(() => {
        console.log('Router id')
        console.log(router.query.id)
        if (router.query.id)
            GetVehicle({ variables: { vehicleId: { id: router.query.id } } })
        console.log('Data')
        console.log(data)
    }, [data, router])

    if (loading) return <h3>Loading...</h3>

    return (
        <Layout pageTitle="Editar Vehículo">
            <Container>
                <h2>Detalle Vehiculo</h2>
                {loading && <h3>Loading...</h3>}
                {error && <h3>Ocurrio un error</h3>}
                {data &&
                    <section>
                        <VehicleCard vehicle={data.getVehicleById} />
                        <IconButton color="#AB1414" text="">
                            <DeleteIcon />
                        </IconButton>
                    </section>
                }
                <section>
                    <blockquote>
                        <h1>Propietario</h1>
                        {/* <h2>{loading ? "Cargando..." : `${user?.name} ${user?.lastname}`}</h2> */}
                    </blockquote>
                    <CircularButton color="#336F8B;"><p>10</p> Reservas Completadas</CircularButton>
                    <CircularButton color="#B40909;"><p>1</p> Denuncias</CircularButton>
                </section>
                <section>
                    <Carousel title="Historial de Reservas">
                        <ReservationCard />
                        <ReservationCard />
                        <ReservationCard />
                        <ReservationCard />
                        <ReservationCard />
                    </Carousel>
                </section>
            </Container>
        </Layout>
    )
}