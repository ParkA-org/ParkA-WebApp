
import Layout from "../layout"
import IndicatorStats from "components/IndicatorStats"
import ParkingSection from "components/ParkingSection"
import LineChart from "components/LineChart"

export default function ParkingDashboard() {

    return (
        <Layout pageTitle="Dashboard de Parqueos">
            <div className="main">
                <LineChart />
                <IndicatorStats />
            </div>
            <ParkingSection />
            <style jsx>{`
                .main {
                    width: 80%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
            `}
            </style>
        </Layout>
    )
}