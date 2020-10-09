import styled from "styled-components"
import Layout from "pages/layout"
import DeleteIcon from "components/Icons/Delete"
import VehicleCard from "components/VehicleCard"
import ReservationCard from "components/ReservationCard"
import { CircularButton } from "components/ProfileSection/styles"
import IconButton from "components/IconButton"
import Carousel from "components/Carousel"
import { UserContext } from "context/UserContext"
import { useContext } from "react"

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
    const { user, loading } = useContext(UserContext)
    return (
        <Layout pageTitle="Editar Vehículo">
            <Container>
                <h2>Detalle Vehiculo</h2>
                <section>
                    <VehicleCard />
                    <IconButton color="#AB1414" text="  ">
                        <DeleteIcon />
                    </IconButton>
                </section>
                <section>
                    <blockquote>
                        <h1>Propietario</h1>
                        <h2>{loading ? "Cargando..." : `${user.name} ${user.lastname}`}</h2>
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