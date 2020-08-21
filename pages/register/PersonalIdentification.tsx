import { useEffect } from "react"
import { Formik, Form } from "formik";
import { useQuery, useMutation } from '@apollo/client';
import { GET_COUNTRIES } from "queries"
import { CREATE_ACCOUNT } from "mutations"
import { PersonalIdentificationSchema } from "utils/schemas"
import { useRouter } from "next/router";
import { useLocalStorage } from "hooks/useLocalStorage"
import Layout from "../layout";
import NavigationLink from "components/NavigationLink";
import Field, { SelectField } from "components/Field";
import Button from "components/Button";
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
  const { loading: countryLoading, error: countryError, data } = useQuery<CountriesData>(GET_COUNTRIES);
  const [CreateAccount, { loading, error }] = useMutation(CREATE_ACCOUNT, {
    onCompleted({ CreateAccount }) {
      const { accountDatum } = CreateAccount
      setAccountId(accountDatum.id)
    }
  })
  const router = useRouter()
  const [accountId, setAccountId] = useLocalStorage("account-id", "")
  const [image,] = useLocalStorage("image", "./placeholders/image-placeholder.png")
  const [userId,] = useLocalStorage("user-id", "")

  useEffect(() => {
    console.log(`Image ${image}`)
    console.log(`User ID ${userId}`)
  }, [])

  if (countryLoading) return <h1>Loading....</h1>
  if (countryError) return <pre>`Error ${JSON.stringify(countryError)}`</pre>
  console.log(data)
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

            if (!error && !loading) {
              router.push('/PaymentInformation')
            }

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
                    <option value="5f356c60f1a9ffdb504f404f">Pasaporte</option>
                    <option value="5f356c47f1a9ffdb504f404e">Cédula</option>
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

                  <SelectField
                    name="nationality"
                    label="Nacionalidad"
                    placeholder="Nacionalidad"
                    errorMessage={errors.nationality}
                    isTouched={touched.nationality}
                  >
                    {data.countries.map((country: Country) => <option value={country.id} key={country.name}>{country.name}</option>)}
                  </SelectField>
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
                  <IdentificationCard {...values} imageUrl={image} />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <NavigationLink
                  href="/register"
                  styled={true}
                >Atrás
                </NavigationLink>
                <Button submit={true} rank="secondary">
                  <NavigationLink
                    href="/register/PaymentInformation"
                  >
                    Continuar
                    </NavigationLink>
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout >
  );
}
