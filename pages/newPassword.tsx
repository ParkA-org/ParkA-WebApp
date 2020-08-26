import React from "react";
import { CreatePasswordSchema } from "utils/schemas"
import { Formik, Form } from "formik";
import styled from "styled-components"
import Layout from "./layout";
import Button from "components/Button"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  CompactActionSection,
} from "../styles/formStyles";
import NavigationLink from "components/NavigationLink";
import Field, { FileUploader } from "components/Field";
import { motion } from "framer-motion";



const StyledField = styled(Field)`
  border: 1px solid #333;
  border-radius: 0.25em;
  margin-bottom: 1em;
  resize: none;
  line-height: 1.5em;
  width: 15vw;
  text-align: right;
  padding: 0.5em;
  @media (max-width: 768px) {
    width: auto;
  }
`;

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
  return (
    <Layout pageTitle="Nueva Contraseña">
      <MainFormContainer>

        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            file: "",
          }}
          validationSchema={CreatePasswordSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Logo>
                <NavigationLink href="/">
                  ParkA
                  </NavigationLink>
              </Logo>
              <FormContainer>
                <FieldSection>
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
                  <NavigationLink
                    href="/."
                  >
                    Confirmar
                  </NavigationLink>
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout >
  );
}