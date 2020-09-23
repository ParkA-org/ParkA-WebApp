import styled from "styled-components"
import Layout from "../layout"
import IndicatorStats from "components/IndicatorStats"
import ParkingSection from "components/ParkingSection"
import LineChart from "components/LineChart"

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    @media(max-width: 768px) {
        flex-direction: column;
        height: auto;
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