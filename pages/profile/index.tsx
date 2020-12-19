import Layout from "../layout";
import ProfileSection from "components/ProfileSection"
import VehicleSection from "components/VehicleSection"
import styled from "styled-components"
import useAuth from "hooks/useAuth"
import { initializeApollo } from "lib/apolloClient";
import { GET_ALL_VEHICLES } from "queries"


const Container = styled.div`
width: 100%;
margin: 0 auto;
`;

export default function Profile(): JSX.Element {

    const { isLoggedIn, loading } = useAuth()

    return (
        <Layout pageTitle="Profile">
            {loading && <h3>Cargando....</h3>}
            {isLoggedIn && <Container>
                <ProfileSection />
                <VehicleSection />
            </Container>}
        </Layout>
    );
}

// export async function getStaticProps() {
//     const apolloClient = initializeApollo()

//     await apolloClient.query({ query: GET_ALL_VEHICLES,  context: {
//         headers: {
//             'Authorization': 
//         }
//     }})

//     return {
//         props: {
//             initialApolloState: apolloClient.cache.extract()
//         }
//     }

// }
