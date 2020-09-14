import Layout from "../layout"
import PaymentMethod from "components/PaymentMethod"
export default function Checkout() {

    return (
        <Layout pageTitle="Parking Checkout">
            <h2>Checkout</h2>
            <PaymentMethod />
        </Layout>
    )
}