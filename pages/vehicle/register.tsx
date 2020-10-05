import styled from "styled-components";
import Layout from "../layout";

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
  padding:10px 30px 10px 30px;
  text-align:left;
  column-gap:10px;
  row-gap: 10px;
  align-items: center;

`;
export const Label = styled.h2`
  padding:10px;
`;
export const InputText = styled.input`
  padding:10px;
  border:solid;
  border-width: 0 0 3px 0;
  border-color: #077187;

`;

export const Select = styled.select`
  padding:10px;
  border:solid;
  border-width: 0 0 3px 0;
  border-color: #077187;

`;

export const TextArea = styled.textarea`
  background-color: #EBEBEB;
  resize:none;
  height:100px;
  width:90%;
  justify-self: center;
  border-radius: 1em;
`;

export const BtnCancel = styled.button`
  display:flex;
  flex-wrap:nowrap;
  align-items: center;
  justify-content:center;
  color: #B60000;
  background-color:white;
  font-size: 20px;

  & img{
    height: 70px;
  }

  & h2{
    margin-left: 10px;
  }
`;

export const BtnSave = styled.button`
  display:flex;
  flex-wrap:nowrap;
  justify-content:center; 
  align-items: center;
  background-color:white;
  color: #077187;
  font-size: 20px;

  & img{
    height: 70px;
  }

  & h2{
    margin-left: 10px;
  }
`;

export const RadioButton = styled.input`
  margin-right:5px;
`;

export const CarImages = styled.div`
  display:flex;
  flex-wrap: nowrap;
  & > img{
    width: 200px;
    height:100%;
    margin: 20px;
    border-radius: 1.5em;
  }
  & > img:last-child{
    align-self:center;
    width: 100px;
  }
`;

export default function VehicleRegister(): JSX.Element {
  return (
    <Layout pageTitle="Formulario de Vehiculos">
      <div style={{ textAlign: "left" }}>
        <h1>Formulario de Vehiculos</h1>
        <Container>
          <Label style={{ gridArea: "alias1" }}>Alias</Label>
          <InputText style={{ gridArea: "alias2" }}></InputText>
          <Label style={{ gridArea: "placa1" }}>Placa</Label>
          <InputText style={{ gridArea: "placa2" }}></InputText>
          <Label style={{ gridArea: "marca1" }}>Marca</Label>
          <Select style={{ gridArea: "marca2" }}></Select>
          <Label style={{ gridArea: "modelo1" }}>Modelo</Label>
          <Select style={{ gridArea: "modelo2" }}></Select>
          <Label style={{ gridArea: "año1" }}>Año</Label>
          <Select style={{ gridArea: "año2" }}></Select>
          <Label style={{ gridArea: "color1" }}>Color</Label>
          <Select style={{ gridArea: "color2" }}></Select>
          <Label style={{ gridArea: "tipo1" }}>Tipo</Label>
          <div style={{ gridArea: "tipo2" }}>
            <RadioButton type="radio" />
            <label>Propio</label>
            <br />
            <RadioButton type="radio" />
            <label>Rentado</label>
            <br />
            <RadioButton type="radio" />
            <label>Amigo o Familiar</label>
          </div>
          <h4 style={{ gridArea: "detalles1" }}>Detalles adicionales</h4>
          <TextArea style={{ gridArea: "detalles2" }}></TextArea>
          <BtnCancel style={{ gridArea: "cancelar" }}>
            <img src="/images/mdi_delete.svg" />
            <h2>Cancelar</h2>
          </BtnCancel>
          <BtnSave style={{ gridArea: "guardar" }}>
            <img src="/images/mdi_save.svg" />
            <h2>Guardar</h2>
          </BtnSave>
        </Container>

        <div>
          <h1>Imagenes</h1>
          <CarImages>
            <img src="/images/car test.png" />
            <img src="/images/car test.png" />
            <img src="/images/car test.png" />
            <img src="/images/mdi_add.svg" />
          </CarImages>
        </div>
      </div>
      <style jsx>{`
          h1{
            margin-top:20px;
            margin-bottom:10px;
            text-align:left;
          }
        `}
      </style>
    </Layout>
  );
}
