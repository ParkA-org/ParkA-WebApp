import { useState } from "react"
import { Formik, Form } from "formik"
import { useMutation } from '@apollo/client'
import { PaymentInformationSchema } from "utils/schemas"
import { CREATE_PAYMENTINFO } from "mutations"
import { useRouter } from "next/router"
import Layout from "pages/layout"
import NavigationLink from "components/NavigationLink"
import Field from "components/Field"
import Button from "components/Button"
import CreditCard from "components/CreditCard"
import Spinner from "components/Spinner"
import ModalPortal from "components/Modal"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  CompactActionSection,
  FormHeading
} from "styles/formStyles"
import useLocalStorage from "hooks/useLocalStorage"

export default function RegisterPaymentInformation(): JSX.Element {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [requestError, setRequestError] = useState(null)
  const [CreatePaymentInfo] = useMutation(CREATE_PAYMENTINFO, {
    onCompleted() {
      setShowModal(false)
      router.push('/')
    },
    onError(error) {
      console.log('Using mutation on error')
      setRequestError(error)
      setShowModal(false)
    }
  })
  const [accountId,] = useLocalStorage("account-id", "")

  return (
    <Layout pageTitle="Información Crediticia">
      <MainFormContainer>
        <FormHeading>
          <img src="/images/logo1.svg" alt="ParkA logo" />
          <h2>Información de pago</h2>
        </FormHeading>
        <Formik
          initialValues={{
            cardNumber: "",
            cardHolder: "",
            expirationDate: "",
            cvv: "",
          }}
          validationSchema={PaymentInformationSchema}
          onSubmit={(values) => {
            setShowModal(true)
            CreatePaymentInfo({
              variables: {
                userPaymentInfo: {
                  data: {
                    digit: values.cardNumber,
                    name: values.cardHolder,
                    expirationdate: values.expirationDate,
                    type_card: "VISA",
                    account_data: accountId
                  }
                }
              }
            })
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
                  Continuar
                </Button>
                {requestError && <p style={{ color: "red" }}>Ocurrio un error</p>}
              </ActionSection>
            </Form>
          )}
        </Formik>
      </MainFormContainer>
      {showModal && <ModalPortal onClose={() => setShowModal(false)}>
        <Spinner />
        <h3>Loading...</h3>
      </ModalPortal>}
    </Layout>
  );
}
