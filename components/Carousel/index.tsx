import ReservationCard from "components/ReservationCard"
import { Container, ScrollSection } from "./styles"
export default function Carousel() {
    return (
        <Container>
            <h1>Historial de Reservas</h1>
            <ScrollSection>
                <ReservationCard />
                <ReservationCard />
                <ReservationCard />
                <ReservationCard />
                <ReservationCard />
            </ScrollSection>
        </Container>
    )
}