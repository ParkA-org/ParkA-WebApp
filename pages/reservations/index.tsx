import Layout from "../layout";
import Carousel from "components/Carousel"
import styled from "styled-components"
import ReservationCard from "components/ReservationCard";
import { NewLink } from "components/VehicleSection/styles";
import NavigationLink from "components/NavigationLink";
import { BiPlusCircle } from "react-icons/bi";
const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: left;
`;
export default function Reservations() {

    return (
        <Layout>
            <Container>
                <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Historial de Reservas</h1>
                <NavigationLink href="/reservations/new">
                    <NewLink><BiPlusCircle size="1.5em" /> Nueva Reserva</NewLink>
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
