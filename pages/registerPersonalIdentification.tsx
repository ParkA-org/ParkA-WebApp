import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Layout from "./layout";
import NavigationLink from "../components/NavigationLink";
import Field, { SelectField } from "../components/Field";
import Button from "../components/Button";
import IdentificationCard from "../components/IdentificationCard";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "../styles/formStyles";

const PersonalIdentificationSchema = Yup.object().shape({
  typeOfDocument: Yup.string().required("Requerido"),
  documentCode: Yup.string()
    .required("Requerido")
    .max(40, "Máximo de 40 caracteres"),
  dateOfBirth: Yup.string().required("Requerido"),
  birthPlace: Yup.string()
    .required("Requerido")
    .max(50, "Máximo de 50 caracteres"),
  nationality: Yup.string()
    .required("Requerido")
    .max(40, "Máximo de 40 caracteres"),
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
            dateOfBirth: "",
            birthPlace: "",
            nationality: "",
          }}
          validationSchema={PersonalIdentificationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <SelectField
                    name="typeOfDocument"
                    label="Tipo de documento"
                    placeholder="Tipo de documento"
                    errorMessage={errors.typeOfDocument}
                    isTouched={touched.typeOfDocument}
                  >
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Cédula">Cédula</option>
                  </SelectField>

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
                  <Field
                    type="date"
                    label="Fecha de nacimiento"
                    name="dateOfBirth"
                    placeholder="Fecha de nacimiento"
                    errorMessage={errors.dateOfBirth}
                    isTouched={touched.dateOfBirth}
                  />
                </FieldSection>
                <InformationSection>
                  <IdentificationCard {...values} />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <Button>
                  <NavigationLink
                    href="/registerPersonalAccount"
                    text="Atrás"
                  />
                </Button>
                <Button submit={true}>
                  <NavigationLink
                    href="/registerPaymentInformation"
                    text="Continuar"
                  />
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
