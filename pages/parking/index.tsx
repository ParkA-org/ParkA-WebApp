import styled from "styled-components"
import Layout from "../layout"
import IndicatorStats from "components/IndicatorStats"
import ParkingSection from "components/ParkingSection"
import LineChart from "components/LineChart"

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media(max-width: 768px) {
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }
`;

export default function ParkingDashboard() {

    return (
        <Layout pageTitle="Dashboard de Parqueos">
            <Container>
                <LineChart />
                <IndicatorStats />
            </Container>
            <ParkingSection />
        </Layout>
    )
}