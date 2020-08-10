import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "../Button";
import Field from "../Field";
import {
  MainFormContainer,
  FormContainer,
  FieldSide,
  InformationSide,
} from "../../styles/formStyles";

const ContactSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Requerido"),
  topic: Yup.string()
    .required("Requerido")
    .max(70, "Mantenga el asunto menor a 70 caracteres"),
  message: Yup.string().required("Requerido"),
});

export default function ContactForm(): JSX.Element {
  return (
    <MainFormContainer>
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
                <Field
                  type="email"
                  name="email"
                  label="Email"
                  errorMessage={errors.email}
                  isTouched={touched.email}
                />
                <Field
                  label="Asunto"
                  name="topic"
                  errorMessage={errors.topic}
                  isTouched={touched.topic}
                />
                <Field
                  component="textarea"
                  label="Mensaje"
                  name="message"
                  errorMessage={errors.message}
                  isTouched={touched.message}
                />
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
    </MainFormContainer>
  );
}
