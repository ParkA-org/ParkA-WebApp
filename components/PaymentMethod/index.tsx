import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { GET_USER_PAYMENTS } from "queries"
import NavigationLink from "components/NavigationLink"
import CreditCard from "components/CreditCard"
import Button from "components/Button"
import { Container, MainContainer, DataContainer, StyledSelect } from "./styles"
import { ReservationInput, Payment } from "utils/types"

type ComponentProps = {
    checkout: ReservationInput;
    setCheckout: React.Dispatch<React.SetStateAction<ReservationInput>>;
}


type AllPaymentsData = {
    getAllUserPayments: Payment[]
}

export default function PaymentMethod({ checkout, setCheckout }: ComponentProps) {
    const [payment, setPayment] = useState<Payment>()
    const { loading, error, data } = useQuery<AllPaymentsData>(GET_USER_PAYMENTS, {
        onCompleted() {
            if (data && data.getAllUserPayments.length)
                setPayment(data.getAllUserPayments[0])
        }
    })

    const formatNumbers = (data: string): string => {
        return `•••• •••• •••• ${data.substr(data.length - 4)}`
    }

    if (loading)
        return <h2>Cargando los metodos de pago...</h2>

    if (error)
        return <h3>Paso algo</h3>

    if (data && data.getAllUserPayments.length == 0) {
        return (
            <>
                <h3>Aún no tienes un método de pago registrado</h3>
                <NavigationLink href="/payment">Ir a metodos de pago</NavigationLink>
            </>
        )
    }


    return (
        <Container>
            <MainContainer>
                {payment &&
                    <CreditCard expirationDate={payment.expirationDate} cardHolder={payment.cardHolder} cardNumber={payment.digit} />
                }
                <DataContainer>
                    <div>
                        <h2><b>Método de Pago</b></h2>
                        <StyledSelect onChange={e => {
                            const { target } = e
                            const { value } = target
                            const selectedPayment = data.getAllUserPayments.find(payment => payment.id === value)
                            setCheckout({ ...checkout, paymentInfo: selectedPayment.id })
                            setPayment(selectedPayment)
                        }} >
                            {data && data.getAllUserPayments.map(payment => <option key={payment.id} value={payment.id}>{payment.cardHolder}</option>)}
                        </StyledSelect>
                        {payment &&
                            (<>
                                <p><b>Número de Tarjeta</b></p>
                                <p>{formatNumbers(payment.digit)}</p>
                                <p><b>Tipo</b></p>
                                <p>{payment.card.name}</p>
                            </>)
                        }
                        <Button rank="secondary">Procesar Pago</Button>
                    </div>
                </DataContainer>
            </MainContainer>
        </Container>
    )
}