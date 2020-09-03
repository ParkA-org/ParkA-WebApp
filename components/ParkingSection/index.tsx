import { BiPlusCircle } from "react-icons/bi";
import NavigationLink from "components/NavigationLink"
import ParkingCard from "components/ParkingCard"
import { HeaderSection, NewLink, VehicleList } from "components/VehicleSection/styles";


export default function ParkingSection() {
    return (
        <>
            <HeaderSection>
                <h1>Parqueos</h1>
                <NavigationLink href="/parking/new">
                    <NewLink><BiPlusCircle size="1.5em" /> Nuevo Parqueo</NewLink>
                </NavigationLink>
            </HeaderSection>
            <VehicleList>
                <ParkingCard />
                <ParkingCard />
                <ParkingCard />
            </VehicleList>
        </>
    )
}