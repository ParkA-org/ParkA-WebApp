
import { Item } from "components/ParkingStats/styles"
import { BiDollar } from "react-icons/bi"
import { BsClock } from "react-icons/bs"
import BarChart from "components/BarChart"

export default function IndicatorStats() {

    return (
        <div className="container">
            <h2>Indicadores</h2>
            <Item><h3><BiDollar fill="#077187" size="1.5em" />Ganancias Totales</h3><p>3,569.89$ RD</p></Item>
            <Item><h3><BsClock fill="#077187" size="1.5em" />Tiempo Promedio de reserva</h3><p>3 horas 15 mins</p></Item>
            <div>
                <h3>Rendimiento por dia</h3>
                <BarChart />
            </div>
            <style jsx>{`
                .container {
                    margin: 1.5em;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    padding: 0.5em;
                    border: 3px solid #0B768C;
                    border-radius: 25px;
                }


                div > h2 {
                    text-decoration: underline;
                    color: #336F8B;
                }
            `}
            </style>
        </div>
    )
}