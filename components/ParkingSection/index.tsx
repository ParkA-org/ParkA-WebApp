import { BiPlusCircle } from "react-icons/bi";
import NavigationLink from "components/NavigationLink"
import ParkingCard from "components/ParkingCard"
import { HeaderSection, NewLink, VehicleList } from "components/VehicleSection/styles";
import { useQuery } from "@apollo/client";
import { UserContext } from "context/UserContext";
import { GET_USER_PARKINGS } from "queries";
import { useContext } from "react";
import { ParkingData } from "utils/types";


export default function ParkingSection() {
    const { token } = useContext(UserContext)

    const { loading, error, data } = useQuery<ParkingData>(GET_USER_PARKINGS, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })

    if (error) return <h2>Error</h2>
    if (loading) return <h2>Loading...</h2>

    const { getAllUserParkings } = data
    return (
        <>
            <HeaderSection>
                <h1>Parqueos</h1>
                <NavigationLink href="/parking/register">
                    <NewLink><BiPlusCircle size="1.5em" /> Nuevo Parqueo</NewLink>
                </NavigationLink>
            </HeaderSection>
            {getAllUserParkings.length > 0 ?
                <VehicleList>
                    {getAllUserParkings.map(parking => {
                        return <ParkingCard key={`${parking.id}${parking.parkingName}`
                        } parking={parking} />
                    })}
                </VehicleList>
                :
                <div className="emptySection">
                    <img src="/placeholders/empty/parking.svg" alt="empty vehicle" />
                    <h3>¡No tienes parqueos registrados!</h3>
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
            <VehicleList>
                <ParkingCard />
                <ParkingCard />
                <ParkingCard />
            </VehicleList>
        </>
    )
}