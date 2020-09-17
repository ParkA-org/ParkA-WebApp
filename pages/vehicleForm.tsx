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
    "cancelar cancelar . guardar guardar";
  border: solid;
  border-color: #59BCA7;
  background-color:white;
  border-radius: 1.2em;
  padding:10px;
  justify-items:stretch;
  text-align:left;
  column-gap:10px;
`;
export const Label = styled.h2`

`;
export const InputText = styled.input`
`;

export const Select = styled.select`
`;

export const TextArea = styled.textarea`
  background-color: #EBEBEB;
`;

export const BtnSave = styled.button`
`;

export const BtnCancel = styled.button`
`;

export const RadioButton = styled.input`
  &[type="radio"]{

  }
`;

export default function vehicleFrom(): JSX.Element {
  return (
    <Layout pageTitle="Formulario de Vehiculos">
        <h1 style={{ textAlign:"left"}}>Formulario de Vehiculos</h1>
        <Container>
            <Label style={{gridArea:"alias1"}}>Alias</Label>
            <InputText style={{gridArea:"alias2"}}></InputText>
            <Label style={{gridArea:"placa1"}}>Placa</Label>
            <InputText style={{gridArea:"placa2"}}></InputText>
            <Label style={{gridArea:"marca1"}}>Marca</Label>
            <Select style={{gridArea:"marca2"}}></Select>
            <Label style={{gridArea:"modelo1"}}>Modelo</Label>
            <Select style={{gridArea:"modelo2"}}></Select>
            <Label style={{gridArea:"año1"}}>Año</Label>
            <Select style={{gridArea:"año2"}}></Select>
            <Label style={{gridArea:"color1"}}>Color</Label>
            <Select style={{gridArea:"color2"}}></Select>
            <Label style={{gridArea:"tipo1"}}>Tipo</Label>
            <div style={{gridArea:"tipo2"}}>
              <RadioButton type="radio" />
              <label>Propio</label>
              <br/>
              <RadioButton type="radio" />
              <label>Rentado</label>
              <br/>
              <RadioButton type="radio"/>
              <label>Amigo o Familiar</label>
            </div>
            <h4 style={{gridArea:"detalles1"}}>Detalles adicionales</h4>
            <TextArea style={{gridArea:"detalles2"}}></TextArea>
            <BtnCancel style={{gridArea:"cancelar"}}></BtnCancel>
            <BtnSave style={{gridArea:"guardar"}}></BtnSave>
        </Container>
        <h1 style={{ textAlign:"left"}}>Imagenes</h1>
    </Layout>
  );
}
