import { useRef, useEffect } from "react";
import styled from "styled-components";
import { Chart } from "chart.js";
import { useQuery } from "@apollo/client";
import { GET_INSIGHTS } from "queries";
import { ParkingStats } from "utils/types";

export default function LineChart() {
  const ChartContainer = styled.div`
    position: relative;
    height: 60vh;
    width: 60vw;

    @media (max-width: 768px) {
      height: 500px;
      width: 320px;
    }
  `;
  const presentationalMonths = {
    january: "Enero",
    february: "Febrero",
    march: "Marzo",
    april: "Abril",
    may: "Mayo",
    june: "Junio",
    july: "Julio",
    august: "Agosto",
    september: "Septiembre",
    october: "Octubre",
    november: "Noviembre",
    december: "Diciembre",
  };
  const { loading, data, error } = useQuery<ParkingStats>(GET_INSIGHTS);

  const canvaRef = useRef(null);
  useEffect(() => {
    let ctx = canvaRef.current;
    if (data) {
      let { perMonthEarning } = data.getReservationsInsigths;
      let keys = [],
        values = [];
      for (const [key, value] of Object.entries(perMonthEarning)) {
        keys.push(key);
        values.push(value);
      }
      keys = [...keys.slice(9), ...keys.slice(1, 3)];
      values = [...values.slice(9), ...values.slice(1, 3)];
      keys = keys.map((k) => presentationalMonths[k]);
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Ganancias en pesos dominicanos",
              data: values,
              backgroundColor: "rgb(39, 104, 232)",
              borderColor: "rgba(39, 104, 232, 0.5)",
              borderWidth: 3,
              tension: 0,
              fill: false,
            },
          ],
        },
        options: {
          showLines: true,
          responsive: true,
          title: {
            display: true,
            fontSize: 20,
            position: "top",
            text: "Ganancias de parqueos últimos 6 meses",
          },
          scales: {
            xAxes: [
              {
                type: "category",
                labels: keys,
              },
            ],
          },
        },
      });
    }
  }, [loading]);

  return (
    <>
      {data && (
        <ChartContainer>
          <canvas ref={canvaRef} />
        </ChartContainer>
      )}
      {!data && <h3>Cargando estadisticas...</h3>}
    </>
  );
}
