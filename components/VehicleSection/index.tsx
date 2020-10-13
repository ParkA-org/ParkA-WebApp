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
                    <NewLink><BiPlusCircle size="1.5em" /> Nuevo Vehículo</NewLink>
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
                    <style jsx>{`
                 .emptySection {
                     margin: 0 auto;
                     display: flex;
                     flex-direction: column;
                     justify-content: space-around;
                     font-size: 1.2rem;
                     max-width: 350px;
                 }
                 h3 {
                     margin: 1em 0;
                     color: #0B768C;
                 }
                `}</style>
                </div>
            }
        </>
    )
}