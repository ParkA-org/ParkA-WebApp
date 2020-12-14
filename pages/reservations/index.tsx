import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client";
import { GET_CLIENT_RESERVATIONS } from "queries";
import { Reservation, ReservationStatuses } from "utils/types";
import Layout from "../layout"
import Carousel from "components/Carousel"
import styled from "styled-components"
import ReservationCard from "components/ReservationCard"
import { NewLink } from "components/VehicleSection/styles"
import NavigationLink from "components/NavigationLink"
import { AiFillPlusCircle } from "react-icons/ai"
const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: left;
    color: #333;
`;

export type ReservationsData = {
    getAllUserReservationsAsClient: Reservation[];
}

export default function Reservations() {
    const [pendingReservations, setPendingReservations] = useState<Reservation[]>([])
    const [completedReservations, setCompletedReservations] = useState<Reservation[]>([])

    const { loading, error, data } = useQuery<ReservationsData>(GET_CLIENT_RESERVATIONS, {
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        if (data) {
            setPendingReservations(data.getAllUserReservationsAsClient.filter(reservation => reservation.status !== ReservationStatuses.Completed))

            setCompletedReservations(data.getAllUserReservationsAsClient.filter(reservation => reservation.status === ReservationStatuses.Completed))
        }

    }, [data])


    return (
        <Layout>
            <Container>
                <h1 style={{ textAlign: "center", fontSize: "3rem", margin: "0.5em 0" }}>Historial de Reservas</h1>
                <NavigationLink href="/map">
                    <NewLink style={{ color: "#084C7C" }}><AiFillPlusCircle size="1.5em" color="#084C7C" /> Nueva Reserva</NewLink>
                </NavigationLink>
                {error && <h2>Error</h2>}
                {loading && <h2>Cargando...</h2>}
                {pendingReservations.length > 0 ?
                    <Carousel title="Reservas Pendientes">
                        {pendingReservations.map(reservation => {
                            return <ReservationCard {...reservation} key={reservation.id} />
                        })}
                    </Carousel> : <h3>No tienes reservas pendientes</h3>}
                {completedReservations.length > 0 &&
                    <Carousel title="Reservas Pasadas">
                        {completedReservations.map(reservation => {
                            return <ReservationCard {...reservation} key={reservation.id} />
                        })}
                    </Carousel>}
            </Container>
        </Layout>
    )

}
