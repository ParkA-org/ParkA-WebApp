import { useRef, useEffect } from "react"
import { Chart } from "chart.js"

export default function LineChart() {

    const canvaRef = useRef(null)
    useEffect(() => {
        let ctx = canvaRef.current;
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Villa Faro',
                    data: [10, 20, 15, 30, 60, 40],
                    backgroundColor: 'rgb(39, 104, 232)',
                    borderColor: 'rgba(39, 104, 232, 0.5)',
                    borderWidth: 3,
                    tension: 0,
                    fill: false
                },
                {
                    label: 'Alma Rosa I',
                    data: [30, 10, 25, 10, 20, 45],
                    backgroundColor: 'rgb(227, 145, 30)',
                    borderColor: 'rgba(227, 145, 30, 0.5)',
                    borderWidth: 3,
                    tension: 0,
                    fill: false
                }]
            },
            options: {
                showLines: true,
                title: {
                    display: true,
                    fontSize: 24,
                    position: 'top',
                    text: 'Ganancias de parqueos últimos 6 meses'
                },
                scales: {
                    xAxes: [{
                        type: 'category',
                        labels: ['Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre']
                    }]
                }
            }
        });
    }, [])


    return (
        <>
            <div className="charContainer">
                <canvas ref={canvaRef} height="400" width="500" />
            </div>
            <style jsx>
                {`
                .charContainer {
                    width: 500px;
                    height: 350px;
                }
            `}
            </style>
        </>
    )

}