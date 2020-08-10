import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Layout from "./layout";
import NavigationLink from "../components/NavigationLink";
import Field from "../components/Field";
import Button from "../components/Button";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "../styles/formStyles";

const CreateAccountSchema = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  password: Yup.string().required("Requerido"),
  confirmPassword: Yup.string().required("Requerido"),
  file: Yup.mixed(),
});

export default function registerPersonalAccount(): JSX.Element {
  return (
    <Layout pageTitle="Registro Datos Personales">
      <MainFormContainer>
        <h1>Crea una cuenta para continuar</h1>
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
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <FormContainer>
                <FieldSection>
                  <Field
                    name="name"
                    label="Nombre"
                    errorMessage={errors.name}
                    isTouched={touched.name}
                    placeholder="Nombres"
                  />
                  <Field
                    name="lastName"
                    label="Apellido"
                    errorMessage={errors.lastName}
                    isTouched={touched.lastName}
                    placeholder="Apellidos"
                  />
                  <Field
                    name="email"
                    label="Correo electrónico"
                    errorMessage={errors.email}
                    isTouched={touched.email}
                    placeholder="Correo electrónico"
                  />
                  <Field
                    type="password"
                    label="Contraseña"
                    name="password"
                    placeholder="Contraseña"
                    errorMessage={errors.password}
                    isTouched={touched.password}
                  />
                  <Field
                    type="password"
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    placeholder="Contraseña denuevo"
                    errorMessage={errors.confirmPassword}
                    isTouched={touched.confirmPassword}
                  />
                </FieldSection>
                <InformationSection>
                  <FileField
                    type="file"
                    label="Seleccione foto de perfil"
                    name="file"
                    onChange={(event) => {
                      event.preventDefault();
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                  {/* <Thumb file={values.file} /> */}
                  {/* <img
                    src="./projectLogo.png"
                    style={{ width: "100%", height: "100%" }}
                  /> */}
                </InformationSection>
              </FormContainer>
              <ActionSection>
                <Button onClick={(event) => event.preventDefault()}>
                  <NavigationLink href="/" text="Cancelar" />
                </Button>
                <Button type="submit">
                  <NavigationLink
                    href="/registerIdentificationData"
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

function Thumb({ file }: any): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    console.log(file);
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();

    console.log("Pasamos aqui");
    reader.addEventListener("loadend", () => {
      setLoading(false);
      setImage(reader.result);
    });

    console.log("Before fucked up ?");
    reader.readAsDataURL(file);
  }, [file]);

  if (!file) return null;
  if (loading) return <p>loading...</p>;

  return <img src={image} alt={file.name} height={200} width={200} />;
}

// function FileUpload(props: any): JSX.Element | null {
//   const [file, setFile] = useState(undefined)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//       if(!props.file) { return; }

//       setLoading(true)
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLoading(false)
//         setFile(reader.result)
//       }

//       reader.readAsDataURL(props.file);

//   }, [props])

//   if(!file)
//     return null
//   else
//   return (
//     <>
//     {loading && <p>Loading...</p>}
//     {!loading && !file && <img src={file} alt={file.name} height={200} width={200}/>}
//     </>
//   )
// }
