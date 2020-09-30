
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "components/Button";
import Field from "components/Field";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
} from "styles/formStyles";

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
      <p style={{ fontWeight: "bold", fontSize: "1.6rem" }}>
        Para comunicarte con nosotros, puedes usar el siguiente formulario.
      </p>
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
              <FieldSection style={{ paddingLeft: "1em" }}>
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
              </FieldSection>
              <InformationSection className="information">
                <h3 style={{ fontSize: "1.5rem" }}>
                  Respondemos en un tiempo estimado de alrededor 48 horas
                  laborables, con lo cual espera saber pronto de nosotros.
                </h3>
                <Button submit={true} styles={{ fontSize: "1.6rem" }}>Enviar</Button>
              </InformationSection>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </MainFormContainer>
  );
}
