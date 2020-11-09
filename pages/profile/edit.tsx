import { useState } from "react"
import { Formik, Form } from "formik";
import { useMutation } from '@apollo/client'
import useLocalStorage from "hooks/useLocalStorage"
import { useRouter } from 'next/router'
import { UPDATE_USER } from "mutations"
import { EditProfileSchema } from "utils/schemas"
import Layout from "../layout";
import NavigationLink from "components/NavigationLink";
import Field, { FileUploader } from "components/Field";
import Logo from "components/Icons/Logo"
import SaveIcon from "components/Icons/Save"
import DeleteIcon from "components/Icons/Delete"
import {
    MainFormContainer,
    FormContainer,
    FieldSection,
    InformationSection,
    ActionSection,
    FormHeading
} from "styles/formStyles";
import IconButton from "components/IconButton";
import UploadImageService from "services/uploadImage"

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
                        UploadImageService(values.file, setImage)
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
                                router.push('/profile')
                            }
                        }
                        else
                            alert(error)
                    }}>
                    {({ setFieldValue, errors, touched }) => (
                        <Form>
                            <FormContainer>
                                <FieldSection>
                                    <FormHeading>
                                        <Logo />
                                    </FormHeading>
                                    <Field
                                        name="name"
                                        label="Nombre"
                                        errorMessage={errors.name}
                                        isTouched={touched.name}
                                        placeholder="Nombre"
                                        placement="horizontal"
                                        containerStyles={{ margin: "1em 0" }}
                                    />
                                    <Field
                                        name="lastName"
                                        label="Apellido"
                                        errorMessage={errors.lastName}
                                        isTouched={touched.lastName}
                                        placeholder="Apellido"
                                        placement="horizontal"
                                        containerStyles={{ margin: "1em 0" }}
                                    />
                                    <Field
                                        name="email"
                                        label="Correo electrónico"
                                        errorMessage={errors.email}
                                        isTouched={touched.email}
                                        placeholder="Correo electrónico"
                                        placement="horizontal"
                                        containerStyles={{ margin: "1em 0" }}
                                    />
                                    <Field
                                        type="date"
                                        label="Fecha de nacimiento"
                                        name="dateOfBirth"
                                        placeholder="Fecha de nacimiento"
                                        errorMessage={errors.dateOfBirth}
                                        isTouched={touched.dateOfBirth}
                                        placement="horizontal"
                                        containerStyles={{ margin: "1em 0" }}
                                    />
                                </FieldSection>
                                <InformationSection>
                                    <FileUploader setFieldValue={setFieldValue} />
                                </InformationSection>
                            </FormContainer>
                            <ActionSection>
                                <NavigationLink href="/profile">
                                    <IconButton text="Cancelar" color="#f0021a">
                                        <DeleteIcon />
                                    </IconButton>
                                </NavigationLink>

                                <NavigationLink href="/profile">
                                    <IconButton text="Guardar" color="#077187">
                                        <SaveIcon />
                                    </IconButton>
                                </NavigationLink>

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
