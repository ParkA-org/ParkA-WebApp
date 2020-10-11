import { useContext, useState } from "react"
import { Formik, Form } from "formik";
import { useMutation } from '@apollo/client'
import useLocalStorage from "hooks/useLocalStorage"
import { useRouter } from 'next/router'
import { CREATE_USER } from "mutations"
import { CreateAccountSchema } from "utils/schemas"
import Layout from "../layout"
import NavigationLink from "components/NavigationLink"
import Field, { FileUploader } from "components/Field"
import Button from "components/Button"
import ModalPortal from "components/Modal"
import Spinner from "components/Spinner"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  FormHeading
} from "styles/formStyles"
import UploadImageService from "services/uploadImage"
import { UserContext } from "context/UserContext";

export default function registerPersonalAccount(): JSX.Element {
  const [showModal, setShowModal] = useState(false)
  const [requestError, setRequestError] = useState(null)
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const [image, setImage] = useLocalStorage("image", "")
  const [imageStatus, setImageStatus] = useState({
    loading: false,
    error: undefined
  })
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted({ createUser }) {
      const { user } = createUser
      setUser(user)
      setShowModal(false)
      router.push('/register/PersonalIdentification')
    },
    onError(error) {
      console.log('Using mutation on error')
      setRequestError(error)
      setShowModal(false)
    }
  })
  return (
    <Layout pageTitle="Registro Datos Personales">
      <MainFormContainer>
        <FormHeading>
          <img src="/images/logo1.svg" alt="ParkA logo" />
          <h2>Crea una cuenta para continuar</h2>
        </FormHeading>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            file: "",
          }}
          validationSchema={CreateAccountSchema}
          onSubmit={(values) => {
            setShowModal(true)
            setImageStatus(prevState => {
              return { ...prevState, loading: true }
            })

            UploadImageService(values.file, setImage, setImageStatus)

            createUser({
              variables: {
                user: {
                  data: {
                    name: values.name,
                    username: values.email,
                    email: values.email,
                    lastname: values.lastName,
                    password: values.password,
                    confirmed: true
                  }
                }
              }
            })
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <Field
                    name="name"
                    label="Nombre"
                    errorMessage={errors.name}
                    isTouched={touched.name}
                    placeholder="Nombre"
                    placement="horizontal"
                    inputStyles={{ width: "100px" }}
                  />
                  <Field
                    name="lastName"
                    label="Apellido"
                    errorMessage={errors.lastName}
                    isTouched={touched.lastName}
                    placeholder="Apellido"
                    placement="horizontal"
                    inputStyles={{ width: "100px" }}
                  />
                  <Field
                    name="email"
                    label="Correo electrónico"
                    errorMessage={errors.email}
                    isTouched={touched.email}
                    placeholder="Correo electrónico"
                    placement="horizontal"
                    inputStyles={{ width: "100px" }}
                  />
                  <Field
                    type="password"
                    label="Contraseña"
                    name="password"
                    placeholder="Contraseña"
                    errorMessage={errors.password}
                    placement="horizontal"
                    isTouched={touched.password}
                    inputStyles={{ width: "100px" }}
                  />
                  <Field
                    type="password"
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    placeholder="Contraseña denuevo"
                    errorMessage={errors.confirmPassword}
                    isTouched={touched.confirmPassword}
                    placement="horizontal"
                    inputStyles={{ width: "100px" }}
                  />
                </FieldSection>
                <InformationSection>
                  <FileUploader setFieldValue={setFieldValue} />
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <NavigationLink href="/login" styled={true}>Atrás</NavigationLink>
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
    </Layout >
  );
}
