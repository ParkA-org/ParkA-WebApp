import { useQuery } from "@apollo/client"
import { GET_ALL_VEHICLES } from "queries";
import PlusIcon from "components/Icons/Plus"
import NavigationLink from "components/NavigationLink"
import VehicleCard from "components/VehicleCard"
import {
    HeaderSection,
    VehicleList,
    NewLink
} from "./styles"
import { UserContext } from "context/UserContext";
import { useContext } from "react"

export default function VehicleSection() {
    const { token } = useContext(UserContext)

    const { loading, error, data } = useQuery(GET_ALL_VEHICLES, {
        fetchPolicy: "network-only",
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })

    if (error) return <h2>Error</h2>
    if (loading) return <h2>Loading...</h2>

    const { getAllUserVehicles } = data
    return (
        <>
            <HeaderSection>
                <h1>Vehículos</h1>
                <NavigationLink href="/vehicle/register">
                    <NewLink><PlusIcon />  Nuevo Vehículo</NewLink>
                </NavigationLink>
            </HeaderSection>
            {getAllUserVehicles.length > 0 ?
                <VehicleList>
                    {getAllUserVehicles.map(vehicle => {
                        return <VehicleCard key={`${vehicle.id}${vehicle.alias}`
                        } vehicle={vehicle} />
                    })}
                </VehicleList>
                :
                <div className="emptySection">
                    <img src="/placeholders/empty/vehicle.svg" alt="empty vehicle" />
                    <h3>¡No tienes vehiculos registrados!</h3>

                </div>
            }
        </>
    )
}