import { Formik, Form } from "formik";
import { SignInSchema } from "utils/schemas"
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "mutations"
import useLocalStorage from "hooks/useLocalStorage";
import { useRouter } from "next/router"
import Layout from "../layout";
import NavigationLink from "components/NavigationLink";
import Field from "components/Field";
import Button from "components/Button";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "styles/formStyles";

export default function SignWithEmail(): JSX.Element {
  const [, setJWT] = useLocalStorage("token", "")
  const router = useRouter()
  const [LoginUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      const { jwt: token, user } = login
      setJWT(token)
      router.push("/")
    }
  })

  return (
    <Layout pageTitle="Sign in with email">
      <MainFormContainer>
        <h1>Sign with email</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {

            LoginUser({
              variables: {
                loggedUser: {
                  identifier: values.email,
                  password: values.password
                }
              }
            })

            if (error)
              alert(error)
          }}
        >
          {({ errors, touched }) => (
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
                    label="Contraseña"
                    name="password"
                    placeholder="Contraseña"
                    errorMessage={errors.password}
                    isTouched={touched.password}
                  />
                  <NavigationLink
                    href="/forgotPassword"
                  >Olvidaste tu contraseña?
                    </NavigationLink>
                </FieldSection>
                <InformationSection>
                  <img
                    src="../images/projectLogo.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <Button>
                  <NavigationLink href="/login">
                    Atrás
                  </NavigationLink>
                </Button>
                <Button submit={true}>
                  Iniciar Sesión
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
