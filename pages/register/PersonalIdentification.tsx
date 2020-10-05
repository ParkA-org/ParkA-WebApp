import { useState } from "react"
import { Formik, Form } from "formik"
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from "next/router"
import { GET_COUNTRIES } from "queries"
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
import { BasicEntity, CountriesData } from "utils/types"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "styles/formStyles"

export default function RegisterPersonalIdentificacion(): JSX.Element {
  const [accountId, setAccountId] = useLocalStorage("account-id", "")
  const [requestError, setRequestError] = useState(null)
  const [image,] = useLocalStorage("image", "../placeholders/image-placeholder.png")
  const [userId,] = useLocalStorage("user-id", "")
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { loading: countryLoading, error: countryError, data } = useQuery<CountriesData>(GET_COUNTRIES);
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

  if (countryError) return <pre>`Error ${JSON.stringify(countryError)}`</pre>
  return (
    <Layout pageTitle="Identificación Personal">
      <MainFormContainer>
        <h1>Identificación Personal</h1>
        <Formik
          initialValues={{
            typeOfDocument: "",
            documentCode: "",
            dateOfBirth: "",
            birthPlace: "",
            nationality: "",
          }}
          validationSchema={PersonalIdentificationSchema}
          onSubmit={(values) => {
            setShowModal(true)

            CreateAccount({
              variables: {
                userAccount: {
                  data: {
                    document: values.documentCode,
                    placeofbirth: values.birthPlace,
                    datebirth: values.dateOfBirth,
                    nationality: values.nationality,
                    document_type: values.typeOfDocument,
                    user: userId
                  }
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
                    errorMessage={errors.typeOfDocument}
                    isTouched={touched.typeOfDocument}
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
                  />
                  <Field
                    label="Lugar de Nacimiento"
                    name="birthPlace"
                    placeholder="Lugar de Nacimiento"
                    errorMessage={errors.birthPlace}
                    isTouched={touched.birthPlace}
                  />

                  {countryLoading ? <Spinner /> :
                    <SelectField
                      name="nationality"
                      label="Nacionalidad"
                      placeholder="Nacionalidad"
                      errorMessage={errors.nationality}
                      isTouched={touched.nationality}
                    >
                      {data.countries.map((country: BasicEntity) => <option value={country.name} key={country.name}>{country.name}</option>)}
                    </SelectField>}
                  <Field
                    type="date"
                    label="Fecha de nacimiento"
                    name="dateOfBirth"
                    placeholder="Fecha de nacimiento"
                    errorMessage={errors.dateOfBirth}
                    isTouched={touched.dateOfBirth}
                  />
                </FieldSection>
                <InformationSection>
                  {countryLoading ? <Spinner /> :
                    <IdentificationCard {...values} imageUrl={image} countries={data.results} />}
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
