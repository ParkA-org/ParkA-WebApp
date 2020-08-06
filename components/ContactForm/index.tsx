import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "../Button";
import {
  StyledField,
  StyledLabel,
  ContactContainer,
  FormContainer,
  FieldSide,
  InformationSide,
} from "./styles";

const ContactSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Requerido"),
  topic: Yup.string()
    .required("Requerido")
    .max(70, "Mantenga el asunto menor a 70 caracteres"),
  message: Yup.string().required("Requerido"),
});

export default function ContactForm(): JSX.Element {
  return (
    <ContactContainer>
      <h2>
        Para comunicarte con nosotros, puedes usar el siguiente formulario.
      </h2>
      <Formik
        initialValues={{
          email: "",
          topic: "",
          message: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <FormContainer>
              <FieldSide>
                <StyledLabel htmlFor="email">Email</StyledLabel>
                <StyledField name="email" type="email" />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <StyledLabel htmlFor="topic">Asunto</StyledLabel>
                <StyledField name="topic" />
                {errors.topic && touched.topic ? (
                  <div>{errors.topic}</div>
                ) : null}
                <StyledLabel htmlFor="message">Mensaje</StyledLabel>
                <StyledField name="message" component="textarea" />
                {errors.message && touched.message ? (
                  <div>{errors.message}</div>
                ) : null}
              </FieldSide>
              <InformationSide>
                <h3>
                  Respondemos en un tiempo estimado de alrededor 48 horas
                  laborables, con lo cual espera saber pronto de nosotros.
                </h3>
                <Button type="submit">Enviar</Button>
              </InformationSide>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </ContactContainer>
  );
}
