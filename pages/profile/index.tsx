import { useEffect, useContext } from "react"
import { UserContext } from "context/UserContext"
import styled from "styled-components"
import Layout from "../layout";
import ProfileSection from "components/ProfileSection"
import VehicleSection from "components/VehicleSection"
import { initializeApollo } from "lib/apolloClient";
import { GET_ALL_VEHICLES } from "queries"


const Container = styled.div`
width: 100%;
margin: 0 auto;
`;

export default function Profile(): JSX.Element {

    const { redirect, loading, userStatus } = useContext(UserContext)

    useEffect(() => {
        redirect('/profile')
    }, [loading])

    if(userStatus === true){
            return (
                <Layout pageTitle="Profile">
                    <Container>
                        <ProfileSection />
                        <VehicleSection />
                    </Container>
            </Layout>
        );
    }
    
    return (
        <Layout pageTitle="Profile">
            <h3>Cargando....</h3>
        </Layout>
    )
}