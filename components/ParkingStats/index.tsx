import { BsClock } from "react-icons/bs"
import { BiDollar } from "react-icons/bi"
import {
    Container,
    ItemsContainer,
    Item,
    ChartContainer
} from "./styles"
import BarChart from "components/BarChart"

export default function ParkingStats() {

    return (
        <Container>
            <ItemsContainer>
                <Item><h3><BiDollar fill="#077187" size="1.5em" />Ganancias Totales</h3><p>3,569.89$ RD</p></Item>
                <Item><h3><BiDollar fill="#077187" size="1.5em" />Ganancias Hoy</h3><p>980.89$ RD</p></Item>
                <Item><h3><BsClock fill="#077187" size="1.5em" />Tiempo Promedio de reserva</h3><p>3 horas 15 mins</p></Item>
                <Item><h3><BsClock fill="#077187" size="1.5em" />Dia mas ocupado</h3><p>Lunes</p></Item>
            </ItemsContainer>
            <ChartContainer>
                <h3>Rendimiento por dia</h3>
                <BarChart />
            </ChartContainer>
        </Container>

    )
}