import { BiDollar } from "react-icons/bi"
import CreditCard from "components/CreditCard"
import Button from "components/Button"
import { Container, MainContainer, DataContainer, CTASection } from "./styles"

export default function PaymentMethod() {
    return (
        <Container>
            <MainContainer>
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
            </MainContainer>
            <CTASection>
                <div>
                    <h3>Total: <BiDollar color="#077187" /></h3> <input type="text" />
                </div>
                <Button rank="secondary">Procesar Pago</Button>
            </CTASection>
        </Container>
    )
}