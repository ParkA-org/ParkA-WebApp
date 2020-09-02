
import Layout from "./layout";
import styled from "styled-components";
import {
    MainFormContainer
  } from "../styles/formStyles";

export const Container = styled.div`
  display: grid;
  grid-template-columns: ... | ...;
  grid-template-rows: ... | ... | ... | ... | ...;

  & > p{
    text-align:left;
    margin:20px;
  }

  & > h1{
    text-align:left;
    color: #59BCA7;
    margin-left: 20px;
  }

  & > h4{
    margin: 40px;
    color: #59BCA7
  }
`;

export default function AboutUs():JSX.Element{
    return(
        <Layout pageTitle="Preguntas Frecuentes">
            <MainFormContainer>
            <Container>
                <h1 style={{gridArea:"1 / 1 / 2 / 3"}}>Preguntas Frecuentes</h1>
                <h4 style={{gridArea:"2 / 1 / 3 / 2"}}>¿Permiten el pago en efectivo?</h4>
                <p style={{gridArea:"3 / 1 / 4 / 2"}}>Durante esta primera versión el único pago aceptado es por tarjeta de crédito/débito. Se tiene planteado más adelante agregar esta funcionalidad al sistema.</p>
                <h4 style={{gridArea:"2 / 2 / 3 / 3"}}>Una vez hecha la reserva ¿puedo extenderla? </h4>
                <p style={{gridArea:"3 / 2 / 4 / 3"}}>Una vez hecha la reserva puedes extenderla siempre y cuando el parqueo no tenga futuros usuarios.</p>
                <h4 style={{gridArea:"4 / 1 / 5 / 2"}}>¿Qué pasa si me excedo por unos minutos del tiempo que reserve en un inicio?</h4>
                <p style={{gridArea:"5 / 1 / 6 / 2"}}>Dependiendo de los minutos que se exceda, se procedera a pagar una multa de alrededor RD$50~500 dependiendo del tiempo excedido.</p>
                <h4 style={{gridArea:"4 / 2 / 5 / 3"}}>¿Qué pasa si recibo daños a mi parqueo/vehiculo durante una reservación?</h4>
                <p style={{gridArea:"5 / 2 / 6 / 3"}}>Además de dejar tu reseña ya sea al alquilador del parqueo o dueño del vehículo. Puedes contactarnos por medio del siguiente formulario donde te contactaremos con los demás pasos a seguir.</p>
            </Container>
            </MainFormContainer>
        </Layout>
    );
}