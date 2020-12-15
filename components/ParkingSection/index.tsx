import NavigationLink from "components/NavigationLink"
import ParkingCard from "components/ParkingCard"
import PlusIcon from "components/Icons/Plus"
import { Parking } from "utils/types";
import { HeaderSection, NewLink, VehicleList } from "components/VehicleSection/styles";
import { ApolloError } from "@apollo/client";

type ComponentProps = {
    loading: boolean;
    error: ApolloError;
    parkings: Parking[]
}

export default function ParkingSection({ error, loading, parkings }: ComponentProps) {

    return (
        <>
            <HeaderSection>
                <h1 style={{ fontSize: "3.5rem" }}>Parqueos</h1>
                <NavigationLink href="/parking/register">
                    <NewLink><PlusIcon />Nuevo Parqueo</NewLink>
                </NavigationLink>
            </HeaderSection>
            {error && <h2>Error</h2>}
            {loading && <h2>Loading...</h2>}
            <VehicleList>
                {parkings.map(parking => {
                    return <ParkingCard key={`${parking.id}${parking.parkingName}`
                    } parking={parking} />
                })}
            </VehicleList>
        </>
    )
}