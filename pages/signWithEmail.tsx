import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Field from "../components/Field";
import Layout from "./layout";
import {
  MainFormContainer,
  FormContainer,
  FieldSide,
  InformationSide,
} from "../styles/formStyles";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().required("Requerido"),
});

export default function SignWithEmail(): JSX.Element {
  return (
    <Layout>
      <MainFormContainer>
        <h1>Sign with email</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSide>
                  <Field
                    type="email"
                    name="email"
                    label="Email"
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
                  <h3>Olvidaste tu contraseña?</h3>
                </FieldSide>
                <InformationSide>
                  <img
                    src="./projectLogo.png"
                    style={{ width: "500px", height: "400px" }}
                  />
                </InformationSide>
              </FormContainer>
              <button>Cancel</button>
              <button>Iniciar Sesión</button>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
