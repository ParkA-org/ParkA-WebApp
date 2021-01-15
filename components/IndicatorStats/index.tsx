import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_INSIGHTS } from "queries";
import { WeekInsights, ParkingStats } from "utils/types";
import { Item } from "./styles";
import { BiDollar } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import BarChart from "components/BarChart";

export default function IndicatorStats() {
  const { loading, data, error } = useQuery<ParkingStats>(GET_INSIGHTS);
  const [weekData, setWeekData] = useState<WeekInsights>(null);
  const [earnings, setEarnings] = useState(3569.89);
  const [averageTime, setAverageTime] = useState(3.5);

  useEffect(() => {
    if (data) {
      let {
        totalEarnings,
        reservationTimeAverige,
        perDayReservations,
      } = data.getReservationsInsigths;
      setEarnings(totalEarnings);
      setAverageTime(reservationTimeAverige);
      setWeekData(perDayReservations);
    }
  }, [loading]);

  return (
    <div className="container">
      <h2>Indicadores</h2>
      <section>
        <Item>
          <h3>
            <BiDollar fill="#077187" size="1.5em" />
            Ganancias Totales
          </h3>
          <p>{earnings}$ RD</p>
        </Item>
        <Item style={{ width: "320px" }}>
          <h3>
            <BsClock fill="#077187" size="1.5em" />
            Tiempo Promedio de reserva
          </h3>
          <p>
            {parseInt(averageTime.toString())} horas{" "}
            {averageTime.toString().substr(2)} mins
          </p>
        </Item>
      </section>
      <div>
        <h3>Rendimiento por dia</h3>
        {weekData && <BarChart week={weekData} />}
      </div>
      <style jsx>
        {`
                .container {
                    margin: 1.5em 1em;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    padding: 1em;
                    width: 20vw;
                    border: 3px solid #0B768C;
                    border-radius: 25px;
                }

                section {
                    margin: 1em 0;s
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: space-around;
                }

                div > h2 {
                    text-decoration: underline;
                    color: #336F8B;
                }
            `}
      </style>
    </div>
  );
}
