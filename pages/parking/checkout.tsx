import Layout from "../layout"
import ReservationDetail from "components/ReservationDetail"
import PaymentMethod from "components/PaymentMethod"
export default function Checkout() {

    return (
        <Layout pageTitle="Parking Checkout">
            <div className="container">
                <h2>Checkout</h2>
                <ReservationDetail />
                <PaymentMethod />
            </div>
            <style jsx>
                {`
                    .container {
                        display: grid;
                        grid-gap: 20px;
                        justify-items: space-around;
                        text-align: center;
                        width: 80vw;
                        margin: 2em auto;
                    }
                `}
            </style>
        </Layout>

    )
}