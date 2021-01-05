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
      keys = keys.slice(7);
      values = values.slice(7);
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
    } else {
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Villa Faro",
              data: [10, 20, 15, 30, 60, 40],
              backgroundColor: "rgb(39, 104, 232)",
              borderColor: "rgba(39, 104, 232, 0.5)",
              borderWidth: 3,
              tension: 0,
              fill: false,
            },
            {
              label: "Alma Rosa I",
              data: [30, 10, 25, 10, 20, 45],
              backgroundColor: "rgb(227, 145, 30)",
              borderColor: "rgba(227, 145, 30, 0.5)",
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
                labels: [
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                ],
              },
            ],
          },
        },
      });
    }
  }, [loading]);

  return (
    <>
      <ChartContainer>
        <canvas ref={canvaRef} />
      </ChartContainer>
    </>
  );
}
