
import Layout from "../layout"
import IndicatorStats from "components/IndicatorStats"
import ParkingSection from "components/ParkingSection"

export default function ParkingDashboard() {

    return (
        <Layout pageTitle="Dashboard de Parqueos">
            <IndicatorStats />
            <ParkingSection />
        </Layout>
    )
}