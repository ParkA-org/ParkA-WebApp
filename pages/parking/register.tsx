import Layout from "../layout"
import ParkingForm from "components/ParkingForm"
import LocationPicker from "components/LocationPicker"
import { useState } from "react"
import { Coordinates } from "utils/types"

export default function ParkingRegister() {
    const [coordinates, setCoordinates] = useState<Coordinates>({
        lat: 0,
        lng: 0
    })
    return (
        <Layout>
            <div className="container">
                <LocationPicker setCoordinates={setCoordinates} />
                <ParkingForm coordinates={coordinates} />
            </div>
            <style jsx>
                {`
                    .container {
                        width: 99vw;
                        text-align: left;
                    }
                `}
            </style>
        </Layout>
    )
}