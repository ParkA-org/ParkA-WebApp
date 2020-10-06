import styled from "styled-components";
import { Formik, Form } from "formik"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@apollo/client"
import { GET_COLORS, GET_MAKERS, GET_MODELS, GET_VEHICLE_TYPES } from "queries"
import { CreateVehicleSchema } from "utils/schemas"
import { BasicEntity, ColorsData, TypeVehiclesData, ModelsData, MakersData, Maker } from "utils/types"
import Layout from "../layout";
import Field, { SelectField } from "components/Field"
import Spinner from "components/Spinner"
import UploadImageService from "services/uploadImage"

// STYLES 
const Container = styled.div`
  display: grid;
  grid-template-areas:
    "leftSide rightSide"
    "leftSide rightSide"
    "details details"
    "buttons buttons";
  border: solid;
  border-color: #59BCA7;
  background-color:white;
  border-radius: 1.2em;
  padding:10px 30px 10px 30px;
  text-align:left;
  column-gap:10px;
  row-gap: 20px;
  align-items: start;
  padding: 2em;
`;

const RightSideContainer = styled.div`
  grid-area: rightSide;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const LeftSideContainer = styled.div`
  grid-area: leftSide;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  grid-area: details;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  grid-area: buttons;
  height: auto;
  display: flex;
  justify-content: space-around;
`;

const TextArea = styled.textarea`
  background-color: #EBEBEB;
  resize:none;
  height:100px;
  width:90%;
  padding: 0.5em;
  justify-self: center;
  border-radius: 1em;
`;

const BtnCancel = styled.button`
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

const BtnSave = styled.button`
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

const RadioButton = styled.input`
  margin-right:5px;
`;

const CarImages = styled.div`
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
  const router = useRouter()
  const { loading: colorsLoading, error: colorsError, data: colorsData } = useQuery<ColorsData>(GET_COLORS);
  const { loading: makersLoading, error: makersError, data: makersData } = useQuery<MakersData>(GET_MAKERS);
  const { loading: modelsLoading, error: modelsError, data: modelsData } = useQuery<ModelsData>(GET_MODELS);
  const { loading: vehicleTypesLoading, error: vehicleTypesError, data: vehicleTypesData } = useQuery<TypeVehiclesData>(GET_VEHICLE_TYPES);
  return (
    <Layout pageTitle="Formulario de Vehiculos">
      <div style={{ textAlign: "left" }}>
        <h1>Formulario de Vehiculos</h1>
        <Formik initialValues={{
          detail: "",
          color_exterior: "",
          model: "",
          alias: "",
          make: "",
          year: "",
          licenseplate: "",
          type_vehicle: ""
        }}
          validationSchema={CreateVehicleSchema}
          onSubmit={console.log}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Container>
                <LeftSideContainer>
                  <Field
                    label="Alias"
                    name="alias"
                    placeholder="Alias del vehículo"
                    errorMessage={errors.alias}
                    isTouched={touched.alias}
                  />
                  {makersLoading ? <Spinner /> :
                    <SelectField
                      name="make"
                      label="Marca"
                      errorMessage={errors.make}
                      isTouched={touched.make}
                    >
                      {makersData.makes.map((make: Maker) => <option value={make.id} key={make.name}>{make.name}</option>)}
                    </SelectField>}


                  {colorsLoading ? <Spinner /> :
                    <SelectField
                      name="color_exterior"
                      label="Color exterior"
                      errorMessage={errors.color_exterior}
                      isTouched={touched.color_exterior}
                    >
                      {colorsData.colorExteriors.map((color: BasicEntity) => <option value={color.id} key={color.name}>{color.name}</option>)}
                    </SelectField>}
                </LeftSideContainer>
                <RightSideContainer>
                  <Field
                    label="Placa"
                    name="licenseplate"
                    placeholder="Placa del vehículo"
                    errorMessage={errors.licenseplate}
                    isTouched={touched.licenseplate}
                  />

                  {modelsLoading ? <Spinner /> :
                    <SelectField
                      name="model"
                      label="Modelo del vehículo"
                      errorMessage={errors.model}
                      isTouched={touched.model}
                    >
                      {modelsData.models.map((modelo: BasicEntity) => <option value={modelo.id} key={modelo.name}>{modelo.name}</option>)}
                    </SelectField>}

                  <div role="group" id="vehicle-type-group">
                    <h4 style={{ fontSize: "1.25rem" }}>Tipo de vehiculo</h4>

                    {vehicleTypesLoading ? <Spinner /> :
                      vehicleTypesData.typeVehicles.map((vehicleType: BasicEntity) => (
                        <Field
                          key={vehicleType.name}
                          type="radio"
                          label={vehicleType.name}
                          name="type_vehicle"
                          value={vehicleType.id}
                        />
                      ))
                    }
                    {/* <Field
                      type="radio"
                      label="Propio"
                      name="type_vehicle"
                    />
                    <Field
                      type="radio"
                      label="Rentado"
                      name="type_vehicle"
                    />
                    <Field
                      type="radio"
                      label="Amigo o Familiar"
                      name="type_vehicle"
                    /> */}
                    {/* <RadioButton type="radio" />
                    <label>Propio</label>
                    <br />
                    <RadioButton type="radio" />
                    <label>Rentado</label>
                    <br />
                    <RadioButton type="radio" />
                    <label>Amigo o Familiar</label> */}
                  </div>
                </RightSideContainer>
                <DetailsContainer>
                  <Field
                    label="Detalles adicionales"
                    name="detail"
                    placeholder="Detalles adicionales..."
                    component={TextArea}
                    errorMessage={errors.detail}
                    isTouched={touched.detail}
                  />
                  {/* <TextArea style={{ gridArea: "detalles2" }}></TextArea> */}
                </DetailsContainer>
                <ButtonsContainer>
                  <BtnCancel style={{ gridArea: "cancelar" }} type="button">
                    <img src="/images/mdi_delete.svg" />
                    <h2>Cancelar</h2>
                  </BtnCancel>
                  <BtnSave style={{ gridArea: "guardar" }} type="submit">
                    <img src="/images/mdi_save.svg" />
                    <h2>Guardar</h2>
                  </BtnSave>
                </ButtonsContainer>
              </Container>
            </Form>
          )}
        </Formik>

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
