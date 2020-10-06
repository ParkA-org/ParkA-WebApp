import { useEffect, useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik"
import { useRouter } from "next/router"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"
import { GET_COLORS, GET_MODELS, GET_USER_ACCOUNT_DATA, GET_VEHICLE_TYPES } from "queries"
import { CREATE_VEHICLE } from "mutations"
import useUser from "hooks/useUser"
import { CreateVehicleSchema } from "utils/schemas"
import { BasicEntity, ColorsData, TypeVehiclesData, ModelsData } from "utils/types"
import Layout from "../layout";
import { default as OwnField } from "components/Field"
import { SelectField } from "components/Field"
import Spinner from "components/Spinner"
import MultipleImagePicker from "components/MultipleImagePicker"
import ModalPortal from "components/Modal"
import { uploadMultipleImages } from "services/uploadImage"

// STYLES 
const Container = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  border: solid;
  border-color: #59BCA7;
  background-color:white;
  border-radius: 1.2em;
  column-gap:10px;
  row-gap: 20px;
  align-items: start;
  padding: 2em 0.5em 2em 4em;
`;

const RightSideContainer = styled.div`
  grid-column: 3 / span 2;
  height: auto;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 0 auto;
  }
`;

const LeftSideContainer = styled.div`
  grid-column: 1 / span 2;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  grid-column: 1 / span 4;
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  & > label {
    color: #333;
    margin-bottom: 0.5em;
    font-weight: bolder;
  }
  & > textarea {
    background-color: #EBEBEB;
    resize:none;
    height:100px;
    width:80%;
    padding: 0.5em;
    justify-self: center;
    border-radius: 1em;
  }
`;

const ButtonsContainer = styled.div`
  grid-column: 1 / span 4;
  height: auto;
  display: flex;
  justify-content: space-around;
  width: 90%;
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

export default function VehicleRegister(): JSX.Element {
  const router = useRouter()
  const { userId } = useUser()
  const [accountId, setAccountId] = useState("")
  const [files, setFiles] = useState([])
  const [imagesUrl, setImagesUrl] = useState([])
  const [imagesStatus, setImagesStatus] = useState({
    loading: false,
    error: null
  })

  const [getUserAccount, { data }] = useLazyQuery(GET_USER_ACCOUNT_DATA)
  const { loading: colorsLoading, error: colorsError, data: colorsData } = useQuery<ColorsData>(GET_COLORS);
  const { loading: modelsLoading, error: modelsError, data: modelsData } = useQuery<ModelsData>(GET_MODELS);
  const { loading: vehicleTypesLoading, error: vehicleTypesError, data: vehicleTypesData } = useQuery<TypeVehiclesData>(GET_VEHICLE_TYPES);

  const [showModal, setShowModal] = useState(false)
  const [requestError, setRequestError] = useState(null)

  useEffect(() => {
    if (userId) {
      getUserAccount({ variables: { id: userId } })
    }
    if (data) {
      console.log('User accountdata id ', data.user.account_data.id)
      setAccountId(data.user.account_data.id)
    }
  }, [data, userId])

  const [CreateVehicle] = useMutation(CREATE_VEHICLE, {
    onCompleted({ createVehicle }) {
      setShowModal(false)
      router.push('/profile')
    },
    onError(error) {
      console.log('Using mutation on error')
      setRequestError(error)
      setShowModal(false)
      console.error(error)
    }
  })

  return (
    <Layout pageTitle="Formulario de Vehiculos">
      <div style={{ textAlign: "left", width: "80%", margin: "0 auto" }}>
        <h1>Formulario de Vehiculos</h1>
        <Formik initialValues={{
          detail: "",
          color_exterior: "",
          model: "",
          alias: "",
          year: "",
          licenseplate: "",
          type_vehicle: ""
        }}
          validationSchema={CreateVehicleSchema}
          onSubmit={async (values) => {
            setShowModal(true)
            setImagesStatus(prevState => {
              return { ...prevState, loading: true }
            })

            uploadMultipleImages(files)
              .then(response => {
                return response.data
              }).then(results => {
                let ids = results?.map(obj => obj.id)
                CreateVehicle({
                  variables: {
                    newVehicle: {
                      data: {
                        detail: values.detail,
                        color_exterior: values.color_exterior,
                        model: values.model,
                        alias: values.alias,
                        year: values.year,
                        licenseplate: values.licenseplate,
                        type_vehicle: values.type_vehicle,
                        account_data: accountId,
                        pictures: ids,
                        mainpicture: ids[0]
                      }
                    }
                  }
                })
              })
              .catch(error => console.error(error))

          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Container>
                <LeftSideContainer>
                  <OwnField
                    label="Alias"
                    name="alias"
                    placeholder="Alias del vehículo"
                    errorMessage={errors.alias}
                    isTouched={touched.alias}
                  />
                  <OwnField
                    label="Año"
                    name="year"
                    placeholder="Año"
                    errorMessage={errors.year}
                    isTouched={touched.year}
                  />

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
                  <OwnField
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

                  <div role="group" id="vehicle-type-group" style={{ display: "flex", justifyContent: "space-between", width: "60%", marginTop: "2em" }}>
                    <h4 style={{ fontSize: "1.25rem" }}>Tipo de vehiculo</h4>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {vehicleTypesLoading ? <Spinner /> :
                        vehicleTypesData.typeVehicles.map((vehicleType: BasicEntity) => (
                          <div className="radioContainer">
                            <Field
                              key={vehicleType.name}
                              type="radio"
                              label={vehicleType.name}
                              name="type_vehicle"
                              value={vehicleType.id}
                            />
                            <label>
                              {vehicleType.name}
                            </label>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </RightSideContainer>
                <DetailsContainer>
                  <label>
                    Detalles adicionales
                            </label>
                  <Field
                    label="Detalles adicionales"
                    name="detail"
                    placeholder="Detalles adicionales..."
                    component="textarea"
                  />
                </DetailsContainer>
                <ButtonsContainer>
                  <BtnCancel type="button">
                    <img src="/images/mdi_delete.svg" />
                    <h2>Cancelar</h2>
                  </BtnCancel>
                  <BtnSave type="submit">
                    <img src="/images/mdi_save.svg" />
                    <h2>Guardar</h2>
                  </BtnSave>
                </ButtonsContainer>
              </Container>
            </Form>
          )}
        </Formik>

        <div style={{ marginBottom: "2em" }}>
          <MultipleImagePicker setFiles={setFiles} />
        </div>
        {showModal && <ModalPortal onClose={() => setShowModal(false)}>
          <Spinner />
          <h3>Loading...</h3>
        </ModalPortal>}
      </div>
      <style jsx>{`
          h1{
            margin-top:20px;
            margin-bottom:10px;
            text-align:left;
          }
          .radioContainer {
            display: flex;
            justify-content: flex-start;
          }
          .radioContainer > label {
            font-size: 1rem;
            font-weight: 800;
            margin-left: 1em;
          }
        `}
      </style>
    </Layout >
  );
}
