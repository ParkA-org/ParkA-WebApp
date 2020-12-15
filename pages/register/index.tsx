import { Formik, Form } from "formik";
import useLocalStorage from "hooks/useLocalStorage"
import { useRouter } from 'next/router'
import { CreateAccountSchema } from "utils/schemas"
import Layout from "../layout"
import NavigationLink from "components/NavigationLink"
import Field, { FileUploader } from "components/Field"
import Button from "components/Button"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  FormHeading
} from "styles/formStyles"
import { useEffect, useState } from "react";
import UploadImageService from "services/uploadImage"

export default function registerPersonalAccount(): JSX.Element {
  const router = useRouter()
  const [localUser, setLocalUser] = useLocalStorage("user", {})
  const [image, setImage] = useLocalStorage("image", "")
  const [initialUserValues, setInitialUserValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  })
  let userValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  }

  useEffect(() => {
    for (const key in userValues) {
      if (localUser[key]) {
        userValues[key] = localUser[key]
      }
    }
    setInitialUserValues(userValues)
  }, [localUser])

  return (
    <Layout pageTitle="Registro Datos Personales">
      <MainFormContainer>
        <FormHeading>
          <img src="/images/logo1.svg" alt="ParkA logo" />
          <h2>Crea una cuenta para continuar</h2>
        </FormHeading>
        <Formik
          enableReinitialize={true}
          initialValues={initialUserValues}
          validationSchema={CreateAccountSchema}
          onSubmit={async (values) => {
            console.log('Llegamos aqui ', values)
            setLocalUser({ ...localUser, ...values })

            try {
              if (image === "") {
                let response = await UploadImageService(values.file)
                let url = await response.data[0].url
                setImage(url)
              }
              router.push('/register/PersonalIdentification')
            } catch (error) {
              console.error(error)
            }
          }}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <Field
                    name="name"
                    label="Nombre"
                    errorMessage={errors.name}
                    isTouched={touched.name}
                    placeholder="Nombre"
                    placement="horizontal"
                    containerStyles={{ width: "100%" }}
                    value={values.name}
                  />
                  <Field
                    name="lastName"
                    label="Apellido"
                    errorMessage={errors.lastName}
                    isTouched={touched.lastName}
                    placeholder="Apellido"
                    placement="horizontal"
                    value={values.lastName}
                  />
                  <Field
                    name="email"
                    label="Correo electrónico"
                    errorMessage={errors.email}
                    isTouched={touched.email}
                    placeholder="Correo electrónico"
                    placement="horizontal"
                    value={values.email}
                  />
                  <Field
                    type="password"
                    label="Contraseña"
                    name="password"
                    placeholder="Contraseña"
                    errorMessage={errors.password}
                    placement="horizontal"
                    isTouched={touched.password}
                    value={values.password}
                  />
                  <Field
                    type="password"
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    placeholder="Contraseña denuevo"
                    errorMessage={errors.confirmPassword}
                    isTouched={touched.confirmPassword}
                    placement="horizontal"
                    value={values.confirmPassword}
                  />
                </FieldSection>
                <InformationSection>
                  <FileUploader setFieldValue={setFieldValue} placeholderImage={image} />
                </InformationSection>
                <ActionSection>
                  <NavigationLink href="/login" styled={true}>Atrás</NavigationLink>
                  <Button submit={true} rank="secondary">
                    Continuar
                </Button>
                </ActionSection>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </MainFormContainer>

    </Layout >
  );
}
