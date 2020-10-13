import { useContext, useState } from "react"
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

export default function ConfirmEmail(): JSX.Element {
    const { token } = useContext(UserContext)
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [ValidateEmail, { data: emailData, loading: emailLoading, error: emailError }] = useMutation(VALIDATE_EMAIL, {
        onCompleted() {
            router.push('/login')
        }
    })
    const [ConfirmEmail, { error: confirmEmailError }] = useMutation(CONFIRM_EMAIL)
    return (
        <Layout pageTitle="Confirm account with email">
            <MainFormContainer>
                <h1>Confirm email</h1>
                <Formik
                    initialValues={{
                        code: "",
                        email: ""
                    }}
                    validationSchema={ValidateEmailSchema}
                    onSubmit={(values) => {
                        setShowModal(true)
                        ValidateEmail({
                            variables: {
                                emInput: {
                                    email: values.email,
                                    code: values.code,
                                    origin: "web"
                                }
                            }
                        })
                    }}
                >
                    {({ errors, touched, values }) => (
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
                                        value={values.code}
                                    />
                                    <Field
                                        type="email"
                                        label="Correo electrónico"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        errorMessage={errors.email}
                                        isTouched={touched.email}
                                        value={values.email}
                                    />
                                    <Button submit={true}>Validar correo</Button>
                                    <p>No te ha llegado ningun correo?</p>
                                    <Button submit={false} onClick={() => {
                                        ConfirmEmail({
                                            variables: {
                                                ceInput: {
                                                    email: values.email,
                                                    origin: "web"
                                                }
                                            }
                                        })
                                    }}>Mandame otro.</Button>
                                </FieldSection>
                                <InformationSection>
                                    <img
                                        src="/images/projectLogo.png"
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
