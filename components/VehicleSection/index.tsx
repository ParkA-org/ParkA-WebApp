import { useQuery } from "@apollo/client"
import { GET_ALL_VEHICLES, GET_MAKES } from "queries";
import { BiPlusCircle } from "react-icons/bi";
import NavigationLink from "components/NavigationLink"
import VehicleCard from "components/VehicleCard"
import {
    HeaderSection,
    VehicleList,
    NewLink
} from "./styles"
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { MakersData } from "utils/types";

export default function VehicleSection() {
    const { token } = useContext(UserContext)

    const { loading: makersLoading, error: makersError, data: makersData } = useQuery<MakersData>(GET_MAKES);
    const { loading, error, data } = useQuery(GET_ALL_VEHICLES, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })

    if (error) return <h2>Error</h2>
    if (loading) return <h2>Loading...</h2>

    const { getAllUserVehicles } = data
    console.log('All vehicles')
    console.log(getAllUserVehicles)
    return (
        <>
            <HeaderSection>
                <h1>Vehículos</h1>
                <NavigationLink href="/vehicle/register">
                    <NewLink><BiPlusCircle size="1.5em" /> Nuevo Vehículo</NewLink>
                </NavigationLink>
            </HeaderSection>
            <VehicleList>
                {getAllUserVehicles.map(vehicle => {
                    return <VehicleCard key={`${vehicle.id}${vehicle.alias}`
                    } vehicle={vehicle} />
                })}
            </VehicleList>
        </>
    )
}