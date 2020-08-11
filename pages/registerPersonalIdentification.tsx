import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Layout from "./layout";
import NavigationLink from "../components/NavigationLink";
import Field, { SelectField } from "../components/Field";
import Button from "../components/Button";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "../styles/formStyles";

const PersonalIdentificationSchema = Yup.object().shape({
  typeOfDocument: Yup.mixed().oneOf(["Passport", "Identification Card"]),
  documentCode: Yup.string().required("Requerido"),
  // dateOfBirth: Yup.string().required("Requerido"),
  birthPlace: Yup.string().required("Requerido"),
  nationality: Yup.string().required("Requerido"),
});

export default function RegisterPersonalIdentificacion(): JSX.Element {
  return (
    <Layout pageTitle="Identificación Personal">
      <MainFormContainer>
        <h1>Identificación Personal</h1>
        <Formik
          initialValues={{
            typeOfDocument: "",
            documentCode: "",
            // dateOfBirth: "",
            birthPlace: "",
            nationality: "",
          }}
          validationSchema={PersonalIdentificationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <SelectField
                    name="typeOfDocument"
                    label="Tipo de documento"
                    placeholder="Tipo de documento"
                  >
                    <option value="Passport">Pasaporte</option>
                    <option value="Identification Card">Cédula</option>
                  </SelectField>
                  {errors.typeOfDocument && <div>{errors.typeOfDocument}</div>}
                  <Field
                    label="No. de documento"
                    name="documentCode"
                    placeholder="Número/Código del documento"
                    errorMessage={errors.documentCode}
                    isTouched={touched.documentCode}
                  />
                  <Field
                    label="Lugar de Nacimiento"
                    name="birthPlace"
                    placeholder="Lugar de Nacimiento"
                    errorMessage={errors.birthPlace}
                    isTouched={touched.birthPlace}
                  />
                  <Field
                    label="Nacionalidad"
                    name="nationality"
                    placeholder="Nacionalidad"
                    errorMessage={errors.nationality}
                    isTouched={touched.nationality}
                  />
                  {/* <DatePickerField name="dateOfBirth" /> */}
                </FieldSection>
                <InformationSection>
                  <img
                    src="./projectLogo.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <Button>
                  <NavigationLink href="/" text="Cancelar" />
                </Button>
                <Button type="submit">Iniciar Sesión</Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
