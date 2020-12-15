import CreditCard from "components/CreditCard"
import { Container, MainContainer, DataContainer } from "./styles"
import { Payment } from "utils/types"

type ComponentProps = {
    payment: Payment;
}

export default function PaymentMethod({ payment }: ComponentProps) {

    const formatNumbers = (data: string): string => {
        return `•••• •••• •••• ${data.substr(data.length - 4)}`
    }
    return (
        <Container>
            <MainContainer>
                <CreditCard expirationDate={payment.expirationDate} cardHolder={payment.cardHolder} cardNumber={payment.digit} />
                <DataContainer>
                    <div>
                        <h2><b>Método de Pago</b></h2>
                        <>
                            <p><b>Número de Tarjeta</b></p>
                            <p>{formatNumbers(payment.digit)}</p>
                            <p><b>Tipo</b></p>
                            <p>{payment.card.name}</p>
                        </>
                    </div>
                </DataContainer>
            </MainContainer>
        </Container>
    )
}