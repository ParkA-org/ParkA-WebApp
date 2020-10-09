import { UserContext } from "context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client"
import { GET_USER_ACCOUNT_DATA, GET_USER_VEHICLES } from "queries";
import { Vehicle } from "utils/types"
import { BiPlusCircle } from "react-icons/bi";
import NavigationLink from "components/NavigationLink"
import VehicleCard from "components/VehicleCard"
import {
    HeaderSection,
    VehicleList,
    NewLink
} from "./styles"

export default function VehicleSection() {
    const { userId } = useContext(UserContext)
    const [accountId, setAccountId] = useState("")
    const [getUserAccount, { data }] = useLazyQuery(GET_USER_ACCOUNT_DATA)
    const [getUserVehicles, { data: vehiclesData }] = useLazyQuery(GET_USER_VEHICLES)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    useEffect(() => {
        if (userId) {
            getUserAccount({ variables: { id: userId } })
        }
        if (data) {
            setAccountId(data.user.account_data.id)
            console.log('Account id ', accountId)
        }
    }, [data, userId])

    useEffect(() => {
        if (accountId) {
            getUserVehicles({ variables: { id: accountId } })
        }

        if (vehiclesData) {
            console.log('DATA Vehiculos')
            setVehicles(vehiclesData.accountDatum.vehicles)
        }

    }, [vehiclesData, accountId])

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
                <VehicleCard />
                <VehicleCard />
            </VehicleList>
        </>
    )
}