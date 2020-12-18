import styled from "styled-components"
import Layout from "../layout"
import { useQuery } from "@apollo/client";
import { GET_USER_PARKINGS } from "queries";
import { ParkingData } from "utils/types";
import IndicatorStats from "components/IndicatorStats"
import ParkingSection from "components/ParkingSection"
import LineChart from "components/LineChart"
import React from "react";
import { NewLink } from "components/VehicleSection/styles";
import PlusIcon from "components/Icons/Plus"
import NavigationLink from "components/NavigationLink"

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

    let getAllUserParkings = []
    const { loading, error, data } = useQuery<ParkingData>(GET_USER_PARKINGS, {
        fetchPolicy: "network-only"
    })
    if (data)
        getAllUserParkings = data.getAllUserParkings

    return (
        <Layout pageTitle="Dashboard de Parqueos">
            {getAllUserParkings.length > 0 ?
                <>
                    <Container>
                        <LineChart />
                        <IndicatorStats />
                    </Container>
                    <ParkingSection loading={loading} error={error} parkings={getAllUserParkings} />
                </>
                :
                <div className="emptySection">
                    <div>
                        <img src="/placeholders/empty/parking.svg" alt="empty vehicle" />
                        <h3>¡No tienes parqueos registrados!</h3>
                    </div>
                    <NavigationLink href="/parking/register">
                        <NewLink><PlusIcon />Registra tu primer parqueo</NewLink>
                    </NavigationLink>
                    <style jsx>{`
                        .emptySection {
                            margin: 2em auto;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            font-size: 1.2rem;
                            height: auto;
                            max-width: 50vw;
                        }
                        h3 {
                            margin: 1em 0;
                            color: #0B768C;
                        }

                        .emptySection > div {
                            display: flex;
                            flex-direction: column;
                            margin-right: 4em;
                        }
                    `}</style>
                </div>
            }
        </Layout>
    )
}