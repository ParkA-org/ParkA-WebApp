import { useState, useEffect } from "react"
import { Formik, Form } from "formik";
import { useQuery, useMutation } from '@apollo/client';
import { GET_COUNTRIES } from "queries"
import { CREATE_ACCOUNT } from "mutations"
import { PersonalIdentificationSchema } from "utils/schemas"
import { useRouter } from "next/router";
import useLocalStorage from "hooks/useLocalStorage"
import Layout from "../layout";
import NavigationLink from "components/NavigationLink";
import Field, { SelectField } from "components/Field";
import ModalPortal from "components/Modal"
import Button from "components/Button";
import Spinner from "components/Spinner"
import IdentificationCard from "components/IdentificationCard";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "styles/formStyles";

type Country = {
  __typename: string;
  name: string;
  id: string;
}

interface CountriesData {
  countries: Country[]
}

export default function RegisterPersonalIdentificacion(): JSX.Element {
  const [accountId, setAccountId] = useLocalStorage("account-id", "")
  const [image,] = useLocalStorage("image", "../placeholders/image-placeholder.png")
  const [userId,] = useLocalStorage("user-id", "")
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { loading: countryLoading, error: countryError, data } = useQuery<CountriesData>(GET_COUNTRIES);
  const [CreateAccount, { error }] = useMutation(CREATE_ACCOUNT, {
    onCompleted({ createAccountDatum }) {
      const { accountDatum } = createAccountDatum
      setAccountId(accountDatum.id)
      setShowModal(false)
      router.push('/register/PaymentInformation')
    }
  })

  useEffect(() => {
    console.log(`User id ${userId}`)
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

            if (error)
              alert(error)

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
                    <option value="5f356c47f1a9ffdb504f404e">Cédula</option>
                    <option value="5f356c60f1a9ffdb504f404f">Pasaporte</option>
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
                      {data.countries.map((country: Country) => <option value={country.id} key={country.name}>{country.name}</option>)}
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
                    <IdentificationCard {...values} imageUrl={image} countries={data.countries} />}
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
