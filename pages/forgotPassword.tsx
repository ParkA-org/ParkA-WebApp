import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Layout from "./layout";
import NavigationLink from "components/NavigationLink";
import Field from "components/Field";
import Button from "components/Button";
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
                    {sendCode && <Timer initialMinute={5} initialSeconds={0} />}
                  </AdditionalInfo>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      if (values.email) {
                        setSendCode(true);
                      }
                    }}
                    rank="secondary"
                  >
                    Enviar código
                  </Button>
                </FieldSection>
                <InformationSection>
                  <img
                    src="./../images/projectLogo.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <NavigationLink
                  href="/signWithEmail"
                  styled={true}
                >
                  Atrás
                  </NavigationLink>
                <Button submit={true} rank="secondary">
                  <NavigationLink href="#">Iniciar Sesión</NavigationLink>
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
