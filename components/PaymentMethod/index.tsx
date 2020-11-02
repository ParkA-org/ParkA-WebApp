import { BiDollar } from "react-icons/bi"
import CreditCard from "components/CreditCard"
import Button from "components/Button"
import { Container, MainContainer, DataContainer, StyledInput } from "./styles"

export default function PaymentMethod() {
    return (
        <Container>
            <MainContainer>
                <CreditCard expirationDate="2020-04-05" cardHolder="Silvio Arzeno" cardNumber="••••••••••••1234" />
                <DataContainer>
                    <div>
                        <h2><b>Método de Pago</b></h2>
                        <select>
                            <option>Probando</option>
                            <option>Esto</option>
                        </select>
                        <p><b>Número de Tarjeta</b></p>
                        <p>•••• •••• •••• 1234</p>
                        <p><b>Tipo</b></p>
                        <p>Mastercard</p>
                        <h3>Total: <BiDollar color="#077187" /></h3> <StyledInput type="text" style={{ backgroundColor: "#F6F6F6" }} />
                        <Button rank="secondary">Procesar Pago</Button>
                    </div>
                </DataContainer>
            </MainContainer>
        </Container>
    )
}