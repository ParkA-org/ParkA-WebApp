import styled from "styled-components"
import Layout from "../layout";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
} from "styles/formStyles";
import { useRouter } from "next/router"

const LoginButton = styled.button`
  background-color: white;
  color: rgba(0,0,0,0.8);
  border-radius: 5px;
  padding: 1em; 
  border: 1px solid #333;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > b {
    margin-left: 3px;
  }
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #63C7B2;
    border: none;
    border: 1px solid transparent;
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

export default function Login(): JSX.Element {
  const router = useRouter()

  return (
    <Layout pageTitle="Login">
      <MainFormContainer>
        <h1>Login</h1>
        <FormContainer>
          <FieldSection>
            <LoginButton>  <Icon src="/icons/fbLogo.png" alt="Facebook Logo" />Continuar con <b>Facebook</b></LoginButton>
            <LoginButton> <Icon src="/icons/googleLogo.png" alt="Google Logo" />Continuar con <b>Google </b></LoginButton>
            <LoginButton onClick={() => router.push("/login/WithEmail")}>
              Iniciar sesión con mi correo electrónico
            </LoginButton>
            <LoginButton onClick={() => router.push("/register")}>
              Crear cuenta con mi correo electrónico
            </LoginButton>
          </FieldSection>
          <InformationSection>
            <img
              src="/../images/projectLogo.png"
              style={{ width: "100%", height: "100%" }}
            />
            <h3>Utiliza uno de estos métodos para registrarte o iniciar sesión</h3>
          </InformationSection>
        </FormContainer>
      </MainFormContainer>
    </Layout>
  );
}
