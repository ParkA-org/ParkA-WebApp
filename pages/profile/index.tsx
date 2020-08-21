import Layout from "../layout";
import ProfileSection from "components/ProfileSection"
import VehicleSection from "components/VehicleSection"
import styled from "styled-components"

const Container = styled.div`
width: 70vw;
margin: 0 auto;
`;

export default function Profile(): JSX.Element {
    return (
        <Layout pageTitle="Profile">
            <Container>
                <ProfileSection />
                <VehicleSection />
            </Container>
        </Layout>
    );
}
