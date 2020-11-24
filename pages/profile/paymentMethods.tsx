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


    function showInformation(e){
        var content = document.getElementById("information");
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        } 
    }

    if (error) return <h2>Error</h2>
    if (loading) return <h2>Loading...</h2>

    const { getAllUserPayments } = data
    
    return (
        <Layout pageTitle="Métodos de Pago">
            <div>
                <h1>{getAllUserPayments.length}</h1>
                <AddButton><PlusIcon/> Nuevo Método de Pago</AddButton>
                    <h1 style={{textAlign : "left"}}>Métodos de Pago</h1>
                <Carousel title ="">
                    <div onClick={showInformation} >
                        <CreditCard  cardNumber="" cardHolder="" expirationDate=""/>
                    </div>
                    <div onClick={showInformation}>
                        <CreditCard cardNumber="" cardHolder="" expirationDate=""/>
                    </div>
                </Carousel>
                
                <CardInformation id="information">
                    <h3>Número de tarjeta</h3>
                    <input type="text"/>
                    <h3>CVV</h3>
                    <input type="text"/>
                    <h3>Fecha de expiración</h3>
                    <input type="text"/>
                    <h3>Estado</h3>
                    <input type="text"/>
                    <h3>Nombre titular</h3>
                    <input type="text"/>
                    <h3>Tipo</h3>
                    <input type="text"/>
                </CardInformation>
                <img src="/images/creditcards.svg" />
            </div>
        </Layout>
    )
}