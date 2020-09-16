import styled from "styled-components";
import Layout from "./layout";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "alias1 alias2 . placa1 placa2"
    "marca1 marca2 . modelo1 modelo2"
    "año1 año2 . tipo1 tipo2"
    "color1 color2 . tipo1 tipo2"
    "detalles1 detalles1 detalles1 detalles1 detalles1"
    "detalles2 detalles2 detalles2 detalles2 detalles2"
    "cancelar cancelar . guardar guardar"
`;
export const Label = styled.h2`

`;
export const InputText = styled.input`
`;

export const TextArea = styled.textarea`
`;

export const BtnSave = styled.button`
`;

export const BtnCancel = styled.button`
`;

export default function vehicleFrom(): JSX.Element {
  return (
    <Layout pageTitle="Formulario de Vehiculos">
        <h1>Formulario de Vehiculos</h1>
        <Container>
            <Label>Alias</Label>
            <InputText></InputText>
            <Label>Placa</Label>
            <InputText></InputText>
            <Label>Marca</Label>
            <InputText></InputText>
            <Label>Modelo</Label>
            <InputText></InputText>
            <Label>Año</Label>
            <InputText></InputText>
            <Label>Color</Label>
            <InputText></InputText>
            <Label>Tipo</Label>
            <h4>Detalles adicionales</h4>
            <TextArea></TextArea>
            <BtnCancel></BtnCancel>
            <BtnSave></BtnSave>
        </Container>
        <h1>Imagenes</h1>
    </Layout>
  );
}
