import { useQuery } from "@apollo/client"
import { GET_ALL_VEHICLES } from "queries";
import { BiPlusCircle } from "react-icons/bi";
import NavigationLink from "components/NavigationLink"
import VehicleCard from "components/VehicleCard"
import {
    HeaderSection,
    VehicleList,
    NewLink
} from "./styles"

export default function VehicleSection() {
    const { loading, error, data } = useQuery(GET_ALL_VEHICLES)

    if (error) return <h2>Error</h2>
    if (loading) return <h2>Loading...</h2>

    const { vehicles } = data

    return (
        <>
            <HeaderSection>
                <h1>Vehículos</h1>
                <NavigationLink href="/vehicle/register">
                    <NewLink><BiPlusCircle size="1.5em" /> Nuevo Vehículo</NewLink>
                </NavigationLink>
            </HeaderSection>
            <VehicleList>
                {vehicles.map(vehicle => <VehicleCard key={`${vehicle.id}${vehicle.alias}`} vehicle={vehicle} />)}
            </VehicleList>
        </>
    )
}