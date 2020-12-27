import Layout from "../layout";
import { MainFormContainer } from "styles/formStyles";
import Button from "components/Button";
import { useRouter } from "next/router";
import styled from "styled-components";

const CustomContainer = styled(MainFormContainer)`
  & > button {
    width: 180px;
    text-align: center;
  }
`;

export default function EmailSent() {
  const router = useRouter();
  return (
    <Layout pageTitle="Correo enviado">
      <CustomContainer>
        <img
          src="/images/logo1.svg"
          alt="ParkA logo"
          style={{ width: "45%", height: "25%" }}
        />
        <h1 style={{ marginBottom: "2em", marginTop: "1em" }}>
          Verificación de correo eléctronico
        </h1>
        <br />
        <br />
        <h3>
          Su proceso de registro está casi listo. Se le ha enviado un código de
          validación a su correo electrónico.{" "}
        </h3>
        <br />
        <br />
      </CustomContainer>
    </Layout>
  );
}
