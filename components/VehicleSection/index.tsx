import { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { GET_ALL_VEHICLES } from "queries";
import PlusIcon from "components/Icons/Plus"
import NavigationLink from "components/NavigationLink"
import VehicleCard from "components/VehicleCard"
import {
    HeaderSection,
    VehicleList,
    NewLink
} from "./styles"

export default function VehicleSection() {
    const router = useRouter()
    const { loading, error, data } = useQuery(GET_ALL_VEHICLES, {
        fetchPolicy: "network-only",
        errorPolicy: 'all'
    })

    if (error){
        return (
        <>
            <h2>Error</h2>
            <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
      </pre>
        </>)
        }
    
    if(data) {
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
return <h2>Loading...</h2>

}