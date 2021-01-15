import { useRef, useEffect } from "react";
import { Chart } from "chart.js";
import { WeekInsights } from "utils/types";

type ComponentProps = {
  week: WeekInsights;
};

export default function BarChart({ week }: ComponentProps) {
  const presentationalWeek = {
    sunday: "Domingo",
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miercoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sabado",
  };

  const canvaRef = useRef(null);
  useEffect(() => {
    let ctx = canvaRef.current;
    let keys = [],
      values = [];
    for (const [key, value] of Object.entries(week)) {
      keys.push(key);
      values.push(value);
    }
    keys = keys.slice(1);
    values = values.slice(1);
    keys = keys.map((k) => presentationalWeek[k]);
    let myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: keys,
        datasets: [
          {
            label: "Cantidad de reservas",
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(66, 245, 218, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(66, 245, 218, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, []);

  return <canvas ref={canvaRef} />;
}
