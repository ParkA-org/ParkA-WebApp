import React, { useContext } from "react"
import { CreatePasswordSchema } from "utils/schemas"
import { Formik, Form } from "formik"
import styled from "styled-components"
import Layout from "./layout"
import Button from "components/Button"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "../styles/formStyles"
import { CHANGE_PASSWORD } from "mutations"
import { useMutation } from "@apollo/client"
import NavigationLink from "components/NavigationLink"
import Field from "components/Field"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { UserContext } from "context/UserContext"

const Logo = styled(motion.li)`
  list-style: none;
  font-size: 2.5em;
  font-weight: 900;
  flex-grow: 2;
  font-family: "Righteous";
  display: block;
  align-items: left;
  color: #037185;
  text-align:left;
  margin-left:20px;

  &:hover {
    cursor: pointer;
  }
  
`;

export default function Login(): JSX.Element {
  const router = useRouter()
  const { token } = useContext(UserContext)

  const [ChangePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      router.push('/profile')
    }
  })

  return (
    <Layout pageTitle="Nueva Contraseña">
      <MainFormContainer>

        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={CreatePasswordSchema}
          onSubmit={(values) => {

            ChangePassword({
              variables: {
                input: {
                  oldPassword: values.oldPassword,
                  newPassword: values.password
                }
              }
            })

          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Logo>
                <img src="/images/logo1.svg" alt="ParkA logo" />
              </Logo>
              <FormContainer>
                <FieldSection>
                  <Field
                    type="password"
                    label="Vieja contraseña"
                    name="oldPassword"
                    errorMessage={errors.oldPassword}
                    isTouched={touched.oldPassword}
                  />
                  <Field
                    type="password"
                    label="Nueva contraseña"
                    name="password"
                    errorMessage={errors.password}
                    isTouched={touched.password}
                  />
                  <Field
                    type="password"
                    label="Confirmar nueva contraseña"
                    name="confirmPassword"
                    errorMessage={errors.confirmPassword}
                    isTouched={touched.confirmPassword}
                  />
                </FieldSection>
                <InformationSection>
                  <img
                    src="./../images/projectLogo.png"
                    style={{ width: "80%" }}
                  />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <NavigationLink href="/login" styled={true}>
                  Cancelar
                </NavigationLink>
                <Button submit={true} rank="secondary">
                  Confirmar
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout >
  );
}