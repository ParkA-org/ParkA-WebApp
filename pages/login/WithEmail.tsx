import { useContext, useState } from "react"
import { Formik, Form } from "formik"
import { SignInSchema } from "utils/schemas"
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "mutations"
import { useRouter } from "next/router"
import Layout from "../layout"
import NavigationLink from "components/NavigationLink"
import Field from "components/Field"
import Button from "components/Button"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "styles/formStyles"
import { UserContext } from "context/UserContext"
import ModalPortal from "components/Modal"
import Spinner from "components/Spinner"
import useLocalStorage from "hooks/useLocalStorage"

export default function SignWithEmail(): JSX.Element {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [requestError, setRequestError] = useState(null)
  const [_, setUserId] = useLocalStorage("user-id", "")
  const { setUser, setToken } = useContext(UserContext)
  const [LoginUser] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      const { JWT: token, user } = login
      const { id } = user
      setUserId(id)
      setToken(token)
      setUser(user)
      setShowModal(false)
      setRequestError(null)
      router.push("/")
    },
    onError(error) {
      setRequestError(error)
      setShowModal(false)
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
            setShowModal(true)
            LoginUser({
              variables: {
                logInfo: {
                  email: values.email,
                  password: values.password
                }
              }
            })
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <h3>Bienvenido!</h3>
                  <p>Ingresa tus credenciales para iniciar sesión!</p>
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
                  >
                    <span>Olvidaste tu contraseña?
                  </span>
                  </NavigationLink>

                  {requestError && <span style={{ width: "100%", color: "red", margin: "0 auto" }}>{requestError.message}</span>}
                </FieldSection>
                <InformationSection>
                  <img
                    src="../images/projectLogo.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <Button rank="secondary">
                  <NavigationLink href="/login" styled>
                    Atrás
                  </NavigationLink>
                </Button>
                <Button rank="secondary" submit={true}>
                  Iniciar Sesión
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
      <style jsx>
        {`
          span {
            align-self: flex-end;
            color: #59BCA7;
          }
        `}
      </style>

      {showModal && <ModalPortal onClose={() => setShowModal(false)}>
        <Spinner />
        <h3>Loading...</h3>
      </ModalPortal>}
    </Layout>
  );
}
