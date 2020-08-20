
import Layout from "./layout";
import Button from "components/Button";
import styled from "styled-components";

const Container = styled.div`
  width: 50vw;
  height: 50vh;
  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }
`;

const TopContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: white;
`;

export default function PrivacyPolicy(): JSX.Element {
  return (
    <Layout pageTitle="Privacy Policy">
      <TopContainer>
        <h2>Política de Privacidad</h2>
        <Button>
          <StyledLink href="./politica-de-privacidad.pdf" download>
            Descargar
          </StyledLink>{" "}
        </Button>
      </TopContainer>
      <Container>
        <embed
          src="./politica-de-privacidad.pdf"
          type="application/pdf"
          style={{ width: "100%", height: "100%" }}
        />
      </Container>
    </Layout>
  );
}
