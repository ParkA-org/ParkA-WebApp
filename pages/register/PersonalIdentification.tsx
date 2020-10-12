import { useState, useEffect } from "react"
import { Formik, Form } from "formik"
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from "next/router"
import { GET_BIRTH_PLACES, GET_NATIONALITIES } from "queries"
import { CREATE_ACCOUNT } from "mutations"
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
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  FormHeading
} from "styles/formStyles"


export default function RegisterPersonalIdentificacion(): JSX.Element {
  const [accountId, setAccountId] = useLocalStorage("account-id", "")
  const [requestError, setRequestError] = useState(null)
  const [image,] = useLocalStorage("image", "../placeholders/image-placeholder.png")
  const [userId,] = useLocalStorage("user-id", "")
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

  useEffect(() => {
    console.log('Se ejecuto')
    for (const key in userValues) {
      if (localUser[key]) {
        userValues[key] = localUser[key]
      }
    }
    setInitialUserValues(userValues)
  }, [localUser])

  const [CreateAccount] = useMutation(CREATE_ACCOUNT, {
    onCompleted({ createAccountDatum }) {
      const { accountDatum } = createAccountDatum
      setAccountId(accountDatum.id)
      setShowModal(false)
      router.push('/register/PaymentInformation')
    },
    onError(error) {
      console.log('Using mutation on error')
      setRequestError(error)
      setShowModal(false)
    }
  })

  if (birthPlaceError) return <pre>`Error ${JSON.stringify(birthPlaceError)}`</pre>

  return (
    <Layout pageTitle="Identificación Personal">
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
            router.push('/register/PaymentInformation')
            // setShowModal(true)

            // CreateAccount({
            //   variables: {
            //     userAccount: {
            //       data: {
            //         document: values.documentCode,
            //         placeofbirth: values.birthPlace,
            //         datebirth: values.dateOfBirth.toISOString(),
            //         nationality: values.nationality,
            //         document_type: values.typeOfDocument,
            //         user: userId
            //       }
            //     }
            //   }
            // })
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
                    errorMessage={errors.documentCode}
                    isTouched={touched.documentCode}
                    value={values.documentCode}
                  />
                  {birthPlaceLoading ? <Spinner /> :
                    <SelectField
                      name="birthPlace"
                      label="Lugar de Nacimiento"
                      placeholder="Lugar de nacimiento"
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
                {requestError && <p style={{ color: "red" }}>Ocurrio un error</p>}
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
