import React from "react";
import * as Yup from "yup";
import axios from "axios"
import { Formik, Form } from "formik";
import { gql, useMutation } from '@apollo/client'
import Layout from "./layout";
import NavigationLink from "../components/NavigationLink";
import Field, { FileUploader } from "../components/Field";
import Button from "../components/Button";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "../styles/formStyles";

const CREATE_USER = gql`
mutation CreateUser($user: createUserInput!) {
  createUser(input: $user) {
     user {
        username
        email
        lastname
        profilepicture
    }
  }
}
`

const CreateAccountSchema = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().required("Requerido"),
  confirmPassword: Yup.string().required("Requerido"),
  file: Yup.mixed().test("fileSize", "Su imagen es demasiado grande 5MB o menos", value => value && value.size <= 500000),
});

export default function registerPersonalAccount(): JSX.Element {
  const [createUser, { data, error }] = useMutation(CREATE_USER)
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
            const apiBaseURL = "https://parka-api.herokuapp.com/upload";
            const formData = new FormData()
            formData.append("files", values.file)
            console.log(values.file)
            axios({
              method: "POST",
              url: apiBaseURL,
              data: formData
            }).then(res => { console.log(res.data['0'].url) })
              .catch(err => console.log(`Error while uploading file ${err}`))

            // createUser({
            //   variables: {
            //     user: {
            //       data: {
            //         username: values.name,
            //         email: values.email,
            //         lastname: values.lastName,
            //         password: values.password,
            //         profilepicture: "https://spoiler.bolavip.com/__export/1594763139104/sites/bolavip/img/2020/07/14/will_smith_crop1594763138495.jpg_423682103.jpg"
            //       }
            //     }
            //   }
            // })
            // console.log(data)
            // console.log(`Error: ${error}`)
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
                <NavigationLink href="/login" text="Atrás" styled={true} />
                <Button submit={true} rank="secondary">
                  {/* <NavigationLink
                    href="/registerPersonalIdentification"
                    text="Continuar"
                  /> */}
                  Continuar
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
