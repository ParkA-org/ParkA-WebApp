<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React from "react";
>>>>>>> 2645d64... made progress
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Layout from "./layout";
import NavigationLink from "../components/NavigationLink";
import Field from "../components/Field";
import Button from "../components/Button";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  AdditionalInfo,
} from "../styles/formStyles";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Requerido"),
  code: Yup.string().required("Requerido"),
});

<<<<<<< HEAD
const Timer = (props: any) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <p>
          {" "}
          El código debería llegar en no más de {minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      )}
    </div>
  );
};

export default function ForgotPassword(): JSX.Element {
  const [sendCode, setSendCode] = useState(false);
=======
const sendCode = (email) => {
  console.log(`Enviando denuevo a ${email}`);
};

export default function ForgotPassword(): JSX.Element {
>>>>>>> 2645d64... made progress
  return (
    <Layout pageTitle="Forgot password">
      <MainFormContainer>
        <h1>Parka - Forgot Password</h1>
        <Formik
          initialValues={{
            email: "",
            code: "",
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <Field
                    type="email"
                    name="email"
                    label="Email"
                    errorMessage={errors.email}
                    isTouched={touched.email}
                    placeholder="Correo electrónico"
                  />
                  <AdditionalInfo>
                    Te enviaremos un correo con un código a ingresar.
                  </AdditionalInfo>
                  <Field
                    type="code"
                    label="Código a ingresar"
                    name="code"
                    placeholder="Código"
                    errorMessage={errors.code}
                    isTouched={touched.code}
                  />

                  <AdditionalInfo>
<<<<<<< HEAD
                    {sendCode && <Timer initialMinute={5} initialSeconds={0} />}
=======
                    El código debería llegar en no más de 5:00...
>>>>>>> 2645d64... made progress
                  </AdditionalInfo>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
<<<<<<< HEAD
                      if (values.email) {
                        setSendCode(true);
                      }
                    }}
                    rank="secondary"
                  >
                    Enviar código
=======
                      sendCode(values.email);
                    }}
                  >
                    Reenviar código
>>>>>>> 2645d64... made progress
                  </Button>
                </FieldSection>
                <InformationSection>
                  <img
<<<<<<< HEAD
                    src="./images/porjectLogo.png"
=======
                    src="./projectLogo.png"
>>>>>>> 2645d64... made progress
                    style={{ width: "100%", height: "100%" }}
                  />
                </InformationSection>
              </FormContainer>
              <ActionSection>
<<<<<<< HEAD
                <NavigationLink
                  href="/signWithEmail"
                  text="Atrás"
                  styled={true}
                />
                <Button submit={true} rank="secondary">
=======
                <Button onClick={(event) => event.preventDefault()}>
                  <NavigationLink href="/" text="Cancelar" />
                </Button>
                <Button type="submit">
>>>>>>> 2645d64... made progress
                  <NavigationLink href="#" text="Iniciar Sesión" />
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
