import { useState } from "react"
import { Formik, Form } from "formik"
import MaskedInput from "react-text-mask"
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

  const cardMask = [
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    " ",
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    " ",
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    " ",
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
  ];

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
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <label className="maskLabel">Número de tarjeta</label>
                    <MaskedInput
                      mask={cardMask}
                      id="cardNumber"
                      placeholder="Enter your card number"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="maskedInput"
                      style={{ backgroundColor: "#E5E4E4", borderRadius: "0.25em", marginBottom: "1em", resize: "none", maxWidth: "260px", lineHeight: "1.5em", textAlign: "left", padding: "0.5em", width: "100%" }}
                    />
                  </div>
                  <Field
                    label="Titular de tarjeta"
                    name="cardHolder"
                    placeholder="Titular de tarjeta"
                    errorMessage={errors.cardHolder}
                    isTouched={touched.cardHolder}
                  />
                  <div style={{ display: "flex", width: "100%" }}>
                    <Field
                      label="CVV"
                      name="cvv"
                      placeholder="CVV"
                      errorMessage={errors.cvv}
                      isTouched={touched.cvv}
                      inputStyles={{ width: "80px" }}
                      containerStyles={{ width: "140px" }}
                    />
                    <Field
                      type="date"
                      label="Válida hasta:"
                      name="expirationDate"
                      placeholder="Válida hasta"
                      errorMessage={errors.expirationDate}
                      isTouched={touched.expirationDate}
                      inputStyles={{ width: "150px" }}
                    />
                  </div>
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
        <style jsx>{`
          .maskLabel {
            font-weight: bolder;
            font-size: 1.25em;
            text-align: left;
            color: #333;
            margin: 0.5em 1em 0.5em 0;
          }
        `}</style>
      </MainFormContainer>
      {showModal && <ModalPortal onClose={() => setShowModal(false)}>
        <Spinner />
        <h3>Loading...</h3>
      </ModalPortal>}
    </Layout>
  );
}
