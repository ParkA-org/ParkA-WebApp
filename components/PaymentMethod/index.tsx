import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { GET_USER_PAYMENTS } from "queries"
import { CREATE_RESERVATION } from "mutations"
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
    const router = useRouter()
    const [CreateReservation, { loading: loadingCreation, error: errorCreation }] = useMutation(CREATE_RESERVATION)
    const [payment, setPayment] = useState<Payment>()
    const { loading, error, data } = useQuery<AllPaymentsData>(GET_USER_PAYMENTS, {
        onCompleted() {
            if (data && data.getAllUserPayments.length) {
                console.log('Entro en payments')
                setCheckout({ ...checkout, paymentInfo: data.getAllUserPayments[0].id })
                setPayment(data.getAllUserPayments[0])
            }
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

    const handlePaymentClick = () => {
        console.log('Checkout ', checkout)
        CreateReservation({
            variables: {
                crI: {
                    ...checkout
                }
            }
        })
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
                    </div>
                </DataContainer>
            </MainContainer>
            <Button rank="secondary" styles={{ margin: "0 auto", fontSize: "1.5rem" }} onClick={handlePaymentClick}>Procesar Pago</Button>
        </Container>
    )
}