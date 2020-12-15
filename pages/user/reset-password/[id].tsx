import { useState, useEffect } from "react"
import { ForgotPasswordSchema } from "utils/schemas"
import { VALIDATE_PASSWORD_RESET } from "mutations"
import { useMutation } from "@apollo/client"
import { Formik, Form } from "formik"
import Layout from "../../layout"
import NavigationLink from "components/NavigationLink"
import Field from "components/Field"
import Button from "components/Button"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  AdditionalInfo,
} from "../../../styles/formStyles"
import { useRouter } from "next/router"

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
  const router = useRouter()
  const [ValidateReset] = useMutation(VALIDATE_PASSWORD_RESET, {
    onCompleted() {
      router.push('/login/WithEmail')
    }
  })


  return (
    <Layout pageTitle="Reiniciar contraseña">
      <MainFormContainer>
        <h1>Parka - Contraseña olvidada</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values) => {

            ValidateReset({
              variables: {
                validateInput: {
                  origin: "web",
                  code: router.query.id,
                  email: values.email,
                  newPassword: values.password
                }
              }
            })
          }}
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
                  <Field
                    type="password"
                    label="Nueva contraseña"
                    name="password"
                    placeholder="Nueva contraseña"
                    errorMessage={errors.password}
                    isTouched={touched.password}
                  />
                  <AdditionalInfo>
                    {sendCode && <Timer initialMinute={5} initialSeconds={0} />}
                  </AdditionalInfo>
                  <Button
                    // onClick={(event) => {
                    //   event.preventDefault();
                    //   if (values.email) {
                    //     setSendCode(true);
                    //   }
                    // }}
                    rank="secondary"
                  >
                    Cambiar contraseña
                  </Button>
                </FieldSection>
                <InformationSection>
                  <img
                    src="/images/projectLogo.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </InformationSection>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}