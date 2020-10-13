import { useContext, useEffect, useState } from "react"
import { Formik, Form } from "formik"
import { ValidateEmailSchema } from "utils/schemas"
import { useMutation } from "@apollo/client"
import { CONFIRM_EMAIL, VALIDATE_EMAIL } from "mutations"
import { useRouter } from "next/router"
import Layout from "./layout"
import NavigationLink from "components/NavigationLink"
import Field from "components/Field"
import Button from "components/Button"
import {
    MainFormContainer,
    FormContainer,
    FieldSection,
    InformationSection,
    ActionSection,
} from "styles/formStyles"
import { UserContext } from "context/UserContext"
import ModalPortal from "components/Modal"
import Spinner from "components/Spinner"
import useLocalStorage from "hooks/useLocalStorage"

export default function ConfirmEmail(): JSX.Element {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [ConfirmEmail, { error }] = useMutation(CONFIRM_EMAIL, {
        onCompleted({ confirmEmail }) {
            console.log('Lo que tenemos como resultado')
            console.log(confirmEmail)
        }
    })
    const [ValidateEmail, { data: emailData, loading: emailLoading, error: emailError }] = useMutation(VALIDATE_EMAIL)
    const [localUser, setLocalUser] = useLocalStorage("user", {})

    useEffect(() => {
        ConfirmEmail({
            variables: {
                ceInput: {
                    email: localUser.email,
                    origin: "web"
                }
            }
        })
    }, [])

    return (
        <Layout pageTitle="Confirm account with email">
            <MainFormContainer>
                <h1>Confirm email</h1>
                <Formik
                    initialValues={{
                        code: "",
                        origin: "web"
                    }}
                    validationSchema={ValidateEmailSchema}
                    onSubmit={(values) => {
                        setShowModal(true)
                        ValidateEmail({
                            variables: {
                                emInput: {
                                    email: localUser.email,
                                    code: values.code,
                                    origin: values.origin
                                }
                            }
                        })
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormContainer>
                                <FieldSection>
                                    <h3>Ya casi estamos listos!</h3>
                                    <p>Ingresa el código enviado a tu correo electrónico para continuar!</p>
                                    <Field
                                        type="code"
                                        label="Código"
                                        name="code"
                                        placeholder="Código del correo"
                                        errorMessage={errors.code}
                                        isTouched={touched.code}
                                    />

                                </FieldSection>
                                <InformationSection>
                                    <img
                                        src="../images/projectLogo.png"
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </InformationSection>
                            </FormContainer>
                            <ActionSection>
                                <Button rank="secondary">
                                    <NavigationLink href="/login" styled>
                                        Atrás
                  </NavigationLink>
                                </Button>
                                <Button rank="secondary" submit={true}>
                                    Iniciar Sesión
                </Button>
                            </ActionSection>
                        </Form>
                    )}
                </Formik>
            </MainFormContainer>
            <style jsx>
                {`
          span {
            align-self: flex-end;
            color: #59BCA7;
          }
        `}
            </style>

            {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                <Spinner />
                <h3>Loading...</h3>
            </ModalPortal>}
        </Layout>
    );
}
