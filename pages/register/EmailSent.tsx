import Layout from "../layout"
import {
    MainFormContainer,
  } from "styles/formStyles";
import Button from "components/Button"
import { useRouter } from "next/router"
import styled from "styled-components"

const CustomContainer = styled(MainFormContainer)`
  & > button {
    width: 180px;
    text-align:center;
  }
`

export default function EmailSent() {
    const router = useRouter()
    return (
        <Layout pageTitle="Correo enviado">
            <CustomContainer>
                <h1>Verificación de correo eléctronico</h1>
                <br/>
                <br/>
                <p>Su proceso de registro está casi listo. Se le ha enviado un código de validación a su correo electrónico. </p>
                <br/>
                <br/>
                <Button onClick={() => router.push("/confirmEmail")}>Confirmar correo</Button>
            </CustomContainer>

        </Layout>
    )
}