import Carousel from "components/Carousel"
import Layout from "../layout"
import CreditCard from "components/CreditCard"
import PlusIcon from "components/Icons/Plus"
import styled from "styled-components"


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

export default function PaymentMethods() {

    return (
        <Layout pageTitle="Métodos de Pago">
            <div>
                <AddButton><PlusIcon /> Nuevo Método de Pago</AddButton>
                <h1 style={{textAlign : "left"}}>Métodos de Pago</h1>
                <Carousel title ="">
                    <CreditCard  cardNumber="" cardHolder="" expirationDate=""/>
                    <div style={{margin:"10px"}}></div>
                    <CreditCard  cardNumber="" cardHolder="" expirationDate=""/>
                </Carousel>
                <img src="/images/creditcards.svg" />
                
            </div>
        </Layout>
    )
}