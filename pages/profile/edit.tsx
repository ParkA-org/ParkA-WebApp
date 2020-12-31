import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";
import { Formik, Form } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { UPDATE_USER, UPDATE_USER_INFORMATION } from "mutations";
import { GET_BIRTH_PLACES, GET_LOGGED_USER, GET_NATIONALITIES } from "queries";
import { EditProfileSchema } from "utils/schemas";
import { User } from "utils/types/user";
import Layout from "../layout";
import NavigationLink from "components/NavigationLink";
import Field, { FileUploader, SelectField } from "components/Field";
import SaveIcon from "components/Icons/Save";
import DeleteIcon from "components/Icons/Delete";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
} from "styles/formStyles";
import IconButton from "components/IconButton";
import UploadImageService from "services/uploadImage";
import { NationalityData, BirthPlaceData, BasicEntity } from "utils/types";
import Spinner from "components/Spinner";

type UserRequestResponse = {
  getLoggedUser?: User;
};

export default function EditProfile(): JSX.Element {
  const { redirect, loading: userStatusLoading, userStatus } = useContext(
    UserContext
  );

  useEffect(() => {
    redirect("/profile/edit");
  }, [userStatusLoading]);

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);
  const [
    updateUserInformation,
    { loading: infoLoading, error: infoError },
  ] = useMutation(UPDATE_USER_INFORMATION);
  const {
    data,
    loading: userLoading,
    error: userError,
  } = useQuery<UserRequestResponse>(GET_LOGGED_USER);
  const router = useRouter();
  const [imageStatus, setImageStatus] = useState({
    loading: false,
    error: undefined,
  });

  const {
    loading: nationalitiesLoading,
    error: nationalitiesError,
    data: nationalityData,
  } = useQuery<NationalityData>(GET_NATIONALITIES);
  const {
    loading: birthPlaceLoading,
    error: birthPlaceError,
    data: birthPlacedata,
  } = useQuery<BirthPlaceData>(GET_BIRTH_PLACES);
  const [initialValues, setInitialValues] = useState({
    name: "",
    lastName: "",
    email: "",
    telephoneNumber: "",
    placeOfBirth: "",
    nationality: "",
    documentNumber: "",
    profilePicture: "",
    file: undefined,
  });
  let tempUserValues = {
    name: "",
    lastName: "",
    email: "",
    telephoneNumber: "",
    placeOfBirth: "",
    nationality: "",
    documentNumber: "",
    profilePicture: "",
    file: undefined,
  };
  useEffect(() => {
    if (data) {
      const user = data.getLoggedUser;
      const { userInformation } = user;
      for (const key in tempUserValues) {
        if (user[key]) tempUserValues[key] = user[key];
        else if (userInformation[key]) {
          if (key === "nationality" || key === "placeOfBirth") {
            tempUserValues[key] = userInformation[key].id;
          } else {
            tempUserValues[key] = userInformation[key];
          }
        }
      }
      setInitialValues(tempUserValues);
    }
  }, [data]);
  if (userStatus === true) {
    return (
      <Layout pageTitle="Editar Perfil">
        <MainFormContainer>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={EditProfileSchema}
            onSubmit={(values) => {
              console.log("Values ", values);
              if (values.file) {
                UploadImageService(values.file).then((result) => {
                  let url = result.data[0].url;
                  updateUser({
                    variables: {
                      user: {
                        name: values.name,
                        lastName: values.lastName,
                        profilePicture: url,
                        origin: "web",
                      },
                    },
                  });
                  updateUserInformation({
                    variables: {
                      userInfo: {
                        telephoneNumber: values.telephoneNumber,
                        nationality: values.nationality,
                        placeOfBirth: values.placeOfBirth,
                        documentNumber: values.documentNumber,
                        birthDate: data.getLoggedUser.userInformation.birthDate,
                      },
                    },
                  });
                });
              } else {
                updateUser({
                  variables: {
                    user: {
                      name: values.name,
                      lastName: values.lastName,
                      profilePicture: initialValues.profilePicture,
                      origin: "web",
                    },
                  },
                });

                updateUserInformation({
                  variables: {
                    userInfo: {
                      telephoneNumber: values.telephoneNumber,
                      nationality: values.nationality,
                      placeOfBirth: values.placeOfBirth,
                      documentNumber: values.documentNumber,
                      birthDate: new Date(
                        data.getLoggedUser.userInformation.birthDate
                      ).toISOString(),
                    },
                  },
                });
              }

              if (!error && !infoError) {
                if (!infoLoading && !loading) {
                  router.push("/profile");
                }
              } else alert(error);
            }}
          >
            {({ setFieldValue, errors, touched, values }) => (
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
                      value={values.name}
                    />
                    <Field
                      name="lastName"
                      label="Apellido"
                      errorMessage={errors.lastName}
                      isTouched={touched.lastName}
                      placeholder="Apellido"
                      placement="horizontal"
                      value={values.lastName}
                    />
                    <Field
                      name="telephoneNumber"
                      label="Número telefónico"
                      errorMessage={errors.telephoneNumber}
                      isTouched={touched.telephoneNumber}
                      placeholder="Número telefónico"
                      placement="horizontal"
                      value={values.telephoneNumber}
                    />
                    <Field
                      name="documentNumber"
                      label="No. de documento"
                      errorMessage={errors.documentNumber}
                      isTouched={touched.documentNumber}
                      placeholder="No. de documento"
                      placement="horizontal"
                      value={values.documentNumber}
                    />
                    {nationalitiesLoading ? (
                      <Spinner />
                    ) : (
                      <SelectField
                        name="nationality"
                        label="Nacionalidad"
                        placeholder="Nacionalidad"
                        placement="horizontal"
                        errorMessage={errors.nationality}
                        isTouched={touched.nationality}
                        value={values.nationality}
                      >
                        {nationalityData.getAllNationalities.map(
                          (nationality: BasicEntity) => (
                            <option
                              value={nationality.id}
                              key={nationality.name}
                            >
                              {nationality.name}
                            </option>
                          )
                        )}
                      </SelectField>
                    )}
                    {birthPlaceLoading ? (
                      <Spinner />
                    ) : (
                      <SelectField
                        name="placeOfBirth"
                        label="Lugar de Nacimiento"
                        placeholder="Lugar de nacimiento"
                        placement="horizontal"
                        errorMessage={errors.placeOfBirth}
                        isTouched={touched.placeOfBirth}
                        value={values.placeOfBirth}
                      >
                        {birthPlacedata.getAllCountries.map(
                          (birthPlace: BasicEntity) => (
                            <option value={birthPlace.id} key={birthPlace.name}>
                              {birthPlace.name}
                            </option>
                          )
                        )}
                      </SelectField>
                    )}
                  </FieldSection>
                  <InformationSection>
                    <FileUploader
                      setFieldValue={setFieldValue}
                      placeholderImage={initialValues.profilePicture}
                    />
                  </InformationSection>
                  <ActionSection>
                    <NavigationLink href="/profile">
                      <IconButton text="Cancelar" color="#f0021a">
                        <DeleteIcon />
                      </IconButton>
                    </NavigationLink>

                    <IconButton text="Guardar" color="#077187" submit={true}>
                      <SaveIcon />
                    </IconButton>
                  </ActionSection>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </MainFormContainer>
        {imageStatus.loading && <p>Cargando...</p>}
        {imageStatus.error && <p>Error...</p>}
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Editar perfil">
      <h3>Cargando....</h3>
    </Layout>
  );
}
