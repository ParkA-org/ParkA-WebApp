import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { SignInSchema } from "utils/schemas";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, CONFIRM_EMAIL, RESET_PASSWORD } from "mutations";
import { useRouter } from "next/router";
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
import { UserContext } from "context/UserContext";
import ModalPortal from "components/Modal";
import Spinner from "components/Spinner";
import useLocalStorage from "hooks/useLocalStorage";

export default function SignWithEmail(): JSX.Element {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [_, setUserId] = useLocalStorage("user-id", "");
  const { setUser, setToken, url } = useContext(UserContext);
  const [ConfirmEmail] = useMutation(CONFIRM_EMAIL);
  const [ResetPassword] = useMutation(RESET_PASSWORD);
  const [LoginUser] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      const { JWT: token, user } = login;
      const { id } = user;
      setUserId(id);
      setToken(token);
      setUser(user);
      setShowModal(false);
      setRequestError(null);
      router.push(url);
    },
    onError(error) {
      setRequestError(error);
      setShowModal(false);
    },
  });

  return (
    <Layout pageTitle="Iniciar sesión con correo electrónico">
      <MainFormContainer>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            setShowModal(true);
            LoginUser({
              variables: {
                logInfo: {
                  email: values.email,
                  password: values.password,
                },
              },
            });
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <h3>Bienvenido!</h3>
                  <p style={{ fontSize: "1.2rem" }}>
                    Ingresa tus credenciales para iniciar sesión!
                  </p>
                  <Field
                    type="email"
                    name="email"
                    label="Email"
                    errorMessage={errors.email}
                    isTouched={touched.email}
                    containerStyles={{ paddingLeft: "3em" }}
                    placeholder="Correo electrónico"
                  />
                  <Field
                    type="password"
                    label="Contraseña"
                    name="password"
                    placeholder="Contraseña"
                    containerStyles={{ paddingLeft: "3em" }}
                    errorMessage={errors.password}
                    isTouched={touched.password}
                  />
                  <Button
                    rank="secondary"
                    submit={false}
                    onClick={(e) => {
                      e.preventDefault();
                      ResetPassword({
                        variables: {
                          resetInput: {
                            origin: "web",
                            email: values.email,
                          },
                        },
                      });
                      setShowEmailModal(true);
                    }}
                  >
                    Olvidaste tu contraseña?
                  </Button>
                  {requestError && (
                    <span
                      style={{ width: "100%", color: "red", margin: "0 auto" }}
                    >
                      {requestError.message}
                    </span>
                  )}
                </FieldSection>
                <InformationSection>
                  <img
                    src="/images/projectLogo.png"
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
                <Button
                  rank="secondary"
                  submit={false}
                  onClick={(e) => {
                    e.preventDefault();
                    ConfirmEmail({
                      variables: {
                        ceInput: {
                          origin: "web",
                          email: values.email,
                        },
                      },
                    });
                  }}
                >
                  Confirmar correo
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
            color: #59bca7;
          }
        `}
      </style>

      {showModal && (
        <ModalPortal onClose={() => setShowModal(false)}>
          <Spinner />
          <h3>Cargando...</h3>
        </ModalPortal>
      )}

      {showEmailModal && (
        <ModalPortal onClose={() => setShowEmailModal(false)}>
          <>
            <img
              src="/images/projectLogo.png"
              style={{ width: "25vw", height: "35vh", margin: "1em 0" }}
            />
            <h4 style={{ margin: "1em auto", width: "80%" }}>
              Se ha enviado un correo electrónico la correo proporcionado con
              los siguientes pasos a seguir.
            </h4>
          </>
        </ModalPortal>
      )}
    </Layout>
  );
}
