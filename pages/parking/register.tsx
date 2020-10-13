import Layout from "../layout"
import ParkingForm from "components/ParkingForm"
import LocationPicker from "components/LocationPicker"
export default function ParkingRegister() {
    return (
        <Layout>
            <div className="container">
                {/* <LocationPicker /> */}
                <ParkingForm />
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