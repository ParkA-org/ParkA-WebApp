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

export default function Reservations() {
    return (
        <Layout>
            <Container>
                <h1 style={{ textAlign: "center", fontSize: "3rem", margin: "0.5em 0" }}>Historial de Reservas</h1>
                <NavigationLink href="/map">
                    <NewLink style={{ color: "#084C7C" }}><AiFillPlusCircle size="1.5em" color="#084C7C" /> Nueva Reserva</NewLink>
                </NavigationLink>
                <Carousel title="Reservas Pendientes">
                    <ReservationCard isCancelable />
                    <ReservationCard isCancelable />
                    <ReservationCard isCancelable />
                    <ReservationCard isCancelable />
                    <ReservationCard isCancelable />
                </Carousel>
                <Carousel title="Reservas Pasadas">
                    <ReservationCard />
                    <ReservationCard />
                    <ReservationCard />
                    <ReservationCard />
                    <ReservationCard />
                </Carousel>
            </Container>
        </Layout>
    )

}
