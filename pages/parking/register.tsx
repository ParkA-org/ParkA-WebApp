import Layout from "../layout"
import ParkingForm from "components/ParkingForm"
import LocationPicker from "components/LocationPicker"
export default function ParkingRegister() {
    return (
        <Layout>
            <div className="container">
                <h2>Registro de Parqueo</h2>
                <LocationPicker />
                <ParkingForm />
            </div>
            <style jsx>
                {`
                    .container {
                        width: 80vw;
                        text-align: left;
                    }
                `}
            </style>
        </Layout>
    )
}