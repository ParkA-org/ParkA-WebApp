import { Formik, Form } from "formik";
import { useMutation } from '@apollo/client';
import { PaymentInformationSchema } from "utils/schemas"
import { CREATE_PAYMENTINFO } from "mutations"
import { useRouter } from "next/router";
import Layout from "pages/layout";
import NavigationLink from "components/NavigationLink";
import Field from "components/Field";
import Button from "components/Button";
import CreditCard from "components/CreditCard";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  CompactActionSection,
} from "styles/formStyles";
import { useLocalStorage } from "hooks/useLocalStorage";

export default function RegisterPaymentInformation(): JSX.Element {
  const router = useRouter()
  const [CreatePaymentInfo, { loading, error }] = useMutation(CREATE_PAYMENTINFO)
  const [accountId,] = useLocalStorage("account-id", "")
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
          onSubmit={(values) => {
            CreatePaymentInfo({
              variables: {
                userPaymentInfo: {
                  data: {
                    digit: values.cardNumber,
                    name: values.cardHolder,
                    expirationDate: values.expirationDate,
                    type_card: "",
                    account_data: accountId
                  }
                }
              }
            })
            if (!loading && !error) {
              router.push("/")
            }
          }}
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
                <CompactActionSection>
                  <NavigationLink
                    href="/register/PersonalIdentification"
                    styled={true}
                  >
                    Atrás
                    </NavigationLink>
                  <NavigationLink href="/" styled={true} >
                    Omitir
                    </NavigationLink>
                </CompactActionSection>
                <Button submit={true} rank="secondary">
                  <NavigationLink href="/" >
                    Continuar
                    </NavigationLink>
                </Button>
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
    </Layout>
  );
}