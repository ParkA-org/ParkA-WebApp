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
    width: auto;
    padding: 0 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const InformationSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
<<<<<<< HEAD
    const {getAllUserPayments }= data;

    function showInformation(userPayment){
        console.log(userPayment);
        document.getElementById("digit").value = userPayment.digit;
        document.getElementById("expirationDate").value = userPayment.expirationDate;
        document.getElementById("activated").value = userPayment.activated;
        document.getElementById("cardHolder").value = userPayment.cardHolder;
        document.getElementById("type").value = userPayment.card.name;
        var content = document.getElementById("information");
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        } 
    }

    console.log(getAllUserPayments[0].cardHolder);
    return (
        <Layout pageTitle="Métodos de Pago">
            <div>
                <AddButton><PlusIcon/> Nuevo Método de Pago</AddButton>
                    <h1 style={{textAlign : "left"}}>Métodos de Pago</h1>
                
                    {getAllUserPayments.length > 0 ?
                        <Carousel title ="">
                        {getAllUserPayments.map( userPayment =>
                            <div onClick={() => showInformation(userPayment)} >
                                <CreditCard  cardNumber={userPayment.digit} cardHolder={userPayment.cardHolder} expirationDate={userPayment.expirationDate}/>
                            </div>
                        )}
                        </Carousel>
                        :
                        <img src="/images/creditcards.svg" />
                    }
                
                
                <CardInformation id="information">
                    <h3>Número de tarjeta</h3>
                    <input id="digit" type="text"/>
                    <h3>CVV</h3>
                    <input id="cvv" type="text"/>
                    <h3>Fecha de expiración</h3>
                    <input id="expirationDate" type="text"/>
                    <h3>Estado</h3>
                    <input id="activated" type="text"/>
                    <h3>Nombre titular</h3>
                    <input id="cardHolder" type="text"/>
                    <h3>Tipo</h3>
                    <input id="type" type="text"/>
                </CardInformation>
            </div>
=======

    const { getAllUserPayments } = data

    return (
        <Layout pageTitle="Métodos de Pago">
            <PageContainer>
                <section className="HeaderSection">
                    <h1 style={{ marginRight: "3em" }}>Métodos de pago</h1>
                    <NavigationLink href="/register/PaymentInformation">
                        <NewLink><PlusIcon />Nuevo Método de Pago</NewLink>
                    </NavigationLink>
                </section >
                <Carousel title="">
                    {getAllUserPayments.map(payment => { return <CreditCard onClick={() => setPayment(payment)} cardNumber={payment.digit} cardHolder={payment.cardHolder} expirationDate={payment.expirationDate} cardStyles={{ marginRight: "20px", minWidth: "450px" }} /> })}

                </Carousel>

                {currentPayment === null ? <img src="/images/creditcards.svg" style={{ maxHeight: "40vh" }} /> : (
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
>>>>>>> 196d18be9eae54e968a6237622e4332fc5d9dd1d
        </Layout>
    )
}