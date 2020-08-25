import Button from "components/Button"
import {
    Container,
    ReservationImage,
    MetadataSection,
    CostSection,
    ButtonSection,
    Item
} from "./styles"
export default function ReservationCard() {
    return (
        <Container>
            <ReservationImage src="../placeholders/image-placeholder.png" />
            <MetadataSection>
                <Item>
                    <h3>Fecha</h3>
                    <p>20 Jun 2020</p>
                </Item>
                <Item>
                    <h3>Desde</h3>
                    <p>08:00 PM</p>
                </Item>
                <Item>
                    <h3>Hasta</h3>
                    <p>11:00 PM</p>
                </Item>
            </MetadataSection>
            <CostSection>
                <h3>Costo</h3>
                <p>350.00 $RD</p>
            </CostSection>
            <ButtonSection>
                <Button>Detalles</Button>
                <Button>Mensajear</Button>
            </ButtonSection>
        </Container>

    )
}