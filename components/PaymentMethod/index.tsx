import CreditCard from "components/CreditCard"
import { Container, DataContainer } from "./styles"

export default function PaymentMethod() {
    return (
        <Container>
            <DataContainer>
                <h2><b>Método de Pago</b></h2>
                <select>
                    <option>Probando</option>
                    <option>Esto</option>
                </select>
                <p><b>Número de Tarjeta</b></p>
                <p>•••• •••• •••• 1234</p>
                <p><b>Tipo</b></p>
                <p>Mastercard</p>
            </DataContainer>
            <CreditCard expirationDate="2020-04-05" cardHolder="Silvio Arzeno" cardNumber="••••••••••••1234" />
        </Container>
    )
}