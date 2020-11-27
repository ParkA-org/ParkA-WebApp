import { useContext, useState } from "react"
import { Payment } from "utils/types"
import Carousel from "components/Carousel"
import Layout from "../layout"
import CreditCard from "components/CreditCard"
import PlusIcon from "components/Icons/Plus"
import styled from "styled-components"
import { UserContext } from "context/UserContext";
import { GET_PAYMENTS } from "queries"
import { useQuery } from "@apollo/client"
import NavigationLink from "components/NavigationLink"

const PageContainer = styled.div`
    height: 88vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const InformationSection = styled.section`
    background-color: #C4C4C4;
    padding: 2em; 
    margin-top: 2em;
`

const EliminateButton = styled.button`
    background-color: #F1526F;
    font-size: 1.2rem;
    color: #000;
    padding: 0.5em;
    border-radius: 10px;
`

const CardInformation = styled.div`
    width: 60vw;
    margin-bottom: 2em;
    transition: max-height 0.2s ease-out;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 25px;

    & > input {
        background-color: #C4C4C4;
    }
`;

const NewLink = styled.h3`
    display: flex;
    justify-items: center;
    align-items: center;
    font-size: 1.5em;
    color: #0B768C;

    & > svg {
        margin-right: 0.5em;
    }
`;

const CardElement = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;

    & > p {
        font-size: 1.1rem;
    }
`

export type PaymentsData = {
    getAllUserPayments: Payment[];
}


export default function PaymentMethods() {

    const formatDate = (data: string): string => {
        if (data.length === 5)
            return data
        else
            return `${data.substr(5, 2)}/${data.substr(2, 2)}`;
    };

    const { token } = useContext(UserContext)
    const [currentPayment, setPayment] = useState<Payment | null>(null)

    const { loading, error, data } = useQuery<PaymentsData>(GET_PAYMENTS, {
        fetchPolicy: "network-only",
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })

    if (error) return <h2>Error</h2>
    if (loading) return <h2>Loading...</h2>

    const { getAllUserPayments } = data

    return (
        <Layout pageTitle="Métodos de Pago">
            <PageContainer>
                <section className="HeaderSection">
                    <h1>Métodos de pago</h1>
                    <NavigationLink href="/register/PaymentInformation">
                        <NewLink><PlusIcon />Nuevo Método de Pago</NewLink>
                    </NavigationLink>
                </section >
                <Carousel title="">
                    {getAllUserPayments.map(payment => { return <CreditCard onClick={() => setPayment(payment)} cardNumber={payment.digit} cardHolder={payment.cardHolder} expirationDate={payment.expirationDate} cardStyles={{ marginRight: "20px", minWidth: "450px" }} /> })}

                </Carousel>

                {currentPayment === null ? <img src="/images/creditcards.svg" /> : (
                    <InformationSection>
                        <CardInformation>
                            <CardElement>
                                <h4>Número de tarjeta</h4>
                                <p>{currentPayment.digit}</p>
                            </CardElement>
                            <CardElement>
                                <h4>Fecha de expiración</h4>
                                <p>{formatDate(currentPayment.expirationDate)}</p>
                            </CardElement>
                            <CardElement>
                                <h4>Estado</h4>
                                <p>{currentPayment.activated ?
                                    <span className="activated">Activada</span> :
                                    <span>Desactivada</span>}</p>
                            </CardElement>
                            <CardElement>
                                <h4>Nombre titular</h4>
                                <p>{currentPayment.cardHolder}</p>
                            </CardElement>
                            <CardElement>
                                <h4>Tipo</h4>
                                <p>{currentPayment.card.name}</p>
                            </CardElement>
                        </CardInformation>
                        <EliminateButton>Eliminar método de pago</EliminateButton>
                    </InformationSection>
                )}
                <style jsx>{`
                    .activated {
                        color: #009E19;
                    }
                    .HeaderSection {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        margin-top: 3em;
                    }
                    span {
                        color: #FC0606;
                    }
                `}</style>
            </PageContainer>
        </Layout>
    )
}