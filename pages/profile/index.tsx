import { useContext, useEffect } from "react"
import Layout from "../layout";
import ProfileSection from "components/ProfileSection"
import VehicleSection from "components/VehicleSection"
import styled from "styled-components"
import { useRouter } from "next/router";
import { USER_STATES } from "utils/constants"
import { UserContext } from "context/UserContext";
import { initializeApollo } from "lib/apolloClient";
import { GET_ALL_VEHICLES } from "queries"


const Container = styled.div`
width: 100%;
margin: 0 auto;
`;

export default function Profile(): JSX.Element {
    const router = useRouter()
    const { userStatus } = useContext(UserContext)

    useEffect(() => {
        // if (userStatus === USER_STATES.NOT_KNOWN) {
        //     console.log('waiting')
        // } else
        // if (userStatus === USER_STATES.LOGGED_OUT) {
        //     router.push("/login")
        // }
    }, [userStatus])
    return (
        <Layout pageTitle="Profile">
            <Container>
                <ProfileSection />
                <VehicleSection />
            </Container>
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
