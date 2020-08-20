import styled from "styled-components"
import Layout from "./layout";
import Button from "../components/Button"
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
  ActionSection,
  CompactActionSection,
} from "../styles/formStyles";
import NavigationLink from "../components/NavigationLink";

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

  & > b {
    margin-left: 3px;
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

export default function Login(): JSX.Element {
  return (
    <Layout pageTitle="Login">
      <MainFormContainer>
        <h1>Login</h1>
        <FormContainer>
          <FieldSection>
            <LoginButton>  <Icon src="/icons/fbLogo.png" alt="Facebook Logo" />Continuar con <b>Facebook</b></LoginButton>
            <LoginButton> <Icon src="/icons/googleLogo.png" alt="Google Logo" />Continuar con <b>Google </b></LoginButton>
            <LoginButton>
              <NavigationLink href="/signWithEmail">
                Iniciar sesión con mi correo electrónico
                </NavigationLink>
            </LoginButton>
            <LoginButton>
              <NavigationLink href="/register">
                Crear cuenta con mi correo electrónico
                </NavigationLink>
            </LoginButton>
          </FieldSection>
          <InformationSection>
            <img
              src="./images/projectLogo.png"
              style={{ width: "100%", height: "100%" }}
            />
            <p>Utiliza uno de estos métodos para registrarte o iniciar sesión</p>
          </InformationSection>
        </FormContainer>
      </MainFormContainer>
    </Layout>
  );
}
