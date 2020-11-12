import { useState, useEffect } from "react"
import { Formik, Form } from "formik"
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from "next/router"
import { GET_BIRTH_PLACES, GET_NATIONALITIES } from "queries"
import { CREATE_USER, CREATE_USER_INFO } from "mutations"
import { PersonalIdentificationSchema } from "utils/schemas"
import useLocalStorage from "hooks/useLocalStorage"
import Layout from "../layout"
import NavigationLink from "components/NavigationLink"
import Field, { SelectField } from "components/Field"
import ModalPortal from "components/Modal"
import Button from "components/Button"
import Spinner from "components/Spinner"
import IdentificationCard from "components/IdentificationCard"
import { BasicEntity, BirthPlaceData, NationalityData } from "utils/types"
import MaskedInput from "react-text-mask"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  FormHeading
} from "styles/formStyles"


export default function RegisterPersonalIdentificacion(): JSX.Element {
  const [image, setLocalImage] = useLocalStorage("image", "../placeholders/image.png")
  const [localUser, setLocalUser] = useLocalStorage("user", {})
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { loading: nationalitiesLoading, error: nationalitiesError, data: nationalityData } = useQuery<NationalityData>(GET_NATIONALITIES);
  const { loading: birthPlaceLoading, error: birthPlaceError, data: birthPlacedata } = useQuery<BirthPlaceData>(GET_BIRTH_PLACES);
  let userValues = {
    typeOfDocument: "",
    documentCode: "",
    dateOfBirth: "",
    birthPlace: "",
    nationality: "",
    telephoneNumber: ""
  }
  const [initialUserValues, setInitialUserValues] = useState({
    typeOfDocument: "",
    documentCode: "",
    dateOfBirth: "",
    birthPlace: "",
    nationality: "",
    telephoneNumber: ""
  })

  const [CreateUser] = useMutation(CREATE_USER)
  const [CreateUserInfo] = useMutation(CREATE_USER_INFO, {
    onCompleted({ createUserInformation }) {
      const { id } = createUserInformation
      CreateUser({
        variables: {
          cuInput: {
            name: localUser.name,
            lastName: localUser.lastName,
            email: localUser.email,
            password: localUser.password,
            userInformation: id,
            profilePicture: image,
            origin: "web"
          }
        }
      })
      setShowModal(false)
      router.push('/confirmEmail')
    }
  })

  const cardMask = [
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/
  ];


  useEffect(() => {
    for (const key in userValues) {
      if (localUser[key]) {
        userValues[key] = localUser[key]
      }
    }
    setInitialUserValues(userValues)
  }, [localUser])

  if (birthPlaceError) return <pre>`Error ${JSON.stringify(birthPlaceError)}`</pre>

  return (
    <Layout pageTitle="Identificación Personal">
      <style jsx>{`
        
      `}</style>
      <MainFormContainer>
        <FormHeading>
          <img src="/images/logo1.svg" alt="ParkA logo" />
          <h2>Identificación Personal</h2>

        </FormHeading>
        <Formik
          enableReinitialize={true}
          initialValues={initialUserValues}
          validationSchema={PersonalIdentificationSchema}
          onSubmit={(values) => {
            setLocalUser({ ...localUser, ...values })

            let newDate = new Date(values.dateOfBirth).toISOString()
            setShowModal(true)
            CreateUserInfo({
              variables: {
                cuiInput: {
                  paymentInformation: "cc78a504-aafe-4917-afe9-f3a3ecee8b07",
                  birthDate: newDate,
                  documentNumber: values.documentCode,
                  telephoneNumber: values.telephoneNumber.replaceAll("-", ""),
                  nationality: nationalityData.getAllNationalities.filter(nation => nation.name == values.nationality)[0].id,
                  placeOfBirth: birthPlacedata.getAllCountries.filter(country => country.name == values.birthPlace)[0].id,
                }
              }
            })
          }}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <SelectField
                    name="typeOfDocument"
                    label="Tipo de documento"
                    placeholder="Tipo de documento"
                    placement="horizontal"
                    errorMessage={errors.typeOfDocument}
                    isTouched={touched.typeOfDocument}
                    value={values.typeOfDocument}
                  >
                    <option value="Cedula">Cédula</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </SelectField>

                  <Field
                    label="No. de documento"
                    name="documentCode"
                    placeholder="Número/Código del documento"
                    placement="horizontal"
                    errorMessage={errors.documentCode}
                    isTouched={touched.documentCode}
                    value={values.documentCode}
                  />
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <label className="maskLabel">Número de telefono</label>
                    <MaskedInput
                      mask={cardMask}
                      id="telephoneNumber"
                      name="telephoneNumber"
                      placeholder="Entra tu número telefónico"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="maskedInput"
                      style={{ backgroundColor: "#E5E4E4", borderRadius: "0.25em", marginBottom: "1em", resize: "none", lineHeight: "1.5em", textAlign: "left", padding: "0.5em", width: "300px", fontSize: "1.25rem" }}
                    />
                  </div>
                  {birthPlaceLoading ? <Spinner /> :
                    <SelectField
                      name="birthPlace"
                      label="Lugar de Nacimiento"
                      placeholder="Lugar de nacimiento"
                      placement="horizontal"
                      errorMessage={errors.birthPlace}
                      isTouched={touched.birthPlace}
                      value={values.birthPlace}
                    >
                      {birthPlacedata.getAllCountries.map((birthPlace: BasicEntity) => <option value={birthPlace.name} key={birthPlace.name}>{birthPlace.name}</option>)}
                    </SelectField>}

                  {nationalitiesLoading ? <Spinner /> :
                    <SelectField
                      name="nationality"
                      label="Nacionalidad"
                      placeholder="Nacionalidad"
                      placement="horizontal"
                      errorMessage={errors.nationality}
                      isTouched={touched.nationality}
                      value={values.nationality}
                    >
                      {nationalityData.getAllNationalities.map((nationality: BasicEntity) => <option value={nationality.name} key={nationality.name}>{nationality.name}</option>)}
                    </SelectField>}
                  <Field
                    type="date"
                    label="Fecha de nacimiento"
                    name="dateOfBirth"
                    placeholder="Fecha de nacimiento"
                    placement="horizontal"
                    errorMessage={errors.dateOfBirth}
                    isTouched={touched.dateOfBirth}
                    value={values.dateOfBirth}
                  />
                </FieldSection>
                <InformationSection>
                  {birthPlaceLoading ? <Spinner /> :
                    <IdentificationCard {...values} imageUrl={image} />}
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <NavigationLink
                  href="/register"
                  styled={true}
                >Atrás
                </NavigationLink>
                <Button submit={true} rank="secondary">
                  Continuar
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
        {showModal && <ModalPortal onClose={() => setShowModal(false)}>
          <Spinner />
          <h3>Loading...</h3>
        </ModalPortal>}
      </MainFormContainer>
      <style jsx>{`
          .maskLabel {
            font-weight: bolder;
            font-size: 1.25em;
            text-align: left;
            color: #333;
            margin: 0.5em 1em 0.5em 0;
          }
        `}</style>
    </Layout >
  );
}
