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
import UploadImageService from "services/uploadImage";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  FormHeading
} from "styles/formStyles"


export default function RegisterPersonalIdentificacion(): JSX.Element {
  const [image,] = useLocalStorage("image", "../placeholders/image.png")
  const [userId, setUserId] = useLocalStorage("user-id", "")
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
  }
  const [initialUserValues, setInitialUserValues] = useState({
    typeOfDocument: "",
    documentCode: "",
    dateOfBirth: "",
    birthPlace: "",
    nationality: "",
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
                  telephoneNumber: "8091234568123",
                  nationality: nationalityData.getAllNationalities.filter(nation => nation.name == values.nationality)[0].id,
                  placeOfBirth: birthPlacedata.getAllCountries.filter(country => country.name == values.birthPlace)[0].id,
                }
              }
            })
          }}
        >
          {({ values, errors, touched }) => (
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

    </Layout >
  );
}
