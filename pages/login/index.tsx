import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "context/UserContext";
import { signIn, useSession } from "next-auth/client";
import { SOCIAL_LOGIN } from "mutations";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import Layout from "../layout";
import {
  MainFormContainer,
  FormContainer,
  FieldSection,
  InformationSection,
} from "styles/formStyles";

const LoginButton = styled.button`
  background-color: white;
  color: rgba(0, 0, 0, 0.8);
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
    background-color: #63c7b2;
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
  const router = useRouter();
  const [session, loading] = useSession();
  const { setSocialLogin, socialLogin, setToken, setUser } = useContext(
    UserContext
  );
  const [SocialLogin] = useMutation(SOCIAL_LOGIN, {
    onCompleted({ socialLogin }) {
      const { JWT, user, register } = socialLogin;
      setToken(JWT);
      setUser(user);
      console.log("Llegamos al onCompleted");
      if (register === true) {
        router.push("/profile");
      } else {
        router.push("/register/PersonalIdentification");
      }
    },
  });
  useEffect(() => {
    if (session) {
      console.log("Loading ", loading);
      if (session && session.user) {
        console.log("Llegamos aqui");
        setSocialLogin("google");
        SocialLogin({
          variables: {
            slv: {
              displayName: session.user.name,
              photoUrl: session.user.image,
              email: session.user.email,
              origin: "google",
            },
          },
        });
      }
      console.log("Sesion ", session);
    }
  }, [loading]);

  return (
    <Layout pageTitle="Login">
      <MainFormContainer>
        <br />
        <FormContainer>
          <FieldSection>
            <LoginButton
              onClick={() => {
                setSocialLogin("google");
                signIn("google");
              }}
            >
              {" "}
              <Icon src="/icons/googleLogo.png" alt="Google Logo" />
              Continuar con <b>Google </b>
            </LoginButton>
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
            <h3>
              Utiliza uno de estos métodos para registrarte o iniciar sesión
            </h3>
          </InformationSection>
        </FormContainer>
        <br />
        <br />
        <br />
        <br />
      </MainFormContainer>
    </Layout>
  );
}
