import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Layout from "./layout";
import NavigationLink from "../components/NavigationLink";
import Field from "../components/Field";
import Button from "../components/Button";
import CreditCard from "../components/CreditCard";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "../styles/formStyles";

const PaymentInformationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .length(16, "Los números de tarjeta solo son 16")
    .required("Requerido"),
  cardHolder: Yup.string().required("Requerido"),
  expirationDate: Yup.date().required("Requerido"),
  cvv: Yup.string()
    .length(3, "El CVV debe contener solo 3 dígitos")
    .required("Requerido"),
});

export default function RegisterPaymentInformation(): JSX.Element {
  return (
    <Layout pageTitle="Información Crediticia">
      <MainFormContainer>
        <h1>Información Crediticia</h1>
        <Formik
          initialValues={{
            cardNumber: "",
            cardHolder: "",
            expirationDate: "",
            cvv: "",
          }}
          validationSchema={PaymentInformationSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <Field
                    label="No. de tarjeta"
                    name="cardNumber"
                    placeholder="Números de tarjeta"
                    errorMessage={errors.cardNumber}
                    isTouched={touched.cardNumber}
                  />
                  <Field
                    label="Titular de tarjeta"
                    name="cardHolder"
                    placeholder="Titular de tarjeta"
                    errorMessage={errors.cardHolder}
                    isTouched={touched.cardHolder}
                  />
                  <Field
                    label="CVV"
                    name="cvv"
                    placeholder="CVV"
                    errorMessage={errors.cvv}
                    isTouched={touched.cvv}
                  />
                  <Field
                    type="date"
                    label="Válida hasta:"
                    name="expirationDate"
                    placeholder="Válida hasta"
                    errorMessage={errors.expirationDate}
                    isTouched={touched.expirationDate}
                  />
                </FieldSection>
                <InformationSection>
                  <CreditCard {...values} />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <NavigationLink
                  href="/registerPersonalIdentification"
                  text="Atrás"
                />
                <NavigationLink href="/" text="Omitir" />
                <Button submit={true} rank="secondary">
                  <NavigationLink href="/" text="Continuar" />
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}
