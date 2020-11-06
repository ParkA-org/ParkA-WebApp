import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik"
import { useRouter } from "next/router"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"
import { GET_MAKES, GET_COLORS, GET_BODY_STYLES } from "queries"
import { CREATE_VEHICLE } from "mutations"
import { CreateVehicleSchema } from "utils/schemas"
import { BasicEntity, ColorsData, BodyStylesData, MakersData } from "utils/types"
import Layout from "../layout";
import { default as OwnField } from "components/Field"
import { SelectField } from "components/Field"
import ImagePicker from "components/ImagePicker"
import Spinner from "components/Spinner"
import MultipleImagePicker from "components/MultipleImagePicker"
import ModalPortal from "components/Modal"
import { uploadMultipleImages } from "services/uploadImage"
import { UserContext } from "context/UserContext";

// STYLES 
const Container = styled.div`
  margin: 0 auto;
  display: grid;
  width: 90%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  align-items: center;
  justify-items: center;
  border: solid;
  border-color: #59BCA7;
  background-color:white;
  border-radius: 1.2em;
  column-gap:10px;
  row-gap: 20px;
  padding: 2em 2em;
`;

const RightSideContainer = styled.div`
  grid-column: 2;
  height: auto;
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0 auto;
  }
`;

const LeftSideContainer = styled.div`
  grid-column: 1;
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
  const { token } = useContext(UserContext)
  const [accountId, setAccountId] = useState("")
  const [files, setFiles] = useState([])
  const [imagesUrl, setImagesUrl] = useState([])
  const [imagesStatus, setImagesStatus] = useState({
    loading: false,
    error: null
  })
  const { loading: makersLoading, error: makersError, data: makersData } = useQuery<MakersData>(GET_MAKES);
  const { loading: colorsLoading, error: colorsError, data: colorsData } = useQuery<ColorsData>(GET_COLORS);
  const { loading: bodyStylesLoading, error: bodyStylesError, data: bodyStylesData } = useQuery<BodyStylesData>(GET_BODY_STYLES);

  const [showModal, setShowModal] = useState(false)
  const [requestError, setRequestError] = useState(null)

  const [CreateVehicle] = useMutation(CREATE_VEHICLE, {
    onCompleted() {
      setShowModal(false)
      // router.push('/profile')
    },
    onError(error) {
      console.log('Using mutation on error')
      setRequestError(error)
      setShowModal(false)
      console.error(error)
    },
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    }
  })

  const [options, setOptions] = useState([])
  useEffect(() => {
    if (makersData)
      makersData.getAllMakes.map(make => make.models.map(model => setOptions((prev) => [...prev, <option value={model.id} key={model.name}>{model.name}</option>])))
  }, [makersData])

  return (
    <Layout pageTitle="Formulario de Vehiculos">
      <div style={{ textAlign: "left", width: "80%", margin: "0 auto" }}>
        <h1 style={{ color: "#333" }}>Formulario de Vehiculos</h1>
        <Formik initialValues={{
          licensePlate: "",
          detail: "",
          alias: "",
          bodyStyle: "",
          year: "",
          colorExterior: "",
          model: "",
          mainPicture: "asd",
          pictures: ["asd", "asd"]
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
                let urls = results?.map(obj => obj.url)
                CreateVehicle({
                  variables: {
                    cvInput: {
                      detail: values.detail,
                      colorExterior: values.colorExterior,
                      model: values.model,
                      alias: values.alias,
                      year: values.year,
                      licensePlate: values.licensePlate,
                      bodyStyle: values.bodyStyle,
                      pictures: urls,
                      mainPicture: urls[0]
                    }
                  }
                })
                router.push('/profile')
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
                    containerStyles={{ width: "300px" }}
                  />
                  <OwnField
                    label="Año"
                    name="year"
                    placeholder="Año"
                    errorMessage={errors.year}
                    isTouched={touched.year}
                    containerStyles={{ width: "300px" }}
                  />

                  {colorsLoading ? <Spinner /> :
                    <SelectField
                      name="colorExterior"
                      label="Color exterior"
                      errorMessage={errors.colorExterior}
                      isTouched={touched.colorExterior}
                    >
                      {colorsData.getAllColors.map((color: BasicEntity) => <option value={color.id} key={color.name}>{color.name}</option>)}
                    </SelectField>}
                </LeftSideContainer>
                <RightSideContainer>
                  <OwnField
                    label="Placa"
                    name="licensePlate"
                    placeholder="Placa del vehículo"
                    errorMessage={errors.licensePlate}
                    isTouched={touched.licensePlate}
                    containerStyles={{ width: "300px" }}
                  />

                  {makersLoading ? <Spinner /> :
                    <SelectField
                      name="model"
                      label="Modelo del vehículo"
                      errorMessage={errors.model}
                      isTouched={touched.model}
                      containerStyles={{ width: "300px" }}
                    >
                      {options}
                    </SelectField>}

                  <div role="group" id="vehicle-type-group" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "80%", marginLeft: "0" }}>
                    <h4 style={{ fontSize: "1.25rem" }}>Tipo de vehiculo</h4>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      {bodyStylesLoading ? <Spinner /> :
                        bodyStylesData.getAllBodyStyles.map((vehicleType: BasicEntity) => (
                          <div className="radioContainer">
                            <Field
                              key={vehicleType.name}
                              type="radio"
                              label={vehicleType.name}
                              name="bodyStyle"
                              value={vehicleType.id}
                              containerStyles={{ width: "300px" }}
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
                    style={{ width: "900px" }}
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
          {/* <MultipleImagePicker setFiles={setFiles} /> */}
          <ImagePicker setFiles={setFiles} />
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
            margin-right: 2em;
            margin-top: 1em;
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
