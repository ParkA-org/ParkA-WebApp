import {
    Container,
    ReservationImage,
    MetadataSection,
    CostSection,
    ButtonSection,
    ReservationsButton,
    ActionButtonsSection,
    Item
} from "./styles"
import Link from "next/link"
import NavigationLink from "components/NavigationLink"
export default function ReservationCard({ isCancelable }: { isCancelable?: boolean }) {
    return (
        <Container>
            <ReservationImage src="/placeholders/park-placeholder.png" />
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
                {isCancelable ?
                    <ReservationsButton isCancelable>Cancelar</ReservationsButton> : ""}
                <ActionButtonsSection>
                    <ReservationsButton> <Link href="/parking/detail"><a style={{ color: "white", textDecoration: "none" }}>Detalles</a></Link></ReservationsButton>
                    <ReservationsButton><Link href="/chat"><a style={{ color: "white", textDecoration: "none" }}>Mensajear</a></Link></ReservationsButton>
                </ActionButtonsSection>
            </ButtonSection>
        </Container>

    )
}