import Layout from "../layout"
import ReservationDetail from "components/ReservationDetail"
import PaymentMethod from "components/PaymentMethod"
export default function Checkout() {

    return (
        <Layout pageTitle="Parking Checkout">
            <div className="container">
                <img src="/images/carsParked.webp" alt="parked cars" />
                <div className="pageContent">
                    <ReservationDetail />
                    <PaymentMethod />
                </div>
            </div>
            <style jsx>
                {`
                    .container {
                        display: grid;
                        justify-items: space-around;
                        text-align: center;
                        width: 80vw;
                        margin: 2em auto;
                    }

                    img {
                        width: 100%;
                        height: 50vh;
                        min-height: 400px;
                    }
                    .pageContent {
                        display: flex;
                    }
                `}
            </style>
        </Layout>

    )
}