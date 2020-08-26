import { useState } from "react"
import axios from "axios"
import { Formik, Form } from "formik";
import { useMutation } from '@apollo/client'
import { useLocalStorage } from "hooks/useLocalStorage"
import { useRouter } from 'next/router'
import { CREATE_USER } from "mutations"
import { CreateAccountSchema } from "utils/schemas"
import Layout from "../layout";
import NavigationLink from "components/NavigationLink";
import Field, { FileUploader } from "components/Field";
import Button from "components/Button";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "styles/formStyles";

function UpdateImage(file: any, success, state) {
  const apiBaseURL = "https://parka-api.herokuapp.com/upload";
  const formData = new FormData()
  formData.append("files", file)
  axios({
    method: "POST",
    url: apiBaseURL,
    data: formData
  }).then(res => {
    success(res.data['0'].url)
    state(prevState => {
      return { ...prevState, loading: false }
    })
  })
    .catch(err => state(prevState => {
      return { ...prevState, error: err }
    }))
}

export default function registerPersonalAccount(): JSX.Element {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted({ createUser }) {
      const { user } = createUser
      setUserId(user.id)
    }
  })
  const router = useRouter()
  const [imageStatus, setImageStatus] = useState({
    loading: false,
    error: undefined
  })
  const [image, setImage] = useLocalStorage("image", "")
  const [userId, setUserId] = useLocalStorage("user-id", "")
  return (
    <Layout pageTitle="Registro Datos Personales">
      <MainFormContainer>
        <h1>Crea una cuenta para continuar</h1>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            file: "",
          }}
          validationSchema={CreateAccountSchema}
          onSubmit={(values) => {

            setImageStatus(prevState => {
              return { ...prevState, loading: true }
            })

            UpdateImage(values.file, setImage, setImageStatus)

            createUser({
              variables: {
                user: {
                  data: {
                    username: values.name,
                    email: values.email,
                    lastname: values.lastName,
                    password: values.password
                  }
                }
              }
            })
            if (!error && !imageStatus.error) {
              if (!imageStatus.loading && !loading) {
                router.push('/register/PersonalIdentification')
              }
            }
            else
              alert(error)
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <Field
                    name="name"
                    label="Nombre"
                    errorMessage={errors.name}
                    isTouched={touched.name}
                    placeholder="Nombre"
                  />
                  <Field
                    name="lastName"
                    label="Apellido"
                    errorMessage={errors.lastName}
                    isTouched={touched.lastName}
                    placeholder="Apellido"
                  />
                  <Field
                    name="email"
                    label="Correo electrónico"
                    errorMessage={errors.email}
                    isTouched={touched.email}
                    placeholder="Correo electrónico"
                  />
                  <Field
                    type="password"
                    label="Contraseña"
                    name="password"
                    placeholder="Contraseña"
                    errorMessage={errors.password}
                    isTouched={touched.password}
                  />
                  <Field
                    type="password"
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    placeholder="Contraseña denuevo"
                    errorMessage={errors.confirmPassword}
                    isTouched={touched.confirmPassword}
                  />
                </FieldSection>
                <InformationSection>
                  <FileUploader setFieldValue={setFieldValue} />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <NavigationLink href="/login" styled={true}>Atrás</NavigationLink>
                <Button submit={true} rank="secondary">
                  Continuar
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
      {imageStatus.loading && <p>Loading...</p>}
      {imageStatus.error && <p>Error...</p>}
    </Layout >
  );
}