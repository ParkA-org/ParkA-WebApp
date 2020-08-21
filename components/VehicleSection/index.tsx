import NavigationLink from "components/NavigationLink"
import VehicleCard from "components/VehicleCard"
import {
    HeaderSection,
    VehicleList
} from "./styles"

export default function VehicleSection() {
    return (
        <>
            <HeaderSection>
                <h2>Vehículos</h2>
                <NavigationLink href="/vehicle/new">
                    Nuevo Vehículo
                </NavigationLink>
            </HeaderSection>
            <VehicleList>
                <VehicleCard />
                <VehicleCard />
                <VehicleCard />
            </VehicleList>
        </>
    )
}