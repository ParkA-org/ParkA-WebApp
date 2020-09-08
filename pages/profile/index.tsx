import { useEffect } from "react"
import Layout from "../layout";
import ProfileSection from "components/ProfileSection"
import VehicleSection from "components/VehicleSection"
import styled from "styled-components"
import useUser from "hooks/useUser";
import { useRouter } from "next/router";

const Container = styled.div`
width: 100%;
margin: 0 auto;
`;

export default function Profile(): JSX.Element {
    const router = useRouter()
    const { isLogged } = useUser()

    useEffect(() => {
        if (!isLogged) {
            router.push("/login")
        }
    }, [isLogged])
    return (
        <Layout pageTitle="Profile">
            <Container>
                <ProfileSection />
                <VehicleSection />
            </Container>
        </Layout>
    );
}
