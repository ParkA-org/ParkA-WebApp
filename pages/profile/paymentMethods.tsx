import Carousel from "components/Carousel"
import Layout from "../layout"
import CreditCard from "components/CreditCard"
import PlusIcon from "components/Icons/Plus"
import styled from "styled-components"
import { UserContext } from "context/UserContext";
import { useContext } from "react"
import { GET_PAYMENTS } from "queries"
import { useQuery } from "@apollo/client"


const AddButton = styled.a`
    float:right;
    margin: 0 0 0 0;
    color: #0B768C;
    font-size: 20px;
    font-weight: bold;
    display:flex;
    align-items:center;

    & svg{
        margin-top:15px;
    }
`;

const CardInformation = styled.div`
    background-color: #C4C4C4;
    padding: 0 18px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    display:grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto auto auto auto;
    row-gap:10px;

    & > input {
        background-color: #C4C4C4;
    }

`;

export default function PaymentMethods() {

    const { token } = useContext(UserContext)

    const { loading, error, data } = useQuery(GET_PAYMENTS, {
        fetchPolicy: "network-only",
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })

    if (error) return <h2>Error</h2>
    if (loading) return <h2>Loading...</h2>
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
        </Layout>
    )
}