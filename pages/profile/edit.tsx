import { useState } from "react"
import axios from "axios"
import { Formik, Form } from "formik";
import { useMutation } from '@apollo/client'
import { useLocalStorage } from "hooks/useLocalStorage"
import { useRouter } from 'next/router'
import { UPDATE_USER } from "mutations"
import { EditProfileSchema } from "utils/schemas"
import Layout from "../layout";
import NavigationLink from "components/NavigationLink";
import Field, { FileUploader } from "components/Field";
import Button from "components/Button";
import {
    MainFormContainer,
    FormContainer,
    FieldSection,
    InformationSection,
    ActionSection,
} from "styles/formStyles";

function UpdateImage(file: any, success, error) {
    const apiBaseURL = "https://parka-api.herokuapp.com/upload";
    const formData = new FormData()
    formData.append("files", file)
    axios({
        method: "POST",
        url: apiBaseURL,
        data: formData
    }).then(res => {
        success(res.data['0'].url)
        error(prevState => {
            return { ...prevState, loading: false }
        })
    })
        .catch(err => error(prevState => {
            return { ...prevState, error: err }
        }))
}

export default function EditProfile(): JSX.Element {
    const [updateUser, { loading, error }] = useMutation(UPDATE_USER)
    const router = useRouter()
    const [imageStatus, setImageStatus] = useState({
        loading: false,
        error: undefined
    })
    const [image, setImage] = useLocalStorage("image", "")
    const [userId,] = useLocalStorage("user-id", "")
    return (
        <Layout pageTitle="Editar Perfil">
            <MainFormContainer>
                <Formik
                    initialValues={{
                        name: "",
                        lastName: "",
                        email: "",
                        dateOfBirth: "",
                        file: ""
                    }}
                    validationSchema={EditProfileSchema}
                    onSubmit={(values) => {
                        setImageStatus(prevState => {
                            return { ...prevState, loading: true }
                        })
                        UpdateImage(values.file, setImage, setImageStatus)
                        updateUser({
                            variables: {
                                where: {
                                    id: userId
                                },
                                data: {
                                    username: values.name,
                                    email: values.email,
                                    lastname: values.lastName,
                                    dateOfBirth: values.dateOfBirth
                                }
                            }
                        })
                        if (!error && !imageStatus.error) {
                            if (!imageStatus.loading && !loading) {
                                router.push('/PersonalIdentification')
                            }
                        }
                        else
                            alert(error)
                    }}>
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
                                    />
                                    <Field
                                        name="lastName"
                                        label="Apellido"
                                        errorMessage={errors.lastName}
                                        isTouched={touched.lastName}
                                        placeholder="Apellido"
                                    />
                                    <Field
                                        name="email"
                                        label="Correo electrónico"
                                        errorMessage={errors.email}
                                        isTouched={touched.email}
                                        placeholder="Correo electrónico"
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
                                    <FileUploader setFieldValue={setFieldValue} />
                                </InformationSection>
                            </FormContainer>
                            <ActionSection>
                                <Button submit={true} rank="secondary">
                                    Cancelar
                                </Button>
                                <Button submit={true} rank="secondary">
                                    Guardar
                                </Button>
                            </ActionSection>
                        </Form>
                    )}
                </Formik>
            </MainFormContainer>
            {imageStatus.loading && <p>Loading...</p>}
            {imageStatus.error && <p>Error...</p>}
        </Layout >
    );
}
